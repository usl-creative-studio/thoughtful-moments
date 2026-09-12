import type Stripe from "stripe";
import {
  depositConfirmationEmail,
  depositNotificationEmail,
  formatAmount,
} from "@/lib/email/deposit";
import { getEmailEnv, getStripeEnv } from "@/lib/env";
import { sendEmail } from "@/lib/resend";
import { getStripe } from "@/lib/stripe";

/**
 * Stripe webhook (Prompt 4). Verifies every request against
 * STRIPE_WEBHOOK_SECRET and, when a Checkout Session has been paid, sends the
 * buyer his confirmation and the founder the notification. 400 for a missing
 * or bad signature; 200 once handled (or for events this page does not act
 * on); 500 when an email fails, so Stripe retries the delivery.
 *
 * Both `checkout.session.completed` and `checkout.session.async_payment_succeeded`
 * are handled and gated on `payment_status`, per Stripe's fulfilment guide:
 * cards complete as paid at once; a delayed method completes unpaid and pays
 * later.
 */

const paidEvents = new Set<Stripe.Event.Type>([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
]);

export async function POST(request: Request): Promise<Response> {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing stripe-signature header", { status: 400 });
  }

  const payload = await request.text();
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      payload,
      signature,
      getStripeEnv().STRIPE_WEBHOOK_SECRET,
    );
  } catch (cause) {
    console.warn("stripe webhook: signature failed", cause instanceof Error ? cause.message : cause);
    return new Response("Invalid signature", { status: 400 });
  }

  if (!paidEvents.has(event.type)) {
    return Response.json({ received: true, handled: false });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (session.payment_status !== "paid") {
    // A delayed payment method: `async_payment_succeeded` follows once the money arrives.
    console.info("stripe webhook: session not yet paid", session.id, session.payment_status);
    return Response.json({ received: true, handled: false });
  }

  const customerEmail = session.customer_details?.email ?? session.customer_email ?? undefined;
  const amount = formatAmount(session.amount_total ?? 0, session.currency ?? "usd");

  try {
    const { NOTIFY_EMAIL } = getEmailEnv();
    const sent: string[] = [];

    if (customerEmail) {
      // Replies with his call windows go to the founder, not to the sending domain.
      const confirmation = depositConfirmationEmail();
      sent.push(await sendEmail({ to: customerEmail, replyTo: NOTIFY_EMAIL, ...confirmation }));
    } else {
      console.warn("stripe webhook: session has no customer email", session.id);
    }

    const notification = depositNotificationEmail({
      customerEmail: customerEmail ?? "(no email on the session)",
      customerName: session.customer_details?.name ?? undefined,
      amount,
      sessionId: session.id,
    });
    sent.push(await sendEmail({ to: NOTIFY_EMAIL, ...notification }));

    // Ids only: no addresses in the log.
    console.info("stripe webhook: deposit emails sent", session.id, sent);
    return Response.json({ received: true, handled: true, emails: sent.length });
  } catch (cause) {
    console.error(
      "stripe webhook: email failed",
      session.id,
      cause instanceof Error ? cause.message : cause,
    );
    return new Response("Email failed", { status: 500 });
  }
}

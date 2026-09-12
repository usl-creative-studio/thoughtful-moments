"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { track } from "@vercel/analytics/server";
import { deposit, getStripe } from "@/lib/stripe";
import { getStripeEnv } from "@/lib/env";

/**
 * "Hold a slot" (Prompt 4). Creates a hosted Checkout Session for the $500
 * deposit and sends the reader to Stripe; the card is never seen by this
 * site. Success returns to /held with the session id; cancel returns to the
 * price module. Nothing is stored: the session in Stripe is the record, and
 * the webhook sends the emails once the payment is complete.
 */
export async function createDepositSession(): Promise<void> {
  const { NEXT_PUBLIC_SITE_URL } = getStripeEnv();

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: deposit.currency,
          unit_amount: deposit.unitAmount,
          product_data: { name: deposit.productName },
        },
      },
    ],
    success_url: `${NEXT_PUBLIC_SITE_URL}/held?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${NEXT_PUBLIC_SITE_URL}/#price`,
    customer_creation: "always",
    metadata: deposit.metadata,
  });

  if (!session.url) {
    throw new Error("Stripe returned a Checkout Session without a URL");
  }

  // The reader is on his way to Stripe. Server-side so it fires once per session created,
  // not per click. The request headers give it the visitor's session; off Vercel the call
  // logs that VERCEL_URL is missing and drops.
  await track("deposit_started", {}, { headers: await headers() });

  // `redirect` throws, so it stays outside any try/catch.
  redirect(session.url);
}

"use server";

/**
 * Stub for Prompt 4. The real action creates a Stripe Checkout Session
 * (mode: payment, one $500 line item "Deposit: Her Night, Your Hands") and
 * redirects to session.url. Until then the form submits and returns to the
 * price module so nothing on the page is a dead control.
 */
import { redirect } from "next/navigation";

export async function createDepositSession(): Promise<void> {
  // TODO(Prompt 4): replace with stripe.checkout.sessions.create + redirect(session.url).
  redirect("/#price");
}

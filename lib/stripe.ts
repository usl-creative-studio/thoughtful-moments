import "server-only";
import Stripe from "stripe";
import { getStripeEnv } from "@/lib/env";

/**
 * The Stripe client, built on first use so the secret key is read at request
 * time and `next build` needs none. Used by the deposit Server Action and the
 * webhook route; nothing else on the page talks to Stripe. The SDK's pinned
 * API version is used as shipped, so an SDK upgrade is the only way it moves.
 */
let client: Stripe | undefined;

export function getStripe(): Stripe {
  if (client) return client;
  const { STRIPE_SECRET_KEY, STRIPE_API_BASE_URL } = getStripeEnv();
  const config: Stripe.StripeConfig = { appInfo: { name: "thoughtful-moments" } };
  if (STRIPE_API_BASE_URL) {
    // A local stand-in for the API (stripe-mock or the test harness); never set in a deployment.
    const base = new URL(STRIPE_API_BASE_URL);
    config.host = base.hostname;
    config.port = base.port || (base.protocol === "https:" ? 443 : 80);
    config.protocol = base.protocol === "https:" ? "https" : "http";
  }
  client = new Stripe(STRIPE_SECRET_KEY, config);
  return client;
}

/** The deposit: one line item, in cents, named as the copy document names it. */
export const deposit = {
  currency: "usd",
  unitAmount: 50_000,
  productName: "Deposit: Her Night, Your Hands",
  metadata: { offer: "her-night-your-hands", cohort: "founding" },
} as const;

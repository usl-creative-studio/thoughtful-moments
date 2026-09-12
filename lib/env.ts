import "server-only";
import { z } from "zod";

/**
 * Server-side environment, validated once on first use rather than at import so
 * `next build` does not need the secrets. A missing variable throws with its
 * name, so a feature fails closed instead of sending nothing quietly
 * (context/production-checklist.md, section 3). Email and Stripe are parsed
 * separately so the form can send without Stripe being configured and the
 * webhook can verify a signature without Resend.
 */
const emailSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is not set"),
  NOTIFY_EMAIL: z.email("NOTIFY_EMAIL must be an email address"),
  // Resend only sends from a verified domain; the onboarding sender delivers to the
  // account owner alone, which is enough until hello@[domain] exists.
  RESEND_FROM_EMAIL: z
    .string()
    .min(1)
    .default("Thoughtful Moments <onboarding@resend.dev>"),
});

export type EmailEnv = z.infer<typeof emailSchema>;

let emailEnv: EmailEnv | undefined;

export function getEmailEnv(): EmailEnv {
  emailEnv ??= emailSchema.parse({
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NOTIFY_EMAIL: process.env.NOTIFY_EMAIL,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL || undefined,
  });
  return emailEnv;
}

const stripeSchema = z.object({
  // The secret key only. The publishable key is never read on the server.
  STRIPE_SECRET_KEY: z.string().min(1, "STRIPE_SECRET_KEY is not set"),
  STRIPE_WEBHOOK_SECRET: z.string().min(1, "STRIPE_WEBHOOK_SECRET is not set"),
  // Checkout needs absolute return URLs; trailing slash dropped so `${url}/held` is clean.
  NEXT_PUBLIC_SITE_URL: z
    .url("NEXT_PUBLIC_SITE_URL must be an absolute URL")
    .transform((url) => url.replace(/\/+$/, "")),
  // Optional: point the SDK at a local stand-in such as stripe-mock. Unset in every deployment.
  STRIPE_API_BASE_URL: z.url().optional(),
});

export type StripeEnv = z.infer<typeof stripeSchema>;

let stripeEnv: StripeEnv | undefined;

export function getStripeEnv(): StripeEnv {
  stripeEnv ??= stripeSchema.parse({
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    STRIPE_API_BASE_URL: process.env.STRIPE_API_BASE_URL || undefined,
  });
  return stripeEnv;
}

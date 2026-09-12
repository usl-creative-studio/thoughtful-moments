import "server-only";
import { z } from "zod";

/**
 * Server-side environment, validated once on first use rather than at import so
 * `next build` does not need the secrets. A missing variable throws with its
 * name, so a feature fails closed instead of sending nothing quietly
 * (context/production-checklist.md, section 3).
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

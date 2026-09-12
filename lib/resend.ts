import "server-only";
import { Resend } from "resend";
import { getEmailEnv } from "@/lib/env";

/**
 * The Resend client, built on first use so the API key is read at request time.
 * Shared by the Tell Us About Her notification (Prompt 8) and the deposit
 * emails (Prompt 4). Nothing else on the page sends mail.
 */
let client: Resend | undefined;

export function getResend(): Resend {
  client ??= new Resend(getEmailEnv().RESEND_API_KEY);
  return client;
}

type SendArgs = {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

/** Sends one email from the configured sender; throws with Resend's message on failure. */
export async function sendEmail({ to, subject, text, html, replyTo }: SendArgs): Promise<string> {
  const { RESEND_FROM_EMAIL } = getEmailEnv();
  const { data, error } = await getResend().emails.send({
    from: RESEND_FROM_EMAIL,
    to,
    subject,
    text,
    html,
    ...(replyTo ? { replyTo } : {}),
  });
  if (error || !data) {
    throw new Error(error?.message ?? "Resend returned no id");
  }
  return data.id;
}

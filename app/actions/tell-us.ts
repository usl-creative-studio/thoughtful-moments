"use server";

import { z } from "zod";
import { tellUsEmail } from "@/lib/email/tell-us";
import { sendEmail } from "@/lib/resend";
import { getEmailEnv } from "@/lib/env";
import {
  fields,
  honeypotField,
  tellUsSchema,
  todayIso,
  type TellUsAnswers,
  type TellUsField,
  type TellUsState,
  type TellUsValues,
} from "@/lib/tell-us";

/**
 * Tell Us About Her (Module 9). Validates the five answers and the email,
 * drops anything that filled the honeypot, and sends one email to
 * NOTIFY_EMAIL. Nothing is stored: the email is the record.
 */

function readValues(formData: FormData): TellUsValues {
  const values = {} as TellUsValues;
  for (const field of fields) {
    const raw = formData.get(field);
    values[field] = typeof raw === "string" ? raw.trim() : "";
  }
  return values;
}

/** The first message per field, in the words the reader sees beside it. */
function firstErrors(error: z.ZodError<TellUsAnswers>): Partial<Record<TellUsField, string>> {
  const { fieldErrors } = z.flattenError(error);
  const errors: Partial<Record<TellUsField, string>> = {};
  for (const field of fields) {
    const [message] = fieldErrors[field] ?? [];
    if (message) errors[field] = message;
  }
  return errors;
}

export async function submitTellUs(_prev: TellUsState, formData: FormData): Promise<TellUsState> {
  const values = readValues(formData);

  // A person never sees this field. Anything in it is a bot; it gets the thank-you and nothing else.
  const honeypot = formData.get(honeypotField);
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { status: "discarded" };
  }

  const result = tellUsSchema(todayIso()).safeParse(values);
  if (!result.success) {
    return { status: "error", values, errors: firstErrors(result.error) };
  }

  try {
    const { subject, text, html } = tellUsEmail(result.data);
    await sendEmail({
      to: getEmailEnv().NOTIFY_EMAIL,
      replyTo: result.data.email,
      subject,
      text,
      html,
    });
  } catch (cause) {
    // No addresses in the log: the answers are personal and the email did not go anywhere.
    console.error("tell-us: email failed", cause instanceof Error ? cause.message : cause);
    return {
      status: "error",
      values,
      errors: {},
      message: "We could not send that just now. Please try again in a minute.",
    };
  }

  return { status: "sent", massage: result.data.massage };
}

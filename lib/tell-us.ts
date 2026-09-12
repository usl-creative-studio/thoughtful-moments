import { z } from "zod";

/**
 * Tell Us About Her (Module 9): the five questions, the answer types, the
 * validation rules from Prompt 8, and the state the Server Action hands back.
 * Shared by the form (client) and the action (server); nothing here touches
 * the network, so the client bundle carries only the schema and the helpers.
 */

/** The fifth question, with the values the analytics event carries. Labels are verbatim. */
export const massageOptions = [
  { value: "yes", label: "Yes" },
  { value: "nervous", label: "I would want to, but I am nervous" },
  { value: "no", label: "No" },
] as const;

export type Massage = (typeof massageOptions)[number]["value"];

const massageValues = massageOptions.map((option) => option.value) as [Massage, ...Massage[]];

export const fields = ["date", "where", "loves", "said", "massage", "email"] as const;
export type TellUsField = (typeof fields)[number];
export type TellUsValues = Record<TellUsField, string>;

/** The honeypot. A person never sees it; a bot fills every field it finds. */
export const honeypotField = "website";

/** How far ahead the date may be, per Prompt 8. */
export const dateWindowDays = 180;

/** Dallas, where the date happens. Keeps "today" honest whatever the server's clock zone. */
const timeZone = "America/Chicago";

const isoDate = new Intl.DateTimeFormat("en-CA", {
  timeZone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Today as YYYY-MM-DD in Dallas. */
export function todayIso(now: Date = new Date()): string {
  return isoDate.format(now);
}

/** A YYYY-MM-DD string moved forward by `days`, on the calendar rather than the clock. */
export function addDaysIso(iso: string, days: number): string {
  const [year = 0, month = 1, day = 1] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10);
}

/** "March 14, 2027" from YYYY-MM-DD, for the email subject and body. */
export function formatDate(iso: string): string {
  const [year = 0, month = 1, day = 1] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(year, month - 1, day)),
  );
}

/** The rules from Prompt 8, with the messages the reader sees beside the field. */
export function tellUsSchema(today: string = todayIso()) {
  const last = addDaysIso(today, dateWindowDays);
  return z.object({
    date: z
      .iso.date({ error: "Add the date." })
      .refine((value) => value >= today && value <= last, {
        error: `Choose a date within the next ${dateWindowDays} days.`,
      }),
    where: z
      .string()
      .min(2, { error: "Tell us the neighbourhood or ZIP." })
      .max(60, { error: "Keep it under 60 characters." }),
    loves: z
      .string()
      .min(3, { error: "Give us three things, even short ones." })
      .max(500, { error: "Keep it under 500 characters." }),
    said: z
      .string()
      .min(3, { error: "One line is enough." })
      .max(500, { error: "Keep it under 500 characters." }),
    massage: z.enum(massageValues, { error: "Choose one." }),
    email: z.email({ error: "Enter an email we can reply to." }).max(254),
  });
}

export type TellUsAnswers = z.infer<ReturnType<typeof tellUsSchema>>;

export type TellUsState =
  | { status: "idle" }
  | {
      status: "error";
      values: TellUsValues;
      errors: Partial<Record<TellUsField, string>>;
      /** A whole-form failure (the email did not send), shown above the fields. */
      message?: string;
    }
  /** Sent to NOTIFY_EMAIL; the form is replaced by the thank-you. */
  | { status: "sent"; massage: Massage }
  /** The honeypot was filled: the same thank-you, no email, no event. */
  | { status: "discarded" };

export const idleState: TellUsState = { status: "idle" };

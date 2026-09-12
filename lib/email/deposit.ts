import "server-only";

/**
 * The two emails a completed deposit produces (Prompt 4): the confirmation
 * to the buyer, per the copy document ("the two-day promise, the refund
 * terms in one line, a request for two or three windows for the call,
 * signed by the founders"), and the notification to NOTIFY_EMAIL with the
 * customer email, the amount and the session id. Plain text first; the HTML
 * is the same content in a readable column.
 */

const column = "font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#1c1917;max-width:36em";
const quiet = "color:#6b625b";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function depositConfirmationEmail() {
  const subject = "Your slot is held";

  const lines = [
    "Your slot is held.",
    "We will email you within two days to book the planning call.",
    "Your $500 is fully refundable until we confirm your date on that call.",
    "Reply to this email with two or three windows in the next week that suit you, and we will book the call in one of them. Twenty minutes; we ask about her and draft the card with you.",
  ];
  const signature = ["The founders", "Thoughtful Moments, Dallas"];

  const text = [...lines.flatMap((line) => [line, ""]), ...signature].join("\n");

  const html = [
    `<div style="${column}">`,
    ...lines.map((line, index) =>
      index === 0 ? `<p><strong>${escapeHtml(line)}</strong></p>` : `<p>${escapeHtml(line)}</p>`,
    ),
    `<p style="${quiet}">${signature.map(escapeHtml).join("<br>")}</p>`,
    "</div>",
  ].join("\n");

  return { subject, text, html };
}

export type DepositDetails = {
  customerEmail: string;
  customerName?: string;
  /** Formatted for reading, e.g. "$500.00". */
  amount: string;
  sessionId: string;
};

export function depositNotificationEmail(details: DepositDetails) {
  const subject = "New deposit: Her Night, Your Hands";

  const rows = [
    {
      label: "Customer",
      value: details.customerName
        ? `${details.customerName} <${details.customerEmail}>`
        : details.customerEmail,
    },
    { label: "Amount", value: details.amount },
    { label: "Stripe session", value: details.sessionId },
  ];
  const promise =
    "You promised him the planning call within two days. Write to him at the address above to book it; his own confirmation asked him to reply with two or three windows.";

  const text = [
    "A man in Dallas held a slot.",
    "",
    ...rows.map(({ label, value }) => `${label}: ${value}`),
    "",
    promise,
  ].join("\n");

  const html = [
    `<div style="${column}">`,
    "<p>A man in Dallas held a slot.</p>",
    ...rows.map(
      ({ label, value }) => `<p><strong>${escapeHtml(label)}</strong><br>${escapeHtml(value)}</p>`,
    ),
    `<p style="${quiet}">${escapeHtml(promise)}</p>`,
    "</div>",
  ].join("\n");

  return { subject, text, html };
}

/** "$500.00" from Stripe's minor units and currency code. */
export function formatAmount(minorUnits: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(minorUnits / 100);
}

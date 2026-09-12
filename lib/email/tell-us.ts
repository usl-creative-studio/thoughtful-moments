import "server-only";
import { formatDate, massageOptions, type TellUsAnswers } from "@/lib/tell-us";

/**
 * The one email a Tell Us About Her submission produces: every answer, to
 * NOTIFY_EMAIL, with the sender as reply-to so the founder answers by replying.
 * Plain text first; the HTML is the same content in a readable column.
 */

type Row = { question: string; answer: string };

function rows(answers: TellUsAnswers): Row[] {
  const massage = massageOptions.find((option) => option.value === answers.massage);
  return [
    { question: "Her birthday or your anniversary", answer: formatDate(answers.date) },
    { question: "Where you live", answer: answers.where },
    { question: "Three things she loves", answer: answers.loves },
    { question: "One thing she has said about you lately", answer: answers.said },
    { question: "Would you give her the massage yourself?", answer: massage?.label ?? answers.massage },
    { question: "Your email", answer: answers.email },
  ];
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function tellUsEmail(answers: TellUsAnswers) {
  const list = rows(answers);
  const subject = `Tell Us About Her: ${formatDate(answers.date)}`;

  const text = [
    "A man in Dallas told us about her.",
    "",
    ...list.flatMap(({ question, answer }) => [question, answer, ""]),
    "Reply to this email to write back to him. We promised a plan for the night and the price within two days.",
  ].join("\n");

  const html = [
    '<div style="font-family:Georgia,serif;font-size:16px;line-height:1.6;color:#1c1917;max-width:36em">',
    "<p>A man in Dallas told us about her.</p>",
    ...list.map(
      ({ question, answer }) =>
        `<p><strong>${escapeHtml(question)}</strong><br>${escapeHtml(answer).replaceAll("\n", "<br>")}</p>`,
    ),
    '<p style="color:#6b625b">Reply to this email to write back to him. We promised a plan for the night and the price within two days.</p>',
    "</div>",
  ].join("\n");

  return { subject, text, html };
}

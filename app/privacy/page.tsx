import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";

/**
 * Privacy (Prompt 9). Headings and marked TODO sections only; the founder
 * writes the text. The one rule the page already makes is the brief for it:
 * what he tells us is used for the plan and the night, and nothing else.
 */
export const metadata: Metadata = {
  title: "Privacy",
  alternates: { canonical: "/privacy" },
};

const sections: LegalSection[] = [
  {
    heading: "What we collect",
    todo: "The answers from Tell Us About Her, the email address, what is said on the planning call, and the payment record Stripe holds. Nothing is stored on this site.",
  },
  {
    heading: "What it is used for",
    todo: "The plan for the night and the night itself, and nothing else. No list, no marketing, no sharing beyond the people who set the room.",
  },
  {
    heading: "Who handles it",
    todo: "The services that touch the data and what each one sees: Stripe for the deposit, Resend for email, Vercel for hosting and analytics. Analytics is cookieless page and event counts.",
  },
  {
    heading: "How long we keep it",
    todo: "How long the emails and the call notes are kept after the night, and how he asks for them to be deleted.",
  },
];

export default function PrivacyPage() {
  return <LegalPage title="Privacy" sections={sections} />;
}

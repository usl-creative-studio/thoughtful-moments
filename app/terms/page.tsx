import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";

/**
 * Terms and refund policy (Prompt 9). Headings and marked TODO sections only:
 * the founder writes the text after professional review of the waiver and the
 * delivery commitment. The page title is from the footer line in the copy
 * document. Linked from the footer; noindex is inherited from the root layout.
 */
export const metadata: Metadata = {
  title: "Terms and refund policy",
  alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
  {
    heading: "The deposit",
    todo: "The $500 deposit and its refund terms: fully refundable until the date is confirmed on the planning call, and what confirming the date means.",
  },
  {
    heading: "The balance",
    todo: "When the balance is due (two weeks before the night, when ordering starts), how it is paid, and what happens if the night is moved or cancelled after that point.",
  },
  {
    heading: "Our commitment",
    todo: "The delivery commitment as reviewed: if the room, the food or the flowers are not what was agreed on the call, he does not pay for the night. State what is and is not covered.",
  },
  {
    heading: "The massage",
    todo: "Reference to the waiver and the contraindication card he signs before the night, and where they are sent. Reviewed wording only.",
  },
  {
    heading: "Access to the home",
    todo: "How setup and the morning-after clearance work: who comes, when, and what is agreed on the call about keys and access.",
  },
];

export default function TermsPage() {
  return <LegalPage title="Terms and refund policy" sections={sections} />;
}

import { Hairline, Reveal, RevealGroup, RevealItem } from "@/components/motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * Module 7, questions men ask us. Copy is verbatim from
 * usl-build/6-landing-page-copy.md: objections two to six in observed order,
 * plus the price question. A dense module (80px/56px padding-block). Six
 * question and answer pairs in one 64ch column, collapsed until the question
 * is opened (founder decision 2026-09-11, context/decisions.md, reversing the
 * copy document); more than one can be open at once, and find-in-page still
 * reaches every answer (`hiddenUntilFound`). The questions stay headings (h3
 * around the button) so a screen reader can walk them, and each pair opens
 * with a hairline so the rules read as rows. No chat widget, no "still have
 * questions" line: the answers are the proof.
 */

type Pair = {
  question: string;
  answer: string;
};

const pairs: readonly Pair[] = [
  {
    question: "Will she know I did not plan it?",
    answer:
      "She will know you did not carry a table up the stairs. Everything she sees on the night is a choice you made on the call: the food, the flowers, the card in your handwriting, the massage from your hands. We handled the logistics. You handled her.",
  },
  {
    question: "Why $2,500?",
    answer:
      "A professional massage table, oils and linens, an afternoon and a morning in your home, food from a kitchen we trust, flowers, and the hours of planning you do not have. The price is the night done properly, once.",
  },
  {
    question: "Who exactly is coming into my house?",
    answer:
      "The founders. For now we do every setup ourselves. We arrive at the time we agree, we take no photos, and we leave well before she is back.",
  },
  {
    question: "How do I get her out of the house?",
    answer:
      "We plan that on the call. It is usually an afternoon: a salon booking, a friend, an errand you invent. You will have a plan and a fallback before we hang up.",
  },
  {
    question: "What if she is not into massage?",
    answer:
      "Then this is not the right night for her, and we would rather tell you that on the call than take your money. Ask her what she loves before you hold a slot.",
  },
  {
    question: "What about the food?",
    answer:
      "A Dallas kitchen we work with prepares it. We plate it to your instructions before we leave, so when the massage is done, you serve it. Allergies and preferences are covered on the call.",
  },
];

export function Questions() {
  return (
    <section className="container py-14 lg:py-20">
      <Reveal as="h2" className="text-display-2 font-medium">
        Questions men ask us
      </Reveal>

      {/* The reveal wraps each item from outside; Base UI finds its items by context,
          so the motion wrapper between Root and Item does not break the keyboard order. */}
      <RevealGroup className="measure mt-10">
        <Accordion multiple hiddenUntilFound>
          {pairs.map((pair) => (
            <RevealItem key={pair.question} className="pb-6">
              <Hairline className="mb-5" />
              <AccordionItem value={pair.question}>
                <AccordionTrigger>{pair.question}</AccordionTrigger>
                <AccordionContent>
                  <p className="text-body">{pair.answer}</p>
                </AccordionContent>
              </AccordionItem>
            </RevealItem>
          ))}
        </Accordion>
      </RevealGroup>
    </section>
  );
}

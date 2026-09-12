import Image from "next/image";
import { Hairline, Reveal, RevealGroup, RevealItem, Warm } from "@/components/motion";

/**
 * Module 3, how the night works. Copy is verbatim from
 * usl-build/6-landing-page-copy.md. Desktop: the heading alone in columns
 * 1 to 4, the five steps in columns 6 to 12. Mobile: heading, then the list.
 * Hairlines only between steps; no circles, icons, cards or timeline.
 * Step 4 is the one that is his: its number and lead phrase warm to oxblood,
 * and the words "This part is yours" carry the meaning without the colour.
 */

type Step = {
  lead: string;
  body: string;
  /** Step 4 only. */
  yours?: boolean;
};

const steps: readonly Step[] = [
  {
    lead: "The planning call.",
    body:
      "Twenty minutes, within two days of your deposit. We ask about her: what she loves, what she cannot eat, the date, and how you will get her out of the house for an afternoon. We draft the card with you, in your words. Once the date is confirmed, your deposit becomes the first part of the price.",
  },
  {
    lead: "Two weeks out.",
    body:
      "The balance is due and we order the food and the flowers. Your cue cards and a five-minute practice video arrive.",
  },
  {
    lead: "The afternoon.",
    body:
      "Two of us arrive while she is out. The table, the linens, the candles, the scent, the music, the flowers, the food plated to your instructions. We are gone before she is home.",
  },
  {
    lead: "The night.",
    body:
      "This part is yours. You hand her the card. You give her the massage, cue cards beside you. When you are done, dinner is on the table.",
    yours: true,
  },
  {
    lead: "The morning after.",
    body:
      "We come back at the time we agreed and take everything away. The house looks like it did yesterday.",
  },
];

/**
 * The number is a CSS counter drawn in the serif before the lead phrase, so
 * the `ol` stays a real ordered list and the number shares the lead's colour.
 */
const leadClass = "font-bold before:content-[counter(step)_'._']";

export function HowItWorks() {
  return (
    <section className="container py-16 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:py-24">
      <Reveal as="h2" className="text-display-2 font-medium lg:col-span-4 lg:col-start-1">
        How the night works
      </Reveal>

      <RevealGroup
        as="ol"
        className="mt-10 list-none [counter-reset:step] lg:col-span-7 lg:col-start-6 lg:mt-0"
      >
        {steps.map((step, index) => (
          <RevealItem
            key={step.lead}
            as="li"
            className="pb-6 [counter-increment:step] last:pb-0"
          >
            {index > 0 && <Hairline className="mb-6" />}
            <p className="text-body">
              {step.yours ? (
                <Warm className="text-oxblood">
                  <strong className={leadClass}>{step.lead}</strong>
                </Warm>
              ) : (
                <strong className={leadClass}>{step.lead}</strong>
              )}{" "}
              {step.body}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Optional inline image, desktop only, aligned with the steps. */}
      <Reveal
        as="figure"
        className="hidden lg:col-span-7 lg:col-start-6 lg:mt-16 lg:block"
      >
        {/* PLACEHOLDER, generated: replace with a documentary photograph from night one. */}
        <Image
          src="/images/morning-after.webp"
          alt="The same room the next morning, cleared and ordinary again."
          width={1872}
          height={1248}
          sizes="(min-width: 1024px) 40vw, 0px"
          className="aspect-[3/2] h-auto w-full object-cover"
        />
        <figcaption className="mt-3 small-caps tracking-caps text-caption text-warm-grey">
          The morning after. Placeholder until night one.
        </figcaption>
      </Reveal>
    </section>
  );
}

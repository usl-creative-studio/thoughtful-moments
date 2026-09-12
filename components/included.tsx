import { Hairline, Reveal, RevealGroup, RevealItem } from "@/components/motion";

/**
 * Module 5, what is included, and what is not. Copy is verbatim from
 * usl-build/6-landing-page-copy.md under the Stage 5 display names. A dense
 * module (80px/56px padding-block). The nine components are a definition
 * list: at desktop two columns (five and four), filled column-first so the reading
 * order is the document order; on mobile one column. Every pair opens with a
 * hairline, so the rules read as rows. No borders, icons, values or total.
 */

type Item = {
  name: string;
  body: string;
};

const included: readonly Item[] = [
  {
    name: "The Planning Call.",
    body: "Twenty minutes with us about her. The date, the food, the card, the plan for the afternoon.",
  },
  {
    name: "The Setup.",
    body: "We set the room while she is out: candles, scent, music, the dinner table laid.",
  },
  {
    name: "The Massage Table, Oils and Linens.",
    body: "A professional massage table, essential oils, towels and fresh linens, brought in for the night and taken away with everything else.",
  },
  {
    name: "Dinner for Two, Delivered.",
    body: "From a Dallas kitchen we work with, plated to your instructions, so you serve it.",
  },
  {
    name: "The Flowers and Your Card.",
    body: "A full bouquet, and a handwritten card in your words. We draft it with you; you write it.",
  },
  {
    name: "Your Cue Cards and Practice Video.",
    body: "Twelve cards, one move each, and five minutes to watch the night before.",
  },
  {
    name: "Conversation Cards.",
    body: "For when the massage is done and dinner is on the table.",
  },
  {
    name: "The Morning After, Handled.",
    body: "We come back and take everything away.",
  },
  {
    name: "Our Discretion Promise.",
    body: "No photos. Nobody sees us arrive or leave. What we know about her stays with the night.",
  },
];

export function Included() {
  return (
    <section className="container py-14 lg:py-20">
      <Reveal as="h2" className="text-display-2 font-medium">
        What is included
      </Reveal>

      <RevealGroup
        as="dl"
        className="mt-10 lg:grid lg:grid-flow-col lg:grid-cols-2 lg:grid-rows-5 lg:gap-x-6"
      >
        {included.map((item) => (
          <RevealItem key={item.name} className="pb-6">
            <Hairline className="mb-6" />
            <dt className="text-body font-bold">{item.name}</dt>
            <dd className="mt-1 text-body">{item.body}</dd>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal as="h3" className="mt-10 text-h3 font-medium">
        What it is not
      </Reveal>
      <Reveal as="p" className="mt-4 max-w-[56ch] text-body">
        Nobody else touches her. There is no therapist. Nothing arrives in a box for you to
        assemble. The night is yours; the hours around it are ours.
      </Reveal>
    </section>
  );
}

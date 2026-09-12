import Image from "next/image";
import { Handwritten, Reveal, RevealGroup, RevealItem } from "@/components/motion";
import { duration, stagger } from "@/lib/motion";

/**
 * Module 4, the part that has to be yours. Copy is verbatim from
 * usl-build/6-landing-page-copy.md, including the card. Desktop: heading and
 * the two paragraphs in columns 1 to 6, the cue card in columns 8 to 12,
 * turned two degrees. Mobile: text, then the card full width and square.
 * The card is the only element on the page with a border and a radius; the
 * handwritten face appears here for the second time, on the title only.
 *
 * Beneath the card, the stroke it describes in two frames (founder decision
 * 2026-09-11, context/decisions.md): hands at the base of her neck, then the
 * same hands at her shoulder blades. They arrive in order, once, and rest.
 */

/** PLACEHOLDER, generated: replace with documentary frames from night one. */
const strokeFrames = [
  {
    src: "/images/cue-card-shoulders-1.webp",
    alt: "A man's hands flat at the base of her neck, thumbs either side of her spine.",
    caption: "1 · From the neck",
  },
  {
    src: "/images/cue-card-shoulders-2.webp",
    alt: "The same hands at her shoulder blades, the end of the stroke.",
    caption: "2 · Down to the shoulder blades",
  },
] as const;

export function YourPart() {
  return (
    <section className="container py-16 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:py-24">
      <RevealGroup className="measure lg:col-span-6 lg:col-start-1">
        <RevealItem as="h2" className="text-display-2 font-medium">
          The part that has to be yours
        </RevealItem>

        <RevealItem as="p" className="mt-6 text-body">
          Everything on this page could be done by someone else, except one thing. The moment you
          are after, when she realises you did this, only exists if the hands are yours.
        </RevealItem>

        <RevealItem as="p" className="mt-4 text-body">
          So we make sure you are not guessing. On the call, we walk through the massage step by
          step. Two weeks out, you get numbered cue cards and a five-minute video to watch the
          night before. On the night, the cards sit beside you. Twelve of them, one move each, in
          order. You do not have to remember anything. You just have to be there, with her, and
          nowhere else.
        </RevealItem>
      </RevealGroup>

      <div className="mt-12 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:self-center">
        {/* The angle lives on this wrapper, outside the reveal, so the card is set down on the
            table after the text has landed, already turned. Square under 1024px and under
            reduced motion. The frames below sit outside it, so they stay square. */}
        <div className="lg:-rotate-2 lg:motion-reduce:rotate-0">
          {/* One cue card rendered in code. The final twelve are the founder's to write. */}
          <Reveal as="figure" delay={0.2} className="rounded-lg border border-rule bg-bone p-6">
            <figcaption className="small-caps tracking-caps text-caption text-warm-grey">
              Card 4 of 12
            </figcaption>
            <p className="mt-3">
              <Handwritten className="font-hand text-hand-title">Shoulders.</Handwritten>
            </p>
            <p className="mt-2 text-body">
              Both hands flat, thumbs either side of her spine. Slow, from the neck down to the
              shoulder blades. Six times. Slower than feels natural.
            </p>
            <p className="mt-4 text-small italic">Ask her: &ldquo;Where do you carry the week?&rdquo;</p>
          </Reveal>
        </div>

        {/* The stroke, in order. Frame 1 lands as the card settles; frame 2 a beat later.
            An ordered list so the sequence is in the document, not only on screen. */}
        <RevealGroup
          as="ol"
          delay={duration.settle}
          gap={stagger.beat}
          className="mt-8 grid grid-cols-2 gap-4"
        >
          {strokeFrames.map((frame) => (
            <RevealItem as="li" key={frame.src}>
              <Image
                src={frame.src}
                alt={frame.alt}
                width={896}
                height={1200}
                sizes="(min-width: 1024px) 20vw, 45vw"
                className="h-auto w-full"
              />
              <p className="small-caps tracking-caps mt-3 text-caption text-warm-grey">
                {frame.caption}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

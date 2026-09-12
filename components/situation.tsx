import { Reveal } from "@/components/motion";

/**
 * Module 2, the situation. One paragraph and nothing else: no heading, no
 * image. Set as a quote block (italic, a hairline down its left, a wide
 * measure so it runs three or four lines) to break the page between the hero
 * and the steps. Copy is verbatim from usl-build/6-landing-page-copy.md. An
 * air module: 128px/80px padding-block, columns 2 to 12 at desktop, and it
 * arrives at the slow pace.
 */
export function Situation() {
  return (
    <section className="container py-20 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:py-32">
      <Reveal
        as="p"
        pace="slow"
        className="border-l border-rule pl-6 text-pretty text-body-large italic lg:col-span-11 lg:col-start-2 lg:pl-8"
      >
        You love her, and she knows it. She also knows you have been gone since six and home
        since nine for most of this year. Money is easy for you now, which is why the necklace
        lands a little softer each time. What she has not had in a while is an evening where your
        attention was the whole point.
      </Reveal>
    </section>
  );
}

import { Handwritten, Reveal } from "@/components/motion";

/**
 * Module 8, from Irewole. Copy is verbatim from usl-build/6-landing-page-copy.md;
 * the founder may edit it before publish, and the edit goes back to the copy
 * document. An air module (128px/80px padding-block) at the slow pace: the
 * note in body-large at 56ch, and the signature in the handwritten face, the
 * third and last place it appears on the page, writing itself once the note
 * has landed. No photograph until the founder supplies one; when it exists it
 * sits 4:5 at 240px wide to the left of the note at desktop (columns 1 to 3),
 * and the note moves to columns 4 to 11.
 */
export function FounderNote() {
  return (
    <section className="container py-20 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:py-32">
      <div className="lg:col-span-9 lg:col-start-2">
        <Reveal as="h3" pace="slow" className="text-h3 font-medium">
          From Irewole
        </Reveal>

        <Reveal
          as="p"
          pace="slow"
          className="mt-6 max-w-[56ch] text-body-large"
        >
          I am in the same position as the man this page is written for. I love
          my partner, I work more hours than I would choose, and for a long time
          everything I gave her was a function of what I earned, not of what I
          paid attention to. I believe intentionality is what builds intimacy,
          and that intimacy is built by hand, in small deliberate acts nobody
          else could have done for you. Thoughtful Moments exists so that a man
          with no hours can still do the one thing that counts. We do everything
          else.
        </Reveal>

        <p className="mt-8">
          <Handwritten className="font-hand text-hand-signature" delay={0.3}>
            Irewole Akande, Dallas
          </Handwritten>
        </p>
      </div>
    </section>
  );
}

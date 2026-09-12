"use client";

import Image from "next/image";
import { track } from "@vercel/analytics";
import { createDepositSession } from "@/app/actions/checkout";
import { RevealGroup, RevealItem, SettleIn } from "@/components/motion";
import { Button } from "@/components/ui/button";

/**
 * Module 1, the decision zone. Copy is verbatim from
 * usl-build/6-landing-page-copy.md. Desktop: text in container columns 1 to 6,
 * the image in columns 7 to 12, ending at the container's right edge so the
 * band is centred like every other module (founder decision 2026-09-11; it
 * bled to the viewport edge before and read as shoved left on wide screens),
 * as tall as the text block so the two read as one band. Mobile: image first.
 * This is the one place motion runs on load.
 */
export function Hero() {
  return (
    <section className="lg:bleed-grid lg:items-stretch">
      {/* Image. Order 2 at desktop so the text column reads first in the grid. */}
      <div className="lg:order-2 lg:col-start-8 lg:col-end-14 lg:py-24">
        <SettleIn className="relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:h-full">
          {/* PLACEHOLDER, generated: replace with a documentary photograph from night one.
              At desktop the box is 145% wide so the wrapper clips the generated card text at the right edge. */}
          <Image
            src="/images/hero-room.webp"
            alt="A living room set for the evening: a dressed table, roses, candles, one not yet lit."
            width={1872}
            height={1248}
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="absolute inset-y-0 left-0 h-full w-full max-w-none object-cover object-[20%_center] lg:w-[145%]"
          />
        </SettleIn>
      </div>

      {/* Text column. */}
      <div className="container pt-8 pb-16 lg:order-1 lg:col-span-6 lg:col-start-2 lg:self-center lg:py-24 lg:pr-12 lg:pl-0">
        <RevealGroup on="mount" delay={0.15} className="max-w-[36rem] lg:max-w-none">
          <h1 className="text-display-1 font-medium">
            <RevealItem as="span" className="block">
              You love her.
            </RevealItem>
            <RevealItem as="span" className="block">
              That was never the question.
            </RevealItem>
          </h1>

          <RevealItem as="p" className="mt-6 text-body">
            One night at home. You give her a massage, cue cards beside you, and when you are
            done, dinner is on the table. We plan it on one call, set the room while she is out,
            and are gone before she is home. The next morning we take it all away.
          </RevealItem>

          <RevealItem as="p" className="mt-4 text-body">
            We take five bookings a month. Our first five are $2,500; after that, $3,500. $500
            holds your slot, refundable until we confirm your date.
          </RevealItem>

          <RevealItem className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <form action={createDepositSession}>
              <Button
                type="submit"
                onClick={() => track("cta_hold_slot_click", { location: "hero" })}
              >
                Hold a slot
              </Button>
            </form>
            <a href="#tell-us" className="text-body text-ink">
              Not ready? Tell us about her.
            </a>
          </RevealItem>

          <RevealItem as="p" className="mt-6 small-caps tracking-caps text-caption text-warm-grey">
            For a man in Dallas with her birthday or your anniversary in the next sixty days.
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}

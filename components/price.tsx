"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";
import { HoldSlotButton } from "@/components/hold-slot-button";
import { Hairline, Reveal } from "@/components/motion";

/**
 * Module 6, the price. Copy is verbatim from usl-build/6-landing-page-copy.md.
 * The page states the price and does not argue it: the price line in the
 * `text-price` token (display-1 held at 56px), the limit with its reason, the
 * deposit terms, and the delivery commitment set apart by a hairline rule and
 * nothing else. `id="price"` is the Checkout cancel target. `scroll_price` fires once when half the module is on screen.
 */

/** How much of the module must be visible before `scroll_price` fires. */
const seenThreshold = 0.5;

export function Price() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = section.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          track("scroll_price");
          observer.disconnect();
        }
      },
      { threshold: seenThreshold },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={section} id="price" className="container scroll-mt-8 py-16 lg:py-24">
      <Reveal as="h2" className="text-display-2 font-medium">
        The price
      </Reveal>

      {/* One paragraph, two sentences; each sentence takes its own line. */}
      <Reveal as="p" pace="slow" className="mt-8 text-price font-medium">
        <span className="block">$2,500 for our first five bookings.</span>{" "}
        <span className="block">$3,500 after that.</span>
      </Reveal>

      <Reveal as="p" className="measure mt-8 text-body">
        We take five a month, because we set up and clear away every one ourselves, and we will
        not send anyone else into your home.
      </Reveal>

      <div className="measure mt-10">
        <Reveal as="p" className="text-body">
          <strong className="font-bold">Holding a slot.</strong> $500 today. Fully refundable until
          we confirm your date on the call. The balance is due two weeks before the night, when we
          start ordering.
        </Reveal>

        <Hairline className="my-6" />

        <Reveal as="p" className="text-body">
          <strong className="font-bold">Our commitment.</strong> If the room, the food or the
          flowers are not what we agreed on the call, you do not pay for the night.
        </Reveal>
      </div>

      <Reveal className="mt-10">
        <HoldSlotButton location="price" />
      </Reveal>
    </section>
  );
}

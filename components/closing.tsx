"use client";

import { track } from "@vercel/analytics";
import { createDepositSession } from "@/app/actions/checkout";
import { Hairline, RevealGroup, RevealItem } from "@/components/motion";
import { TellUsForm } from "@/components/tell-us-form";
import { Button } from "@/components/ui/button";

/**
 * Module 9, the closing action. Copy is verbatim from
 * usl-build/6-landing-page-copy.md: the decision once more, in two lines, and
 * the button; then a hairline; then the way in for a man not ready, the Tell
 * Us About Her form. The heading, paragraph and button arrive as one group;
 * the form does not animate.
 */
export function Closing() {
  return (
    <section className="container py-16 lg:py-24">
      <RevealGroup>
        <RevealItem as="h2" className="text-display-2 font-medium">
          Her date is coming.
        </RevealItem>

        {/* One paragraph, two sentences; each sentence takes its own line. */}
        <RevealItem as="p" className="measure mt-6 text-body">
          <span className="block">Five bookings a month.</span>{" "}
          <span className="block">$500 holds your slot, refundable until we confirm your date.</span>
        </RevealItem>

        <RevealItem className="mt-8">
          <form action={createDepositSession}>
            <Button
              type="submit"
              onClick={() => track("cta_hold_slot_click", { location: "closing" })}
            >
              Hold a slot
            </Button>
          </form>
        </RevealItem>
      </RevealGroup>

      <Hairline className="my-12 lg:my-16" />

      <TellUsForm />
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { createDepositSession } from "@/app/actions/checkout";
import { SlideUp } from "@/components/motion";
import { Button } from "@/components/ui/button";

/**
 * The sticky mobile "Hold a slot" bar (Prompt 8). Rises once the reader has
 * scrolled past Module 3 and drops away while the Tell Us About Her form is in
 * view, so it never covers a field he is typing in. Mobile and tablet only;
 * at desktop the page's own buttons are never far. The line beside the button
 * is the deposit sentence from Module 9, cut to its first clause.
 */

/** Module 3 and the form, by the ids the observers watch. */
const stepsId = "how-it-works";
const formId = "tell-us";

export function StickyCta() {
  const [pastSteps, setPastSteps] = useState(false);
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const steps = document.getElementById(stepsId);
    const form = document.getElementById(formId);
    if (!steps || !form) return;

    // Past Module 3 once its bottom edge has left through the top of the viewport.
    const stepsObserver = new IntersectionObserver(([entry]) => {
      if (entry) setPastSteps(!entry.isIntersecting && entry.boundingClientRect.bottom < 0);
    });
    const formObserver = new IntersectionObserver(([entry]) => {
      if (entry) setFormInView(entry.isIntersecting);
    });
    stepsObserver.observe(steps);
    formObserver.observe(form);

    return () => {
      stepsObserver.disconnect();
      formObserver.disconnect();
    };
  }, []);

  return (
    <SlideUp
      show={pastSteps && !formInView}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-bone lg:hidden"
    >
      <div className="container flex items-center justify-between gap-4 py-3">
        <p className="text-small text-warm-grey">$500 holds your slot.</p>
        <form action={createDepositSession}>
          <Button
            type="submit"
            onClick={() => track("cta_hold_slot_click", { location: "sticky" })}
          >
            Hold a slot
          </Button>
        </form>
      </div>
    </SlideUp>
  );
}

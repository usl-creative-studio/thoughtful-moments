"use client";

import { useFormStatus } from "react-dom";
import { track } from "@vercel/analytics";
import { createDepositSession } from "@/app/actions/checkout";
import { Button } from "@/components/ui/button";

/**
 * The one "Hold a slot" control, used in the hero, the price module, the
 * closing and the sticky bar. A form posting to the Stripe Server Action;
 * while the session is being created the button reads "Opening secure
 * checkout…" and is disabled (still focusable, so focus is not lost), and a
 * status region that exists from first render announces the same. `location`
 * is the analytics value for this button (context/conventions.md).
 */
export type HoldSlotLocation = "hero" | "price" | "closing" | "sticky";

const pendingLabel = "Opening secure checkout…";

function SubmitButton({ location }: { location: HoldSlotLocation }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      focusableWhenDisabled
      onClick={() => track("cta_hold_slot_click", { location })}
    >
      {pending ? pendingLabel : "Hold a slot"}
    </Button>
  );
}

function PendingStatus() {
  const { pending } = useFormStatus();
  return (
    <span role="status" aria-live="polite" className="sr-only">
      {pending ? pendingLabel : null}
    </span>
  );
}

export function HoldSlotButton({ location }: { location: HoldSlotLocation }) {
  return (
    <form action={createDepositSession}>
      <SubmitButton location={location} />
      <PendingStatus />
    </form>
  );
}

"use client";

import type { ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import { distance, duration, ease, viewport, type DurationKey } from "@/lib/motion";
import { blockTags, type BlockTag } from "./tags";

type RevealProps = {
  children: ReactNode;
  /** Element to render. Default `div`. */
  as?: BlockTag;
  className?: string;
  /** Seconds to wait before arriving. */
  delay?: number;
  /** `settle` for content, `slow` for the air modules. */
  pace?: DurationKey;
  /** `view` arrives when scrolled to; `mount` arrives on page load (hero only). */
  on?: "view" | "mount";
};

/**
 * One block that fades and rises a breath as it arrives. Once only.
 * Under reduced motion it renders at rest.
 */
export function Reveal({
  children,
  as = "div",
  className,
  delay = 0,
  pace = "settle",
  on = "view",
}: RevealProps) {
  const reduced = useReducedMotion() === true;
  const Tag = blockTags[as];
  const resting = { opacity: 1, y: 0 };
  // Under reduced motion the initial state is the resting state, not `false`:
  // `false` would adopt the server-rendered opacity 0 and fade from it.
  const hidden = reduced ? resting : { opacity: 0, y: distance };
  const transition = { duration: duration[pace], ease: ease.hand, delay };

  if (on === "mount") {
    return (
      <Tag className={className} initial={hidden} animate={resting} transition={transition}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      initial={hidden}
      whileInView={resting}
      viewport={viewport}
      transition={transition}
    >
      {children}
    </Tag>
  );
}

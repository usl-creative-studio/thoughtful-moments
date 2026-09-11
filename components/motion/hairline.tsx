"use client";

import { motion, useReducedMotion } from "motion/react";
import { duration, ease, viewport } from "@/lib/motion";

type HairlineProps = {
  className?: string;
  /** Seconds to wait before the line starts. */
  delay?: number;
};

/**
 * The 1px rule, drawn from the left like a pen stroke when it comes into view.
 * Replaces a static border wherever the spec calls for a hairline between rows.
 * Place it as the first child of an `li` or a `div` inside a `dl`, never as a
 * direct child of `ol` or `ul`. Under reduced motion it is a plain rule.
 */
export function Hairline({ className, delay = 0 }: HairlineProps) {
  const reduced = useReducedMotion() === true;

  return (
    <motion.hr
      aria-hidden="true"
      className={["h-px w-full border-0 bg-rule", className].filter(Boolean).join(" ")}
      style={{ transformOrigin: "left center" }}
      initial={reduced ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={viewport}
      transition={{ duration: duration.slow, ease: ease.pen, delay }}
    />
  );
}

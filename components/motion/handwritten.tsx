"use client";

import { motion, useReducedMotion } from "motion/react";
import { ease, handwritingDuration } from "@/lib/motion";

type HandwrittenProps = {
  /** The line itself. A string, so the write-on can be paced to its length. */
  children: string;
  /** Put the handwritten face and size here (for example `font-hand text-[22px]`). */
  className?: string;
  /** Seconds to wait before the pen starts. */
  delay?: number;
};

/**
 * Handwriting that writes itself, left to right, once, when it comes into view.
 * The signature motion of the page: it runs only where he writes, so use it in
 * the three permitted places and nowhere else. Never on anything the reader
 * must act on. Under reduced motion the line is simply there.
 */
export function Handwritten({ children, className, delay = 0 }: HandwrittenProps) {
  const reduced = useReducedMotion() === true;
  // Negative top and bottom insets keep ascenders and descenders unclipped.
  const covered = "inset(-0.25em 100% -0.35em 0)";
  const written = "inset(-0.25em 0% -0.35em 0)";

  return (
    <motion.span
      className={["inline-block", className].filter(Boolean).join(" ")}
      initial={reduced ? false : { clipPath: covered }}
      whileInView={{ clipPath: written }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: handwritingDuration(children), ease: ease.pen, delay }}
    >
      {children}
    </motion.span>
  );
}

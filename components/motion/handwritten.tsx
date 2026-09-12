"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { ease, handwritingDuration } from "@/lib/motion";

type HandwrittenProps = {
  /** The line itself. A string, so the write-on can be paced to its length. */
  children: string;
  /** Put the handwritten face and size here (for example `font-hand text-hand-title`). */
  className?: string;
  /** Seconds to wait before the pen starts. */
  delay?: number;
};

/**
 * Handwriting that writes itself, left to right, once, when it comes into view.
 * The signature motion of the page: it runs only where he writes, so use it in
 * the three permitted places and nowhere else. Never on anything the reader
 * must act on. Under reduced motion the line is simply there.
 *
 * Two spans: the outer one watches the viewport, the inner one carries the
 * clip. The browser treats a fully clipped element as never on screen, so the
 * clip cannot sit on the element being observed.
 */
export function Handwritten({ children, className, delay = 0 }: HandwrittenProps) {
  const reduced = useReducedMotion() === true;
  // Negative top and bottom insets keep ascenders and descenders unclipped.
  const covered = "inset(-0.25em 100% -0.35em 0)";
  const written = "inset(-0.25em 0% -0.35em 0)";
  const variants: Variants = {
    covered: { clipPath: covered },
    written: {
      clipPath: written,
      transition: { duration: handwritingDuration(children), ease: ease.pen, delay },
    },
  };

  return (
    <motion.span
      className="inline-block"
      initial={reduced ? "written" : "covered"}
      whileInView="written"
      viewport={{ once: true, amount: 0.8 }}
    >
      <motion.span
        className={["inline-block", className].filter(Boolean).join(" ")}
        variants={variants}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

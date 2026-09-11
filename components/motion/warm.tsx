"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { duration, ease } from "@/lib/motion";

type WarmProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait once in view. */
  delay?: number;
};

/**
 * Text that warms from ink to oxblood as the reader reaches it. Built for
 * step 4 of "How the night works", the one step that is his. Colour is never
 * the only signal: the words carry the meaning, this only underlines it.
 * Reads the `--color-ink` and `--color-oxblood` tokens from app/globals.css.
 * Under reduced motion the text is oxblood from the start.
 */
export function Warm({ children, className, delay = 0 }: WarmProps) {
  const reduced = useReducedMotion() === true;

  return (
    <motion.span
      className={className}
      initial={reduced ? false : { color: "var(--color-ink)" }}
      whileInView={{ color: "var(--color-oxblood)" }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: duration.slow, ease: ease.hand, delay }}
    >
      {children}
    </motion.span>
  );
}

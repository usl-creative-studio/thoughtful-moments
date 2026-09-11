"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { duration, ease } from "@/lib/motion";

type SettleInProps = {
  children: ReactNode;
  /** Give the wrapper `overflow-hidden` and the image's aspect ratio. */
  className?: string;
  /** Seconds to wait before the image starts to settle. */
  delay?: number;
};

/**
 * For the hero image only. It comes into focus on load: opacity rises and a
 * barely-there scale settles from 1.03 to 1, like eyes adjusting to a dim
 * room. Runs on mount, once. Under reduced motion the image is simply there.
 */
export function SettleIn({ children, className, delay = 0 }: SettleInProps) {
  const reduced = useReducedMotion() === true;

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, scale: 1.03 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: duration.slow, ease: ease.hand, delay }}
    >
      {children}
    </motion.div>
  );
}

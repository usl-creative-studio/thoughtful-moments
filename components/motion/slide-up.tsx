"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { duration, ease } from "@/lib/motion";

type SlideUpProps = {
  /** Mounts the child when true, unmounts it (after the exit) when false. */
  show: boolean;
  children: ReactNode;
  className?: string;
};

/**
 * For the sticky mobile "Hold a slot" bar. It rises into place and drops
 * away, quickly, so it never competes with the content. Under reduced motion
 * it fades only.
 */
export function SlideUp({ show, children, className }: SlideUpProps) {
  const reduced = useReducedMotion() === true;
  const away = reduced ? { opacity: 0 } : { opacity: 0, y: 24 };

  return (
    <AnimatePresence initial={false}>
      {show ? (
        <motion.div
          className={className}
          initial={away}
          animate={{ opacity: 1, y: 0 }}
          exit={away}
          transition={{ duration: duration.quick, ease: ease.hand }}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

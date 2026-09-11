"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { duration, ease } from "@/lib/motion";

/**
 * Mount once in app/layout.tsx around the page. Sets the house transition and
 * honours `prefers-reduced-motion` for every motion component beneath it.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: duration.settle, ease: ease.hand }}
    >
      {children}
    </MotionConfig>
  );
}

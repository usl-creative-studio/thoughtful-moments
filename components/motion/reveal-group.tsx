"use client";

import type { ReactNode } from "react";
import { useReducedMotion, type Variants } from "motion/react";
import { distance, duration, ease, stagger, viewport, type DurationKey } from "@/lib/motion";
import { blockTags, groupTags, type BlockTag, type GroupTag } from "./tags";

type RevealGroupProps = {
  children: ReactNode;
  /** Element to render. Default `div`. Use `ol`, `dl`, `h1` to keep semantics. */
  as?: GroupTag;
  className?: string;
  /** Seconds between each child's arrival. Default `stagger.step`. */
  gap?: number;
  /** Seconds before the first child arrives. */
  delay?: number;
  /** `view` arrives when scrolled to; `mount` arrives on page load (hero only). */
  on?: "view" | "mount";
};

/**
 * A parent that lets its `RevealItem` children arrive one after another,
 * like reading. Under reduced motion everything renders at rest.
 */
export function RevealGroup({
  children,
  as = "div",
  className,
  gap = stagger.step,
  delay = 0,
  on = "view",
}: RevealGroupProps) {
  const reduced = useReducedMotion() === true;
  const Tag = groupTags[as];
  const variants: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: gap, delayChildren: delay } },
  };
  const initial = reduced ? "shown" : "hidden";

  if (on === "mount") {
    return (
      <Tag className={className} variants={variants} initial={initial} animate="shown">
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      variants={variants}
      initial={initial}
      whileInView="shown"
      viewport={viewport}
    >
      {children}
    </Tag>
  );
}

type RevealItemProps = {
  children: ReactNode;
  /** Element to render. Default `div`. Use `li` inside an `ol`, `span` for headline lines. */
  as?: BlockTag;
  className?: string;
  /** `settle` for content, `slow` for air. */
  pace?: DurationKey;
};

/** One child of a `RevealGroup`. Carries no trigger of its own; the group times it. */
export function RevealItem({ children, as = "div", className, pace = "settle" }: RevealItemProps) {
  const reduced = useReducedMotion() === true;
  const Tag = blockTags[as];
  const variants: Variants = reduced
    ? { hidden: { opacity: 1, y: 0 }, shown: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: distance },
        shown: { opacity: 1, y: 0, transition: { duration: duration[pace], ease: ease.hand } },
      };

  return (
    <Tag className={className} variants={variants}>
      {children}
    </Tag>
  );
}

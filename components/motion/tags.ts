import { motion } from "motion/react";

/** Elements a single revealed block may render as. */
export const blockTags = {
  div: motion.div,
  section: motion.section,
  p: motion.p,
  li: motion.li,
  figure: motion.figure,
  span: motion.span,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
} as const;

export type BlockTag = keyof typeof blockTags;

/** Elements a staggered group may render as. */
export const groupTags = {
  div: motion.div,
  section: motion.section,
  ol: motion.ol,
  ul: motion.ul,
  dl: motion.dl,
  h1: motion.h1,
} as const;

export type GroupTag = keyof typeof groupTags;

/**
 * Motion tokens for Firsthand.
 *
 * The page moves the way a person does: slowly, once, and by hand. Every
 * primitive in components/motion reads from here; nothing sets its own
 * duration or easing. Change the feel of the whole page in this file.
 *
 * Reduced motion: every primitive checks `useReducedMotion()` and renders its
 * resting state when the visitor asks for less motion. `MotionProvider` adds
 * `MotionConfig reducedMotion="user"` as a second lock.
 */

/** Seconds. */
export const duration = {
  /** Interface responses: the sticky bar arriving, a press. */
  quick: 0.3,
  /** Content arriving: paragraphs, list items, the cue card. */
  settle: 0.7,
  /** Air: the situation paragraph, the founder note, the hero image. */
  slow: 1.1,
} as const;

export type DurationKey = keyof typeof duration;

export type Bezier = [number, number, number, number];

export const ease = {
  /** Decelerates like a hand coming to rest. Everything that arrives uses it. */
  hand: [0.22, 1, 0.36, 1] as Bezier,
  /** Near-linear with soft ends. Anything drawn or written uses it. */
  pen: [0.45, 0.05, 0.55, 0.95] as Bezier,
} as const;

/** Pixels an element rises as it arrives. Small on purpose: a breath, not a jump. */
export const distance = 12;

export const stagger = {
  /** Between items in a list, the lines of the headline, or the blocks of a text column. */
  step: 0.09,
} as const;

/** Arrive once, when about a third of the element is on screen. */
export const viewport = { once: true, amount: 0.3 } as const;

/** Handwriting writes itself at a human pace: seconds per character, bounded. */
export const handwriting = { perCharacter: 0.09, min: 0.9, max: 2.4 } as const;

export function handwritingDuration(text: string): number {
  const raw = text.length * handwriting.perCharacter;
  return Math.min(handwriting.max, Math.max(handwriting.min, raw));
}

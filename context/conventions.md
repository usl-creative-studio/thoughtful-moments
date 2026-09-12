# Conventions

Project-specific naming rules and patterns.

---

## File naming
Per tech-stack.md: kebab-case for files, PascalCase for components.
- Components: PascalCase (e.g., `UserCard.tsx`)
- Utilities and everything else: kebab-case (e.g., `format-date.ts`)
- Pages: kebab-case (e.g., `user-profile/page.tsx`)

## Code style
Per tech-stack.md coding standards:
- TypeScript strict mode, `noUncheckedIndexedAccess: true`
- No `any` -- use `unknown` with type guards
- Zod for ALL external data: API inputs, env vars, config
- Max file length 300 lines; extract if longer
- Conventional Commits (`feat:`, `fix:`, `chore:`)

## Images
- Format: .webp preferred
- Location: `/public/images/`

## Environment variables
- Public (client-safe): prefix `NEXT_PUBLIC_`
- Server-only: no prefix

## Styling
- Tailwind CSS 4.x, utility-first. No CSS Modules.
- Tailwind 4 has no `tailwind.config.js` -- theme tokens live in `@theme` inside
  `/app/globals.css`. An absent config file is correct, not missing.
- Use shadcn/ui components where one fits; do not hand-roll what shadcn provides
- Define colour, spacing and type scale as theme tokens rather than arbitrary values

## Motion
- Library: `motion` 13, imported from `motion/react` (the current name of Framer Motion). Do not
  add framer-motion, GSAP or CSS keyframe libraries alongside it.
- Timing, easing, distance and stagger live in `lib/motion.ts` only. A component never sets its
  own duration or curve; if a new feel is needed, change the token.
- Use the primitives in `components/motion` (`Reveal`, `RevealGroup`/`RevealItem`, `SettleIn`,
  `Hairline`, `Handwritten`, `Warm`, `SlideUp`). Do not call `motion.div` directly in page
  components; if a primitive is missing, add it there with the same reduced-motion handling.
- Every primitive checks `useReducedMotion()` and renders at rest when it is true.
  `MotionProvider` (root layout) sets `MotionConfig reducedMotion="user"` as the second lock.
  The CSS `prefers-reduced-motion` rule covers hover and press transitions only.
- Motion runs once, decelerates, rises at most 12px, and never bounces. On load only in the hero;
  everywhere else on entering view. Nothing is tied to scroll position; nothing loops.
- `Handwritten` is used only where the handwritten face is allowed (three places) and never on
  anything the reader must act on. `Warm` is used on step 4 only.
- Buttons: hover darkens 8%, press scales to 98.5% over 200ms in CSS. No hover lift, no shadow.
- `Handwritten` observes an unclipped outer span and clips an inner one. Chromium's
  IntersectionObserver honours the target's own `clip-path`, so anything that hides itself by
  clipping must not be the element `whileInView` watches.
- A reduced-motion override of a breakpoint utility must stack the variants
  (`lg:motion-reduce:rotate-0`). Tailwind emits bare `motion-reduce:` before `lg:`, so
  `lg:-rotate-2 motion-reduce:rotate-0` leaves the card rotated at desktop.
- Use semantic tags through the `as` prop (`ol`, `li`, `dl`, `figure`, `h2`) so motion never
  changes the document outline.

## Copy and pricing (from usl-build Stage 4)
- Show the founding rate ($2,500) against the standard rate ($3,500); never show a
  stacked total of component parts -- the price rests on visible authorship.
- The guarantee is a delivery commitment, never an outcome promise.
- Copy register: emotional first.

## Design tokens (app/globals.css)
- Colours: `bone`, `ink`, `oxblood`, `warm-grey`, `rule`, `error`, `success` only. The default
  Tailwind palette is wiped (`--color-*: initial`), so `bg-blue-500` or `text-white` do not
  exist. `oxblood-hover` is derived (oxblood darkened 8%) and is for button hover only.
- Type scale utilities: `text-display-1`, `text-display-2`, `text-h3`, `text-body`, `text-body-large`
  (the situation paragraph only: 19/30, 22/34 at `lg`), `text-small`, `text-caption` (carries the 0.06em tracking; add `small-caps` for captions and the wordmark),
  `text-button`, `text-price` (the Module 6 price line only: display-1 steps held at 56/60 from
  `sm` instead of going fluid at `lg`), and `text-hand-hero` / `text-hand-title` /
  `text-hand-signature` for the handwritten face. Display sizes step at `sm` and `lg` inside
  the token, so never add a `sm:`/`lg:` size override. The default `text-sm` to `text-9xl` scale is wiped.
- Faces: `font-serif` (Merriweather, Georgia fallback; Fraunces was replaced 2026-09-11) and `font-hand` (Homemade Apple). `html` already uses the
  serif; set `font-hand` only in the three permitted places. `italic` is loaded and used for
  the situation paragraph (Module 2) only.
- Layout: `container` (1120px outer width, 24px side padding), `measure` (64ch) and `bleed-grid`
  (the hero only: container-width columns 2 to 13 between two gutters, so a child can run to the
  viewport edge with `lg:col-end-15`). Column
  placement at desktop is `lg:grid lg:grid-cols-12 lg:gap-x-6` on the section with `lg:col-start-*`
  and `lg:col-span-*` on the children; the build sequence names columns per module.
- Numbered lists (`ol`) use CSS counters: `[counter-reset:step]` on the list,
  `[counter-increment:step]` on each `li`, and the number drawn by `before:content-[counter(step)_'._']`
  on the lead `strong`, so the number shares the lead's colour and `Warm` can carry both.
  Breakpoints are `sm` (640) and `lg` (1024) only; `md`, `xl`, `2xl` do not exist.
- Radii: `rounded-sm` (4px, buttons and inputs) and `rounded-lg` (8px, the cue card). Nothing else.
- Shadows: none. `--shadow-*` is wiped, so `shadow-*` utilities do not exist.
- Focus: the global `:focus-visible` rule (2px oxblood outline, 2px offset). Never add
  `outline-none` or `ring-*` to a component.
- Tailwind scans only `app/`, `components/` and `lib/` (`@source` in globals.css), so class
  names quoted in markdown never reach the CSS.

## shadcn/ui
- Preset `base-nova` on Base UI (`@base-ui/react`). Six primitives in `components/ui` only:
  Button, Input, Label, Textarea, RadioGroup, Accordion, each restyled to the Section 2 spec.
  Re-running the CLI `add` on them would revert the styling; edit them by hand.
- Base UI `render` and the motion primitives do not mix: `Reveal`/`RevealItem` forward only
  `className`, so a Base UI part handed one through `render` loses its ref and data
  attributes. Wrap the Base UI part in the motion primitive instead; variants reach it by
  context.
- `cn` comes from the `cn` package (shadcn's replacement for clsx + tailwind-merge),
  re-exported from `lib/utils.ts`.
- Base UI form controls are uncontrolled and warn in the console if their `defaultValue`
  changes after mount. When a Server Action hands values back, key each Base UI control on
  its returned value (`key={values.date}`) so a changed field remounts and an unchanged one
  keeps its instance. Native `textarea` does not need it.
- A Base UI `Radio` puts the `id` you pass on its hidden native input, not on the visible
  `role="radio"` element (which gets a generated id and `aria-labelledby` from the `<label
  for>`). Labels and form submission work as expected; to move focus, query the
  `[role="radio"]`, never the id.
- Base UI `Button` with `focusableWhenDisabled` renders `aria-disabled`, not `disabled`: the
  pending button keeps focus and its full colour, and the label change carries the state.

## Server-only code and email
- Anything that reads a secret imports `"server-only"` first (`lib/env.ts`, `lib/resend.ts`,
  `lib/stripe.ts`, `lib/email/*`). Env is parsed lazily with zod in `lib/env.ts` so `next build`
  needs no secrets and a missing variable fails the call with its name. Email and Stripe are
  separate schemas (`getEmailEnv`, `getStripeEnv`) so one feature never fails for the other's
  missing key.
- Stripe: the client comes from `getStripe()` in `lib/stripe.ts`; the deposit's amount, name
  and metadata are the `deposit` constants there. Webhook handlers read the raw body with
  `request.text()` before `constructEvent`; a parsed body breaks the signature.
- Local proof without keys: `RESEND_BASE_URL` and `STRIPE_API_BASE_URL` point both SDKs at a
  local stand-in under `next start`; the second is read only by `lib/stripe.ts` and must stay
  unset in every deployment.
- Mail goes through `sendEmail` in `lib/resend.ts`; message builders live in `lib/email/` and
  return `{ subject, text, html }` with plain text first. No addresses in logs.
- Shared form rules live in `lib/` without `server-only` (`lib/tell-us.ts`) so the client can
  reuse the option lists and helpers; the Server Action in `app/actions/` owns the parse.

## Analytics
- `cta_hold_slot_click` locations: `hero`, `price`, `closing`, `sticky`. Add a value, never a
  new event name, for another button. The button is `HoldSlotButton` in
  `components/hold-slot-button.tsx`; pass `location`, never copy the form.
- `track()` from `@vercel/analytics` drops the call silently until `<Analytics />` has
  installed `window.va`, and it does that in its own effect, which runs after any page
  component's mount effect. An event fired on mount must wait for `window.va` (the package
  declares it on `Window`); see `components/deposit-completed.tsx`. Events fired on a click
  never hit this.
- Server-side events use `track` from `@vercel/analytics/server` and pass the request
  headers (`{ headers: await headers() }`); off Vercel the call logs and drops.
- Off Vercel the insights script 404s and `track()` calls queue on `window.vaq`; in a
  production-mode Playwright run read the events there. In `next dev` they print to the
  console instead.

## Scripts
- `npm run typecheck` runs `next typegen && tsc --noEmit`: Next 16 route types must exist
  before tsc can pass on a fresh clone.
- `AGENTS.md` at the root is written by `next dev`; commit it with the work so the tree stays clean.

---
Add project-specific patterns here as they emerge.

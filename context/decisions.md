# Decisions

A log of why things are built the way they are. Write once, never delete.

---

## 2026-09-11 -- Project initialized
- Stack: Next.js, Stripe, Resend, Vercel
- Branching: main (production), staging (preview)
- Context system established for Claude Code sessions

## 2026-09-11 -- No database for the validation phase
- This build is the Stage 2 validation experiment: a landing page taking $500 refundable
  deposits for 30 days. Deposits are the record of truth and Stripe already holds them.
- Supabase, Payload and `DATABASE_URL` deliberately left out of the env set. Reopen if the
  experiment passes and a booking system or customer portal becomes necessary.

## 2026-09-11 -- Vercel Analytics only
- USL default is Vercel Analytics + Google Analytics. Founder chose Vercel only for the
  validation page. `NEXT_PUBLIC_GA_MEASUREMENT_ID` omitted. Reopen when paid campaigns
  need attribution beyond what Vercel provides.

## 2026-09-11 -- Motion: the page moves by hand
- Stage 6 recorded "no motion beyond a 400ms hero fade; no scroll-triggered reveals". The
  founder reversed it the same day: motion is to carry intimacy, at the pace of a person rather
  than a machine.
- In practice: content arrives slowly (700 to 1100ms), once, with a 12px rise; hairlines draw
  like a pen stroke; handwriting writes itself in the three places the handwritten face is
  allowed; the hero image comes into focus on load; step 4 warms from ink to oxblood. Nothing
  bounces, loops, parallaxes or moves with scroll position. The reader never waits on motion for
  something he must act on: the hero CTA is visible within a second.
- Library: `motion` 13 (`motion/react`), the current package name of Framer Motion, installed by
  the founder. Tokens in `lib/motion.ts`; primitives in `components/motion`; the build sequence
  prompts name where each is used. TypeScript and React types were added as devDependencies so
  the primitives typecheck before the app exists; Prompt 1 merges them into the Next.js scaffold.
- Reduced motion is honoured twice: each primitive checks `useReducedMotion`, and
  `MotionProvider` sets `MotionConfig reducedMotion="user"`.
- Accepted risk: elements below the fold are server-rendered at opacity 0 and appear on
  hydration. If Lighthouse LCP or performance fails the gate at Prompt 10, drop `SettleIn` from
  the hero image first, then the hero text group; the scroll reveals stay.
- Reopen if the day-30 experiment shows the page reads as slow on phones (Vercel Web Vitals), or
  if the founder's phone test at Prompt 10 finds any reveal delaying the price or the CTA.

## 2026-09-11 -- Trimmed env set
- AI and scraping keys (Anthropic, OpenAI, OpenRouter, Firecrawl, Exa, Jina) omitted:
  nothing on the validation page calls them. Add back per feature, not by habit.

## 2026-09-11 -- Foundation choices at Prompt 1
- create-next-app 16.3.5 refused the non-empty directory, so the app was scaffolded in a temp
  directory and merged in by hand. package.json and tsconfig.json were merged, not replaced;
  React and React DOM are pinned to the versions Next 16.3.5 ships against (19.2.8).
- shadcn/ui 4.x now defaults to the `base-nova` preset on Base UI rather than Radix. Accepted:
  the five primitives are form controls and either base is accessible, and Base UI is where
  shadcn is heading. The CLI also added `tw-animate-css` and the `shadcn` package as runtime
  dependencies; both were removed. The first is a CSS keyframe library, forbidden alongside
  `motion`; the second existed only to supply variants Tailwind 4 already provides.
- The default Tailwind palette, type scale, radii, shadows and breakpoints are wiped in
  `@theme` so the Section 2 tokens are the only ones that can be used. A Tailwind blue, a grey
  or a shadow cannot reach the page by accident.
- The type scale is expressed as `--type-*` custom properties on `:root` with breakpoint steps,
  mapped through `@theme inline` to single responsive utilities: `text-display-1` is 40/44,
  56/60 and 80/88 by itself.
- `--font-serif` and `--font-hand` are theme tokens that reference the next/font variables
  (`--font-fraunces`, `--font-homemade-apple`). Naming the next/font variables `--font-serif`
  directly would collide with the theme variable of the same name.
- `.container` is a custom `@utility`. Tailwind emits it after its built-in container, so the
  1120px max width wins at every breakpoint; verified in the compiled CSS.
- No favicon yet: /favicon.ico 404s on the empty page, the one console error. Prompt 9 adds the
  favicon and OG image; no placeholder was added so the brand mark is decided once.
- Reopen if a later prompt needs a Tailwind default (a grey, a shadow, `text-sm`): add a named
  token rather than restoring the default namespace.

## 2026-09-11 -- Merriweather replaces Fraunces
- The founder saw the hero in Fraunces at Prompt 2 and did not like it; asked for Georgia or
  Merriweather. Merriweather (variable, `opsz` axis) is loaded through `next/font/google` with
  Georgia as the fallback, so both choices are honoured: Merriweather where it loads, Georgia
  where it does not. The theme token `--font-serif` is unchanged; only the next/font variable
  behind it (`--font-merriweather`) changed. Section 1 of the build sequence still names
  Fraunces; this entry supersedes it.
- Consequence: Merriweather is wider. At 80px the three-line headline no longer fits five
  columns, so desktop display-1 is fluid: `clamp(3.5rem, 4.5vw, 5rem)` with 1.1 leading
  (58px at 1280, 80px from 1780). Tablet and mobile steps are unchanged.
- Reopen if the founder wants the 80px desktop headline back: widen the hero text column to
  six columns first, then revisit the clamp.

## 2026-09-11 -- Hero crop at Prompt 2
- The placeholder hero has generated card text at its right edge. At desktop the image box is
  145% of its 3:2 frame so the frame clips that edge; the roses and two of the three candles go
  with it. Accepted for the placeholder; the documentary photograph from night one replaces it
  and the widening comes off.
- Under reduced motion the hero renders at rest once hydrated; the server HTML carries the
  hidden initial state until then (the accepted risk already recorded under Motion).

## 2026-09-11 -- The cue card shows its stroke in two photographs
- Stage 6 recorded the cue card as markup only ("do not photograph the card") and the copy
  document says the card is "rendered in code, not photographed". The founder asked for the
  move on card 4 ("Shoulders.") to be shown as well as described, so the reader can see what
  "both hands flat, thumbs either side of her spine, neck down to the shoulder blades" looks
  like. The card stays markup; the photographs sit beside it and show the stroke, not the card.
- Chosen over an ink line diagram drawn in code: the founder wanted photographs, and the page
  already uses generated documentary placeholders of hands, so the frames match the hero and
  the hands-card image rather than introducing a third visual language.
- Two frames, not three or a clip: the endpoints of the stroke (neck, shoulder blades) are the
  instruction; a midpoint added nothing legible at tile size. Reference-guided generation
  (Magnific, Nano Banana Pro from one anchor frame) moved the hands to the opposite endpoint
  reliably but would not hold a measured midpoint in four attempts, so the sequence was cut to
  the two frames that read. They are revealed in order, once, under the motion rule; no
  cross-fade, loop or replay, so the page's "nothing loops" rule holds.
- Same rules as the other placeholders: hands and her back, never her face; warm low light;
  PLACEHOLDER label in code; replaced by documentary frames from night one. 896x1200 each,
  the same order of size as hands-card.webp; upscale through Magnific only if a layout needs
  a frame wider than about 450px.
- Reopen if the founder's phone test finds the frames pull attention from the card copy, or
  if the frames read as a spa advertisement rather than as him: then drop to frame 2 alone or
  return to the ink diagram.

## 2026-09-11 -- Hero balance and the italic transition (Prompt 3 session)
- The hero grid was 12 columns of the viewport, so the text column narrowed and the image grew as
  the screen widened (376px of text against a 960px image at 1920). Replaced by `bleed-grid`
  (app/globals.css): twelve container-width columns between two flexible gutters, so the text
  column is the same width at every desktop size and only the image bleeds. Text now spans
  container columns 1 to 6 with 48px inner right padding (Section 2 said 1 to 5, which cannot hold
  "You love her." on one line once display-1 reaches 80px); the image still starts at column 7.
- The image is as tall as the text block (`items-stretch`, `h-full`) instead of a centred 3:2
  crop, so the two read as one band with a shared top and bottom edge. The 20% object-position
  and the 145% width keep the generated card text outside the frame.
- Module 2 is set as a quote block (founder's call, 2026-09-11): Merriweather italic, a hairline
  down its left in the rule colour, columns 2 to 12 so it runs four lines at desktop rather than
  five, `text-pretty` so the last line is never a single word. It stays a `<p>`, not a
  `<blockquote>`: it is the page speaking, not a quotation. The italic style is loaded in
  `app/layout.tsx` and used nowhere else; Section 1 listed type scale, measure and hairlines as
  the transitions, and the italic is now the fourth.
- Reopen if the founder's phone test finds the square-ish hero crop loses the room, or if the
  italic reads as a quotation rather than as the page speaking.

## 2026-09-11 -- The price line has its own token (Prompt 6)
- Prompt 6 asks for the price line "in display-1 at 56px". Since the Merriweather decision,
  display-1 is fluid at desktop (58px at 1280, 80px from 1780), which the headline needs and
  the price line does not: at 80px "$2,500 for the first five bookings." runs to three lines.
  Conventions forbid a `lg:` size override, so `text-price` is a token: the display-1 steps
  (40/44, 56/60 from `sm`) held at 56/60 on desktop. Used on the price line only.
- The price line is one paragraph whose two sentences each take a line (`block` spans with a
  space between, so copied text keeps the space). Natural wrapping orphaned "bookings." at the
  start of line two.
- Reopen if the founder wants the price line to follow the headline size on wide screens.

## 2026-09-11 -- Reveal renders at rest under reduced motion from hydration
- `Reveal` passed `initial={false}` when reduced motion was on, meaning "start from the
  current DOM values". The server HTML carries `opacity: 0` (the accepted-risk hidden state),
  so Motion adopted it and faded the element in over its pace when it entered view; Motion's
  `reducedMotion="user"` disables transforms but still animates opacity. `RevealItem` never had
  the problem because its reduced-motion variants set `opacity: 1` explicitly.
- Fix: under reduced motion the initial state is the resting state, so hydration writes
  `opacity: 1` and nothing fades. Verified: every revealed element in Modules 2, 5 and 6 is at
  rest within 100ms of entering view. The hidden-until-hydration risk is unchanged.

## 2026-09-11 -- Brand name is Thoughtful Moments, not Firsthand
- Stage 5 recommended renaming the brand Firsthand (authorship in one word; collision-screened
  the same day). The founder rejected it: it reads as cold and ambiguous, closer to a witness
  account than a gift, and kept the original working name.
- Thoughtful Moments states the category plainly and is warm at first contact. The
  distinctiveness cost flagged at screening is accepted; the offer name Her Night, Your Hands
  and the promise "She will know it was you." carry the authorship the brand name does not.
- Applied everywhere the name renders: wordmark in header and footer, hero eyebrow, founder
  note, page title. The Stage 5 packet keeps the Firsthand screening row as history.
- Open: Thoughtful Moments has never been collision-screened. Search, USPTO and domain check
  before any paid spend or print, same gate as before.
- Reopen if the collision check finds an active gifting or couples business under the name.

## 2026-09-11 -- The questions collapse (Prompt 7)
- Stage 6, the copy document ("No accordion") and Prompt 7 of the build sequence ("all six
  answers visible without interaction") set Module 7 as six open pairs, on the reasoning that
  the answers are the proof and a man skimming should not have to click to find them. The
  founder reversed it the day it was built: the questions collapse and open on demand.
- Built on the shadcn Accordion (Base UI), the sixth primitive in `components/ui`, restyled
  to the Section 2 spec: the question stays an `h3` wrapping the button, so the heading
  outline and screen-reader navigation are unchanged; a chevron in warm grey; no border,
  ring, radius or shadow; the panel opens over 200ms in CSS, the same budget as a button
  press, and the CSS reduced-motion rule covers it. `multiple` lets several stay open;
  `hiddenUntilFound` keeps every answer in the DOM behind `hidden="until-found"`, so
  find-in-page and assistive technology still reach the text and the server HTML ships the
  panels closed with no layout shift. Base UI 1.8 follows the updated APG guidance and
  dropped arrow-key roving focus, so Tab moves between questions and Enter or Space opens one.
- The `RevealItem` wraps each `AccordionItem` from outside rather than through the `render`
  prop: the motion primitives forward only `className`, so handing them to `render` would drop
  the refs and data attributes Base UI needs. Motion variants travel by React context, so the
  wrapper between Root and Item costs nothing.
- Reopen if the day-30 experiment or the phone test shows men asking a question the page
  already answers (a sign the collapsed answers are not being read), or if Lighthouse flags
  the hidden panels. The open version is one prop away: `defaultValue` with all six values.

# State

Last updated: 2026-09-11

## What is built
- [x] Business plan converted to markdown (`docs/business-plan.md`, `docs/business-plan-other-details.md`)
- [x] USL build loop complete at its terminal stage (6). Stages 1, 2, 4, 5, 6 done; Stage 3 is preliminary economics only until the Stage 2 experiment reports (`usl-build/STATE.md`)
- [x] Brand: Thoughtful Moments (founder reverted the Stage 5 rename, 2026-09-11). Offer: Her Night, Your Hands. Lead magnet: Tell Us About Her (`usl-build/5-brand-strategy.md`)
- [x] Landing page copy, claim ledger and audits (`usl-build/6-landing-page-copy.md`)
- [x] Landing page build sequence, ten prompts, definition of done (`usl-build/6-landing-page-build-sequence.md`)
- [x] Placeholder imagery (generated, labelled): `public/images/hero-room.webp`, `hands-card.webp`, `morning-after.webp`; alternates in `public/images/placeholders/`
- [x] Cue card stroke frames for Module 4 (generated, labelled; founder decision 2026-09-11, see
  `context/decisions.md`): `public/images/cue-card-shoulders-1.webp` (hands at the base of her
  neck) and `cue-card-shoulders-2.webp` (the same hands at her shoulder blades), 896x1200, same
  room, light and camera. Alternates in `public/images/placeholders/cue-card-shoulders-*.jpg`.
  Prompt 5 in the build sequence and the asset manifest name them; built in Prompt 5 below.
- [x] Project scaffold and context system
- [x] Prompt 3 (Modules 2 and 3) components are on disk: `components/situation.tsx`, `components/how-it-works.tsx`.
- [x] Prompt 5 (Module 4, the cue card), on `staging`: `components/your-part.tsx`, mounted after
  HowItWorks. Text in columns 1 to 6 as a `RevealGroup`; the card is a `Reveal as="figure"`
  (delay 0.2) inside a wrapper turned -2deg at `lg`, square under 1024px and under reduced
  motion; the two stroke frames beneath it as an `ol` `RevealGroup` (`stagger.beat`). Title
  uses the `text-hand-title` token (22px) rather than `text-[22px]`. Two fixes on the way:
  (1) `Handwritten` never wrote on: Chromium's IntersectionObserver honours the target's own
  `clip-path`, so a span clipped to zero width reported ratio 0 and `whileInView` never fired.
  The primitive now observes an unclipped outer span and drives the clip on an inner span by
  variants. (2) The prompt's `lg:-rotate-2 motion-reduce:rotate-0` does not hold: Tailwind
  emits `motion-reduce:` before `lg:`, so the rotation won at desktop under reduced motion;
  the wrapper uses `lg:motion-reduce:rotate-0`. Gates: typecheck, lint, `next build` clean;
  at 390, 1280 and 1280 with reduced motion the card has a 1px rule border, 8px radius, 24px
  padding, no shadow; rotation -2deg only at 1280 without reduced motion; the handwritten
  clip lands at 0% (written) in all three; one `.font-hand` element on the page; no
  horizontal overflow. Screenshots shown in the session. Console: only the favicon 404s.
- [x] Prompt 6 (Modules 5 and 6), on `staging`: `components/included.tsx` (display-2 heading; a
  `RevealGroup as="dl"` of eight `RevealItem` divs, each opening with a `Hairline`, `dt` bold and
  `dd` its sentence, copy verbatim under the Stage 5 display names; two columns of four at `lg`
  filled column-first so the reading order is the document order, one column below; "What it
  is not" as `Reveal as="h3"` with the paragraph at 56ch; dense padding 80/56) and
  `components/price.tsx` (`id="price"`, client component; display-2 "The price"; the price
  line as `Reveal as="p" pace="slow"` in the new `text-price` token, one paragraph with each
  sentence on its own line; the limit paragraph; "Holding a slot." and "Our commitment." as
  labelled paragraphs with one `Hairline` between them; the Button in a form posting to
  `createDepositSession` with `track("cta_hold_slot_click", { location: "price" })`; an
  IntersectionObserver at threshold 0.5 fires `track("scroll_price")` once and disconnects).
  Both mounted after YourPart. Gates: typecheck, lint, `next build` clean; at 390 and 1280
  Module 5 has zero borders and zero icons, eight hairlines, `dt` weight 700, two columns at
  1280 (x 104 / 652) and one at 390; the price line is 56/60 at 1280 and 40/44 at 390 as text;
  exactly one `hr` in the price module; `scroll_price` logged once per viewport even after
  scrolling away and back; no horizontal overflow. Reduced motion: every element in both modules
  at rest within 100ms of entering view. Screenshots shown in the session.
  On the way: `Reveal` under reduced motion passed `initial={false}`, so Motion adopted the
  server-rendered opacity 0 and faded in over 700ms when the element entered view (Situation
  did the same). The initial state is now the resting state (context/decisions.md).
- [x] Motion system: tokens in `lib/motion.ts`; `MotionProvider`, `Reveal`, `RevealGroup`/`RevealItem`, `SettleIn`, `Hairline`, `Handwritten`, `Warm`, `SlideUp` in `components/motion/`. `motion` 13. Decision recorded in `context/decisions.md`. Motion preview artifact for the founder: https://claude.ai/code/artifact/1307c511-3866-4b37-ad46-e42a0a3a8c21
- [x] Prompt 1 of the build sequence (the app and the design foundation), on `staging`:
  Next.js 16.3.5 App Router, TypeScript strict with `noUncheckedIndexedAccess`, Tailwind 4
  tokens in `app/globals.css` (`@theme`; default palette, type scale, radii, shadows and
  breakpoints wiped; type scale as `--type-*` custom properties), Fraunces and Homemade Apple
  via `next/font/google` exposed as `--font-serif` and `--font-hand`, `container` (1120px,
  24px padding), global focus-visible and reduced-motion rules, `MotionProvider` in the root
  layout, shadcn/ui (base-nova preset on Base UI) with Button, Input, Label, Textarea and
  RadioGroup restyled to the Section 2 spec, `@vercel/analytics` mounted, metadata with the
  approved title and description and `noindex, nofollow`, skip link to `#main`.
  `components/site-header.tsx` carries the wordmark.
  Gates passed: `npm run typecheck`, `npm run lint`, `next build`, Lighthouse accessibility
  100 on the empty page, both font files load (two woff2 requests, 200), CLS 0.
- [x] Prompt 2 (header, footer, hero), on `staging`: `components/site-footer.tsx` (footer line,
  /terms and /privacy links, hello@ from `NEXT_PUBLIC_CONTACT_EMAIL` or the `hello@[domain]`
  TODO), `components/hero.tsx` (Module 1 verbatim; 12-column grid at desktop, text in columns
  1 to 5, image full-bleed from column 7; mobile image first at 4:5; `SettleIn` on the image,
  `RevealGroup on="mount"` on the text; `track('cta_hold_slot_click', { location: 'hero' })`),
  `app/actions/checkout.ts` as a Server Action stub that redirects to `/#price` until Prompt 4.
  Font switched to Merriweather at the founder's request (see decisions.md). Gates: typecheck,
  lint, `next build` clean; CLS 0 at 390 and 1280; no horizontal overflow; reduced motion at
  rest after hydration; mobile CTA at 1086px in an 844px viewport (1.3 screens); desktop CTA
  above the fold at 800px. Screenshots were shown in the session.
- [x] Prompt 7 (Modules 7 and 8), on `staging`: `components/questions.tsx` (display-2 "Questions
  men ask us"; six question and answer pairs in one `measure` column, each a `RevealItem` opening
  with a `Hairline`; the pairs are a shadcn Accordion on Base UI, `components/ui/accordion.tsx`,
  restyled to the spec: h3 around a button, chevron, no border, ring or radius, 200ms CSS
  open; `multiple` so several can be open, `hiddenUntilFound` so find-in-page still reaches
  every answer and the server HTML ships the panels hidden with no layout shift; collapsed by
  default, founder decision 2026-09-11 reversing the copy document, see decisions.md) and
  `components/founder-note.tsx` (air module 128/80, text in columns 2 to 10; `Reveal as="h3"`
  "From Irewole", the paragraph as `Reveal as="p" pace="slow"` in body-large at 56ch, the
  signature `Handwritten` in `font-hand text-hand-signature` (26px, the third and last use) with
  delay 0.3; no photograph). Copy verbatim from the copy document, which now carries the
  Thoughtful Moments name in the note. Both mounted after Price. Gates: typecheck, lint,
  `next build` clean; at 390 and 1280 six `h3 > button` triggers, six hairlines, zero
  border-radius and box-shadow on the triggers, two panels open at once after two clicks,
  Enter on a focused trigger opens it (Base UI 1.8 dropped arrow-key roving focus per the
  APG update, so Tab moves between questions), one `.font-hand` element in the note and two on
  the page, signature 26px Homemade Apple with the clip landed at 0%, note padding 128/80,
  questions padding 80/56, no horizontal overflow, no new console errors. Screenshots at rest and
  with one question open were shown in the session.

## In progress
- [x] Prompts 1, 2, 3, 5, 6 and 7 committed on `staging` and promoted to `main` (2026-09-11).
  Founder review gate still open: walk the Vercel preview on a phone before the page goes to real users.

## What is next
- [ ] Run Prompts 4 and 8 to 10 of `usl-build/6-landing-page-build-sequence.md` on `staging`.
- [ ] `/favicon.ico` 404s on the empty page (the only console error). Prompt 9 adds the favicon and OG image.
- [ ] Founder, in parallel: two food-partner quotes and one florist quote; waiver, contraindication card and delivery-commitment wording to a professional; insurance quote; domain and hello@ mailbox; Stripe account (test mode); USPTO and domain check for Thoughtful Moments.
- [ ] Founder edits the note in Module 8 and writes the twelve cue cards (Module 4 shows card 4 as the shape).
- [ ] After the page is live on staging and opened on a phone: merge to main, keep `noindex`, start the 30-day experiment (warm network first, then ~$1,500 capped paid reach). Record the day-30 result in `usl-build/2-solution-mvp.md` Section 11.

## Open questions for the founder
- Prompt 2 asked for three headline lines with breaks after "her." and "question."; the copy has
  two sentences, so the hero renders two `RevealItem` spans ("You love her." / "That was never
  the question.") and the second wraps naturally to make three lines. Confirm, or supply a
  third phrase.
- The desktop hero crop at 145% hides the generated card text but also the roses and two
  candles named in the alt text. Fine for the placeholder; confirm the alt text stays as written.
- Section 1 of the build sequence says the handwritten face appears in three places, the first being "the card line in the hero", but Prompt 2 lists no handwritten line in the hero text order and Module 1 copy has none. Prompt 2 was built without one. Decide whether a handwritten line exists in the hero (and what it says) or whether the three places are the cue-card title, the signature, and one still to be chosen. `Handwritten` and the `text-hand-hero` token are ready either way.

## Blockers
- "A Dallas kitchen we work with" must be true (partner agreed) before the page leaves `noindex` or receives paid reach.

---
Update this file at the end of every Claude Code session.

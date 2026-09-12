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

- [x] Prompt 8 (Module 9), on `staging` as `7f59e22`: `components/closing.tsx` (display-2 "Her date
  is coming.", the two-sentence paragraph one sentence per line, the Button posting to
  `createDepositSession` with `track("cta_hold_slot_click", { location: "closing" })`, all three
  `RevealItem`s in one `RevealGroup`; a `Hairline`; then the form, which does not animate) and
  `components/tell-us-form.tsx` (`id="tell-us"`; h3, intro and small print verbatim; date, where
  with its hint, two textareas, the Base UI RadioGroup, email, a honeypot named `website` off
  screen and out of the tab order, "Send it"; `useActionState` against `submitTellUs`; errors
  under the field with a `CircleAlert` icon in `text-error`, wired by `aria-describedby`, the
  first one taking focus; the thank-you inside a `role="status" aria-live="polite"` region that
  exists from first render; `form_started` on first focus, `form_submitted` with the massage
  value on success). Rules in `lib/tell-us.ts` (zod: date within 180 days of today in Dallas
  time, where 2 to 60, texts 3 to 500, massage required, email valid); the action in
  `app/actions/tell-us.ts` drops a filled honeypot with the same thank-you and no email; email
  built in `lib/email/tell-us.ts`, sent by `lib/resend.ts` with the sender as reply-to; env
  parsed once in `lib/env.ts` (`server-only`, fails closed with the variable named).
  `components/sticky-cta.tsx`: `SlideUp` bar with "$500 holds your slot." and the Button
  (`location: "sticky"`), shown once Module 3 (`id="how-it-works"`, added) has scrolled off the
  top and hidden while `#tell-us` is in view; `lg:hidden`. `resend`, `zod` and `server-only`
  installed; `RESEND_FROM_EMAIL` added to the env template as optional.
  Gates: typecheck, lint, `next build` clean. Playwright at 390 against `next start` with the
  Resend SDK pointed at a local mock (`RESEND_BASE_URL`): empty submit shows six errors, each
  with an icon, `aria-invalid` and `aria-describedby` on every control including the radiogroup,
  focus on the date; keyboard-only completion (Tab, typed date, arrow to "nervous", Enter)
  reaches the thank-you, the form unmounts, `form_started` then `form_submitted
  {massage: "nervous"}` are queued once each; one POST /emails with subject "Tell Us About Her:
  February 14, 2027", `reply_to` the sender, every answer in text and HTML; the honeypot run
  shows the thank-you, no POST and no `form_submitted`; Enter, Enter, click on one form sends
  one email; pending shows "Sending…" with focus kept and "Sending your answers." in the status
  region; the bar is absent at the top and over Module 3, present after it, gone while the form
  is in view or a field is focused, absent at 1280; reduced motion renders the closing at rest;
  no horizontal overflow. Screenshots (empty, errors, pending, success at 390; bar; 1280) shown
  in the session. Console: only the known 404s (favicon, /terms and /privacy prefetch, the
  Vercel insights script off Vercel).
  Not yet shown: a submission in a real inbox. `.env` has every value empty locally, so the
  action returned the fail-closed message and the server log named `RESEND_API_KEY`; the mock
  proves everything up to Resend accepting the key.
  Uncommitted after `7f59e22`: `components/sticky-cta.tsx` observes Module 3 against a root
  stretched below the viewport, so a jump from below the module to above it (an anchor, the
  skip link) still drops the bar; the committed version left it up after `scrollTo(0, 0)`.

- [x] Copy review, 2026-09-11 (uncommitted, on `staging`): the page scored 74/100 and the fixes
  are applied to the components and to `usl-build/6-landing-page-copy.md` in step. Hero states
  the night before the logistics; "our first five bookings"; tea variant off the page; one
  sentence of her coming home in step 4; repetition cut; founder note trimmed. Reasoning in
  `context/decisions.md` (Copy review entry). Claim ledger unchanged.

- [x] Committed and pushed to `staging` 2026-09-11: `ba4a30c` (sticky-bar observer fix) and
  `28a176c` (copy review edits, centred hero, one left edge, equipment named, founder note).
  Promoted to `main` the same day (fast-forward to `a64808b`) at the founder's request; the
  staging preview was not confirmed on a phone first. Read the production URL on a phone.

- [x] Prompt 9 (legal pages, metadata, OG image, favicon), on `staging`: `app/terms/page.tsx`
  and `app/privacy/page.tsx` over `components/legal-page.tsx` (display-2 title, the caption
  "Draft. Reviewed text to follow.", an h2 per section with a visible "TODO, founder" note
  saying what the reviewed text must cover, a "Questions" section with the hello@ address; no
  legal text, no lorem); `app/opengraph-image.tsx` (1200x630, bone, the headline in
  Merriweather 500, the wordmark bottom left in letter-spaced uppercase); `app/icon.tsx` (32px)
  and `app/apple-icon.tsx` (180px), an ink "T" on bone; `lib/og.ts` (tokens as plain values,
  the vendored `app/fonts/merriweather-500.ttf` read at build); `app/layout.tsx` metadata
  (`metadataBase` from `NEXT_PUBLIC_SITE_URL`, canonical, Open Graph and Twitter tags, title
  template, `noindex, nofollow` kept). Reasoning in `context/decisions.md` (Prompt 9 entry);
  the copy document lists the headings. Gates: typecheck and lint clean; `next build` clean in
  a scratchpad copy; the rendered head carries `noindex, nofollow`, the canonical, `og:image`
  at 1200x630 with alt, the icon links; /terms and /privacy reach from the footer with their own
  titles and canonicals; heading outline h1 then h2s; zero borders; no horizontal overflow at
  390 or 1280; the only console error left is the Vercel insights script off Vercel. The OG
  image, both icons and both pages at 390 and 1280 were shown in the session.
  Output still to show: a link preview from a real deploy (the OG URL is absolute only once
  `NEXT_PUBLIC_SITE_URL` is set in Vercel).

## In progress
- [x] Prompts 1, 2, 3, 5, 6, 7 and 8 committed on `staging` and promoted to `main` (2026-09-11).
  Founder review gate still open: walk the Vercel preview on a phone before the page goes to real users.

## What is next
- [ ] Founder: put `RESEND_API_KEY` and `NOTIFY_EMAIL` in `.env` (and Vercel), submit the form once, and
  confirm the email lands; that closes the Prompt 8 output gate.
- [ ] Run Prompts 4 and 10 of `usl-build/6-landing-page-build-sequence.md` on `staging` (Prompt 9 done 2026-09-11; Prompt 4 in progress in a parallel session the same day).
  Prompt 4 note: the checkout stub redirects to `/#price`, which re-mounts the page after the
  Server Action, so `scroll_price` fires a second time after any "Hold a slot" press. It goes
  away once the redirect leaves for Stripe; check the event fires once in Prompt 10.
- [x] `/favicon.ico` 404 closed by Prompt 9 (`app/icon.tsx`); the Vercel insights script 404 off Vercel is the only console error left.
- [ ] Founder: set `NEXT_PUBLIC_SITE_URL` in Vercel (staging and production) so the canonical and the OG image URL are absolute, then paste the staging URL into a link-preview checker and confirm the image shows.
- [ ] Founder: write the /terms and /privacy text after professional review and replace the TODO notes (`app/terms/page.tsx`, `app/privacy/page.tsx`).
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

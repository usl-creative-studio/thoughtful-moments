# Landing Page Build Sequence
## Stage 6 Output | USL Academy

**Builder:** the founder, in Claude Code, on the existing scaffold at C:\dev\thoughtful-moments
**Existing stack:** scaffold only (CLAUDE.md, context/, .env template). No package.json yet. Decisions on record: Next.js App Router, TypeScript strict, Tailwind CSS 4, shadcn/ui, Stripe Checkout for the $500 deposit, Resend for email, no database for the validation phase, Vercel Analytics only, ship staging then main.
**Selected implementation system:** Next.js 16 App Router (per tech-stack.md), Tailwind 4 tokens in `@theme`, shadcn/ui only for form primitives (Button, Input, Label, Textarea, RadioGroup), Stripe Checkout hosted page created from a Server Action, Resend for the deposit confirmation and the form notification, `@vercel/analytics` with custom events, Playwright for rendered screenshots, Lighthouse for the gate.
**Page goal:** a $500 refundable deposit that holds one of five monthly slots; secondary: the Tell Us About Her form.
**Primary action:** Hold a slot (Stripe Checkout).
**Audience path:** same-person user/payer; speak to him, describe her.
**User route and action:** page → Hold a slot → Stripe → return page "Your slot is held" → confirmation email. Or page → Tell Us About Her → "Thank you" state → founder receives the answers by email.
**Payer route and action:** same as user.
**Date:** 2026-09-11

A page was not built in this session. This document plus `6-landing-page-copy.md` are what the build runs from.

---

## 1. VISUAL THESIS

**Visual thesis:** A handwritten card in an otherwise quiet room: bone ground, ink type, one oxblood action colour, photographs of hands and empty rooms, so the page feels like something he did rather than something he bought.
**Composition:** editorial, left-aligned, asymmetric. One full-bleed image (the hero). Everything else inside the container.
**Grid:** 12 columns, max width 1120px, 24px gutters. Text measure 60 to 64 characters. The hero image is the one deliberate container break.
**Typography contrast:** Fraunces (variable, optical sizes) for display and body, Georgia fallback. Display at 56/64/80px against 18px body; the contrast in size, not in family. One handwritten face (Homemade Apple, Google Fonts; verify licence at build) used in exactly three places: the card line in the hero, the cue-card title, the founder signature. Never for anything the reader must act on.
**Density:** air in modules 1, 2 and 8; dense in 5 and 7; the run of the night (3) sits between.
**Color roles:** bone background; ink text; oxblood for the primary CTA and step 4 only; warm grey for captions and small print; form error and success states pair colour with text and an icon, never colour alone.
**Image treatment:** low warm light, documentary crop, no filters, small-caps grey captions. Hands and rooms, never her face. Hero image cropped to exclude the generated card text.
**Signature motif:** the handwritten line, three times.
**Section transitions:** changes of type scale and measure, hairline rules (1px, ink at 15% opacity), the single full-bleed image. No alternating coloured bands, no boxed sections.
**Motion rule (revised 2026-09-11, founder's decision; see context/decisions.md):** the page moves the way a person does: slowly, once, and by hand. Five moves only, all from `components/motion`: content arrives with a 12px rise and a fade (`Reveal`, `RevealGroup`); the hero image comes into focus on load (`SettleIn`); hairlines draw from the left like a pen stroke (`Hairline`); handwriting writes itself in the three permitted places (`Handwritten`); step 4 warms from ink to oxblood (`Warm`). Everything runs once, decelerates, and never bounces. Still forbidden: parallax, anything tied to scroll position, sliding in from the side, counters, hover lifts, looping or ambient animation, and any motion on something the reader must act on beyond the button's press. Under `prefers-reduced-motion` every element renders at rest. Timing lives in `lib/motion.ts` and nowhere else.
**Deliberate imperfection:** one unlit candle in the hero (present in the selected placeholder); the handwritten face's natural unevenness.
**Prohibited patterns:** centred hero with badge and gradient; cards around components; icon rows; accordion FAQ; carousel; countdown; pill labels; stock couples; before/after; any "total value" figure; testimonials.

**Selected hero direction:** C, tension-led. "You love her. That was never the question." over the prepared room.
**Why it won:** the founder's rule is emotional first; the visitor is problem-aware and solution-unaware, so recognition must precede the mechanism; the room photograph is the first belief ("they understand my life") and the card in the hero is the second ("she will receive something he wrote").
**References and transferable decisions:** Aesop (restraint; product as an object photographed plainly); Le Labo (a handwritten label as the only warmth in an austere system); Kinfolk (editorial photography of hands and rooms). Transferable: high type-size contrast, one accent, documentary imagery, the handwritten element as the single point of warmth. Not fetched this session; named for the decision, not to copy.
**Anti-reference:** We reject the Dallas private-chef template (gold serif on black, plated food hero, "luxury / unforgettable / curated", hidden price, inquiry form) because it makes this brand feel like a vendor and obscures the decision, which is his authorship, not our cooking.

---

## 2. RESPONSIVE DESIGN SPECIFICATION

**Grid and max widths:** container 1120px with 24px side padding; text columns capped at 64ch; hero image full-bleed at ≥1024px.
**Breakpoints:** 0 to 639 (mobile), 640 to 1023 (tablet), ≥1024 (desktop). Tailwind defaults `sm`, `lg`.
**Typography scale (Fraunces):** display-1 80/88 desktop, 56/60 tablet, 40/44 mobile; display-2 40/44 desktop, 32/36 mobile; h3 24/32; body 18/28; small 15/22; caption 13/18 small caps, tracking 0.06em. Handwritten face 28px hero card line, 22px cue-card title, 26px signature.
**Spacing rhythm:** 8px base. Module padding-block 96px desktop, 64px mobile, except modules 2 and 8 at 128/80 (air) and modules 5 and 7 at 80/56 (dense). No two adjacent modules with identical internal layout.
**Color roles (tokens in `@theme`):**
- `--color-bone: #F4EFE6` background
- `--color-ink: #1C1917` text
- `--color-oxblood: #6B1F2A` action and step 4 (white text on oxblood ≈ 11:1)
- `--color-warm-grey: #6B625B` captions and small print (≈ 5:1 on bone)
- `--color-rule: rgb(28 25 23 / 0.15)` hairlines
- `--color-error: #8A2A1F` with text and icon; `--color-success: #2F5D3A` with text and icon
**Image behavior:** `next/image` with explicit width/height to avoid layout shift; hero `sizes="(min-width:1024px) 66vw, 100vw"`, priority; hero crop: desktop 3:2 with `object-position: 20% center` so the generated card text at the right edge falls outside the frame; mobile 4:5 crop centred on the table. Hands image 4:5 in module 8 only if the founder wants an image there; default is signature only. Morning-after image 3:2 as an optional inline image between modules 3 and 4 at desktop only, captioned "The morning after. Placeholder until night one."
**Component treatment:** the cue card is a bordered (1px rule) bone rectangle with 24px padding, 8px radius, rotated -2deg at desktop, 0deg on mobile; the only "card" on the page. Buttons: oxblood fill, bone text, 16px/24px, 14px 24px padding, 4px radius, no shadow. Secondary action is an underlined text link in ink. Inputs: 1px ink border at 40%, bone background, 44px min height, visible label above (no placeholder-only labels).
**Motion and reduced-motion behavior:** tokens in `lib/motion.ts`: quick 300ms, settle 700ms, slow 1100ms; rise 12px; stagger 90ms; ease `hand` [0.22, 1, 0.36, 1] for arrivals, `pen` [0.45, 0.05, 0.55, 0.95] for drawing and writing; reveals fire once at 30% visible; handwriting writes at 90ms per character, bounded 0.9s to 2.4s. Hero: the image settles on load (opacity, and scale 1.03 to 1, over 1100ms) while the text column arrives top to bottom at 90ms steps; the whole sequence ends under 1.6s and the CTA is visible within a second. Air modules (2 and 8) use `slow`; everything else `settle`. Under `prefers-reduced-motion: reduce` every primitive renders at rest (checked in each component with `useReducedMotion`, and again by `MotionConfig reducedMotion="user"` in `MotionProvider`); the CSS rule covers hover and press transitions. Sticky mobile CTA rises into place in 300ms (`SlideUp`).
**Focus and interaction states:** 2px oxblood outline with 2px offset on every interactive element; hover on buttons darkens oxblood 8%; buttons press to 98.5% scale over 200ms (CSS `active:scale-[0.985]`, no hover lift, no shadow); links underline by default, no colour-only hover.

---

## 3. ASSET MANIFEST

| Asset | Source path or owner | Required preparation | Used in |
|---|---|---|---|
| Hero room (placeholder, generated) | public/images/hero-room.webp (1872x1248) | Crop right edge in CSS to hide the generated card text; alt "A living room set for the evening: a dressed table, roses, candles, one not yet lit." Label in code comment PLACEHOLDER: replace with documentary photograph from night one | Module 1 |
| Hands writing the card (placeholder, generated) | public/images/hands-card.webp (928x1152) | Optional; only if module 8 uses an image. Alt "A man's hands writing a card at a wooden table." | Module 8 (optional) |
| Morning after (placeholder, generated) | public/images/morning-after.webp (1872x1248) | Optional inline image at desktop between modules 3 and 4; caption "The morning after. Placeholder until night one." | Between 3 and 4 (optional) |
| Alternates | public/images/placeholders/*.png, *.jpg | Keep for the founder's choice; do not ship | none |
| Cue card | Rendered in code from the copy in 6-landing-page-copy.md, Module 4 | None; it is markup | Module 4 |
| Cue card stroke, two frames (placeholder, generated; founder decision 2026-09-11, see context/decisions.md) | public/images/cue-card-shoulders-1.webp and cue-card-shoulders-2.webp (896x1200 each, 3:4) | Frame 1: hands flat at the base of her neck, thumbs either side of the spine. Frame 2: the same hands at her shoulder blades. Same room, light and camera in both; hair up, face hidden. Alt 1 "A man's hands flat at the base of her neck, thumbs either side of her spine." Alt 2 "The same hands at her shoulder blades, the end of the stroke." Label PLACEHOLDER in code; replace with documentary frames from night one. Alternates in public/images/placeholders/cue-card-shoulders-*.jpg | Module 4, beside the card |
| Founder signature | Text in the handwritten face | None | Module 8 |
| Wordmark | Text "Thoughtful Moments" in Fraunces, small caps, letter-spaced | None; no logo file yet | Header, footer |
| Open Graph image | To create: 1200x630, bone ground, the headline in Fraunces, wordmark bottom left | Build task, Phase 4 | Metadata |

Generated placeholders are atmospheric, not evidence. They may ship for the 30-day noindex test with the PLACEHOLDER label in code; they must be replaced before any wider launch.

---

## 4. IMPLEMENTATION DECISIONS

| Decision | Choice | Why | Official source or existing project evidence |
|---|---|---|---|
| Framework | Next.js 16 App Router, TypeScript strict, `noUncheckedIndexedAccess` | tech-stack.md and CLAUDE.md | C:/Users/iakan/.claude/ai-agents/shared/tech-stack.md; CLAUDE.md |
| Primitive system | shadcn/ui for Button, Input, Label, Textarea, RadioGroup only | Accessible form behaviour without adopting a visual identity | context/conventions.md ("use shadcn where one fits") |
| Styling | Tailwind 4 with tokens in `@theme` in app/globals.css; no tailwind.config.js | Project convention | context/conventions.md |
| Motion | `motion` 13 (`motion/react`), already installed; primitives in `components/motion`, tokens in `lib/motion.ts` | Founder's decision 2026-09-11: motion carries intimacy, by hand. tech-stack.md lists Framer Motion; `motion` is its current package name | context/decisions.md; C:/Users/iakan/.claude/ai-agents/shared/tech-stack.md |
| Fonts | `next/font/google`: Fraunces (variable) and Homemade Apple | Self-hosted by Next, no layout shift, licence via Google Fonts | Next.js font docs; verify at build |
| Payments | Stripe Checkout, hosted page, session created in a Server Action; `mode: 'payment'`, one line item "Deposit: Her Night, Your Hands", $500, `success_url` to /held, `cancel_url` to /#price; webhook `checkout.session.completed` triggers emails | Keeps card handling off the site; current docs show Server Action pattern | https://docs.stripe.com/checkout/quickstart?client=next (checked 2026-09-11) |
| Refunds | Manual from the Stripe dashboard until date confirmed; no code | Validation phase | context/decisions.md |
| Email | Resend: confirmation to the buyer, notification to NOTIFY_EMAIL for both deposit and form | Decided | .env.local.example |
| Forms | Tell Us About Her as a Server Action with Zod validation; sends an email; no database | No DB decision | context/decisions.md |
| Analytics | `@vercel/analytics/next` `<Analytics />` plus `track()` events: `cta_hold_slot_click` (with `location`), `deposit_started`, `deposit_completed` (on /held), `form_started`, `form_submitted`, `scroll_price` | Vercel only decision; the Stage 2 funnel needs these | context/decisions.md; Stage 2 packet |
| SEO | `robots: { index: false, follow: false }` in metadata during the test; canonical set; OG image | Noindex during the 30-day test | Stage 4 funnel |
| Visual QA | Playwright screenshots at 390, 768, 1280; Lighthouse ≥ 95 accessibility, ≥ 90 performance | Verification gate | Section 7 |
| Hosting | Vercel; staging preview then main | Branch rule | CLAUDE.md |

---

## 5. BUILD PHASES

### Phase 0: Inspect and prepare
- Read `usl-build/6-landing-page-copy.md` and this document in full.
- Inspect the repo: CLAUDE.md, context/*, .env.local.example. No app exists yet.
- Confirm .env has STRIPE_SECRET_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET, RESEND_API_KEY, NOTIFY_EMAIL, NEXT_PUBLIC_SITE_URL (test keys for staging).
- Confirm the three webp images exist in public/images and are labelled placeholders.
- Confirm the analytics event list and the two success states.
- Founder tasks in parallel, not blocking the build: two food-partner quotes; florist quote; waiver and commitment wording to a professional; a domain and a hello@ mailbox; Stripe account in test mode; USPTO search for Thoughtful Moments.

### Phase 1: Foundation
- `create-next-app` (TypeScript, Tailwind, App Router, src disabled to match CLAUDE.md's /app), on branch `staging`.
- Tokens, fonts, container, global semantics, focus styles, reduced-motion rule, `MotionProvider` in the root layout, `next/image` defaults.
- shadcn init and the five primitives.
- Root layout: `<Analytics />`, metadata with noindex, skip link, header with wordmark, footer.
- Hero (module 1) with the placeholder image and the approved copy; render desktop and mobile screenshots before continuing.

### Phase 2: Critical decision path
- Modules 2, 3, 4 (cue card rendered), 6 (price and commitment).
- Stripe Server Action, /held return page, webhook route, Resend emails.
- `cta_hold_slot_click`, `deposit_started`, `deposit_completed` events.

### Phase 3: Supporting modules
- Modules 5, 7, 8, 9 (closing CTA and the form).
- Mobile recomposition: sticky CTA after module 3; single-column enumerations; cue card unrotated.

### Phase 4: Conversion plumbing
- Form validation, error, loading and success states; `form_started`, `form_submitted`.
- `scroll_price` event via IntersectionObserver on module 6.
- Terms and refund policy page, privacy page (founder supplies text; placeholders marked TODO, not lorem).
- OG image, canonical, favicon.

### Phase 5: Verification and publish
- Playwright screenshots at 390, 768, 1280; compare against the visual thesis.
- Keyboard walk, contrast check, alt text, reduced motion.
- Lighthouse gates.
- Copy match against 6-landing-page-copy.md line by line.
- Authorship and red-flag audits on the rendered page.
- Deploy to staging preview; the founder opens it on a phone; then merge to main.

---

## 6. SELF-CONTAINED BUILD PROMPTS

### Prompt 1: Initialise the app and the design foundation

**Context to read:** CLAUDE.md, context/conventions.md, context/decisions.md, usl-build/6-landing-page-build-sequence.md Sections 1, 2, 4.
**Decision-maker served:** same-person user/payer.
**Task:** On branch `staging`, run `npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --eslint --import-alias "@/*"` (confirm it does not clobber existing files; if it refuses because the directory is not empty, scaffold into a temp dir and move the generated files in). `package.json` and `tsconfig.json` already exist for the motion system: merge rather than overwrite, keeping the `motion` dependency, the `typecheck` script, `strict` and `noUncheckedIndexedAccess`, and let `react` and `react-dom` move to dependencies where create-next-app puts them; `lib/motion.ts` and `components/motion/*` must survive untouched. In app/globals.css define the `@theme` tokens from Section 2 (bone, ink, oxblood, warm-grey, rule, error, success) and the type scale as CSS custom properties. Load Fraunces (variable, axes opsz and wght) and Homemade Apple with `next/font/google` in app/layout.tsx and expose them as CSS variables `--font-serif` and `--font-hand`. Add a `.container` utility (max 1120px, 24px padding). Add global focus-visible styles (2px oxblood outline, 2px offset) and a `prefers-reduced-motion` rule that disables CSS transitions and animations (the motion primitives handle their own reduced-motion state). Wrap the page in `<MotionProvider>` from `components/motion` inside `<body>`. Install shadcn/ui and add Button, Input, Label, Textarea, RadioGroup; restyle Button to the oxblood spec. Add `@vercel/analytics` and mount `<Analytics />`. Set metadata: title "Thoughtful Moments · Her Night, Your Hands", description "One night at home, unmistakably yours. Dallas.", `robots: { index: false, follow: false }`.
**Approved copy:** none in this prompt.
**Assets:** none.
**Visual rules:** Section 2 tokens exactly; no default Tailwind blues; no shadows.
**Behavior and responsive rules:** container and breakpoints per Section 2.
**Accessibility requirements:** skip link to `#main`; `lang="en"`; focus styles visible.
**Do not:** add tailwind.config.js; add any component library beyond the five primitives; add Google Analytics; add a database.
**Output to show:** `npm run dev` running; a screenshot of the empty page with the wordmark in the header to prove fonts and tokens load.
**Review gate:** fonts render (Fraunces visible), tokens applied, Lighthouse accessibility 100 on the empty page, `npm run typecheck` passes.

### Prompt 2: Header, footer, and the hero (Module 1)

**Context to read:** usl-build/6-landing-page-copy.md Module 1 and Footer; this document Sections 1 to 3.
**Decision-maker served:** same person.
**Task:** Build `components/site-header.tsx` (wordmark "Thoughtful Moments" in Fraunces small caps, letter-spaced, left; nothing else), `components/site-footer.tsx` (the footer line, links to /terms and /privacy, hello@ address from NEXT_PUBLIC_CONTACT_EMAIL or a TODO), and `components/hero.tsx`. Hero at desktop: 12-column grid; text in columns 1 to 5; image full-bleed from column 7 to the viewport edge, 3:2, `object-position: 20% center`. Mobile: image first at 4:5, then text. Text order: eyebrow "Thoughtful Moments · Dallas" (caption style), display-1 headline on three lines with `<br>` after "her." and "question.", the promise paragraph, the price paragraph, the primary Button "Hold a slot" (a form that posts to the Stripe Server Action from Prompt 4, stubbed for now), the secondary link "Not ready? Tell us about her." to `#tell-us`, then the qualifier line in caption style. Fire `track('cta_hold_slot_click', { location: 'hero' })` on click.
**Approved copy:** use Module 1 verbatim from the copy document.
**Assets:** public/images/hero-room.webp with alt "A living room set for the evening: a dressed table, roses, candles, one not yet lit." Mark it in a code comment: PLACEHOLDER, generated; replace with a documentary photograph from night one.
**Visual rules:** bone ground; ink text; oxblood button only; no badge, no gradient, no overlay text on the image.
**Behavior and responsive rules:** the hero is the one place motion runs on load. Wrap the image in `<SettleIn className="overflow-hidden">` so it comes into focus over 1100ms; `priority` on the image; explicit width and height. Wrap the text column in `<RevealGroup on="mount" delay={0.15}>` and make each block a `<RevealItem>`: the eyebrow (`as="p"`), the three headline lines (each `<RevealItem as="span" className="block">` inside a plain `<h1>`; variants reach them through context), the promise, the price, the CTA row (`div`), the qualifier. Eight items at 90ms steps, 700ms each: the sequence ends under 1.6s, the CTA is visible within a second. Under reduced motion everything renders at rest. If Lighthouse LCP fails the gate at Prompt 10, remove `SettleIn` from the image first; the text column stays.
**Accessibility requirements:** headline is the page `<h1>`; the button is a real `<button>` inside a `<form>`; link has descriptive text.
**Do not:** centre the hero; put the headline over the image; add a second button; add a pill.
**Output to show:** screenshots at 390 and 1280.
**Review gate:** the first mobile screen shows the image, the headline and the promise; the price and CTA are reachable within one and a half screens; no layout shift on load.

### Prompt 3: The situation and how the night works (Modules 2 and 3)

**Context to read:** copy document Modules 2 and 3; this document Section 2.
**Decision-maker served:** same person.
**Task:** `components/situation.tsx`: a single paragraph in body-large (22/34 desktop, 19/30 mobile), measure 60ch, placed in columns 2 to 8 at desktop, padding-block 128px desktop, 80px mobile. No heading, no image. `components/how-it-works.tsx`: display-2 heading "How the night works" and, at desktop, a two-column layout with the heading and nothing else on the left (columns 1 to 4) and an ordered list of five steps on the right (columns 6 to 12); each step is a bold lead phrase followed by its sentence, separated by hairline rules; step 4's lead phrase and number in oxblood. Mobile: heading, then the list in one column.
**Approved copy:** Modules 2 and 3 verbatim.
**Assets:** optionally place public/images/morning-after.webp after Module 3 at desktop only with the caption "The morning after. Placeholder until night one." in caption style; omit on mobile.
**Visual rules:** hairlines only; no numbered circles, no icons, no cards.
**Behavior and responsive rules:** `<ol>` with real numbers rendered via CSS counters in Fraunces. The situation paragraph is `<Reveal as="p" pace="slow">`. The heading is `<Reveal as="h2">`. The list is `<RevealGroup as="ol">` with each step a `<RevealItem as="li">`; from the second step on, each `li` opens with `<Hairline />` in place of a border, so the rule draws as the step arrives. Step 4's number and lead phrase sit inside `<Warm className="text-oxblood">` and warm from ink to oxblood as the reader reaches them; the class keeps the resting state correct without JavaScript.
**Accessibility requirements:** the list is a semantic `<ol>`; colour is not the only signal for step 4 (it also carries the words "This part is yours").
**Do not:** add a timeline graphic; animate anything beyond the specified arrival (no sliding in from the side, no counting numbers, no highlight on hover).
**Output to show:** screenshots at 390 and 1280.
**Review gate:** step 4 is visibly distinct and readable in greyscale.

### Prompt 4: Stripe deposit, return page, webhook, emails

**Context to read:** this document Section 4 (Payments, Email); .env.local.example; Stripe hosted Checkout quickstart for Next (https://docs.stripe.com/checkout/quickstart?client=next).
**Decision-maker served:** same person; payer is the user.
**Task:** Install `stripe` and `resend`. Create `lib/stripe.ts` (server-only client) and `app/actions/checkout.ts` with a Server Action `createDepositSession()` that creates a Checkout Session: `mode: 'payment'`, one `price_data` line item, currency usd, unit_amount 50000, product name "Deposit: Her Night, Your Hands", `success_url: ${NEXT_PUBLIC_SITE_URL}/held?session_id={CHECKOUT_SESSION_ID}`, `cancel_url: ${NEXT_PUBLIC_SITE_URL}/#price`, `customer_creation: 'always'`, `metadata: { offer: 'her-night-your-hands', cohort: 'founding' }`, then `redirect(session.url)`. Wire the hero and closing buttons to it. Create `app/held/page.tsx`: heading "Your slot is held." and the approved success copy; fire `track('deposit_completed')` once on mount (client component) guarded by the presence of `session_id`. Create `app/api/stripe/webhook/route.ts`: verify the signature with STRIPE_WEBHOOK_SECRET; on `checkout.session.completed`, send two Resend emails: to the customer email, subject "Your slot is held", body per the copy document; to NOTIFY_EMAIL, subject "New deposit: Her Night, Your Hands", with the customer email, amount, and session id. Return 200 on success and 400 on a bad signature.
**Approved copy:** the /held page and email copy from the copy document, "Success and confirmation states".
**Assets:** none.
**Visual rules:** /held uses the same tokens; display-2 heading; one paragraph; a link back to the page.
**Behavior and responsive rules:** buttons show a pending state ("Opening secure checkout…") via `useFormStatus`; disabled while pending.
**Accessibility requirements:** pending state announced with `aria-live="polite"`.
**Do not:** collect card details on the site; store anything in a database; hard-code keys; use the publishable key server-side.
**Output to show:** a completed test-mode payment reaching /held; the webhook log showing both emails sent (Resend test domain is fine).
**Review gate:** Stripe test card succeeds; cancel returns to #price; webhook signature failure returns 400; `deposit_completed` appears in Vercel Analytics locally (debug mode).

### Prompt 5: The part that has to be yours, with the cue card (Module 4)

**Context to read:** copy document Module 4; this document Sections 1 and 2 (component treatment).
**Decision-maker served:** same person.
**Task:** `components/your-part.tsx`: desktop two columns; left (columns 1 to 6) heading in display-2 and the two paragraphs; right (columns 8 to 12) the cue card: a bone rectangle with a 1px rule border, 24px padding, 8px radius, rotated -2deg, containing: caption "Card 4 of 12", a title "Shoulders." in the handwritten face at 22px, the instruction paragraph in body, and the italic "Ask her" line in body-small. Mobile: text then the card full width, unrotated.
**Approved copy:** Module 4 verbatim, including the card.
**Assets:** the card itself is markup. Beneath it, the stroke it describes in two frames (added 2026-09-11, founder decision; see the asset manifest): `public/images/cue-card-shoulders-1.webp` (hands at the base of her neck) and `cue-card-shoulders-2.webp` (the same hands at her shoulder blades), 896x1200, 3:4, `next/image` with explicit width and height, `sizes="(min-width:1024px) 20vw, 45vw"`. PLACEHOLDER comment in code; documentary frames from night one replace them.
**Visual rules:** this is the only element on the page with a border and radius; the handwritten face appears here for the second time; no drop shadow. The two frames sit side by side under the card, unrotated, with a 16px gap, no border and no radius (they are photographs, not cards); each carries a small-caps caption in warm grey: "1 · From the neck" and "2 · Down to the shoulder blades". Documentary crop, no filter.
**Behavior and responsive rules:** rotation removed under 640px and under reduced motion (CSS: `lg:-rotate-2 motion-reduce:rotate-0` on a wrapper). The heading and the two paragraphs are `<RevealItem>`s in a `<RevealGroup>`. The card is a separate `<Reveal as="figure" delay={0.2}>` inside the rotated wrapper, so it is set down on the table after the text has landed, already at its angle. The title "Shoulders." is `<Handwritten className="font-hand text-[22px]">` and writes itself once the card is in view. The two frames are a `<RevealGroup as="ol">` of two `<RevealItem as="li">`s beneath the card wrapper: frame 2 arrives one stagger step after frame 1, so the reader sees the stroke happen once, top to bottom, and then it rests. Nothing cross-fades, loops or replays; under reduced motion both frames render at rest. Mobile: the two frames stay side by side (each about 45vw) under the full-width card.
**Accessibility requirements:** the card is a `<figure>` with `<figcaption>` "Card 4 of 12"; rotation does not affect reading order. The frames are an ordered list so the sequence is in the document; alt text as in the asset manifest; captions are visible text, not alt.
**Do not:** add a stack of multiple cards; add a "view all cards" link; photograph the card itself; show her face; add a third frame, an arrow, or a play control.
**Output to show:** screenshots at 390 and 1280.
**Review gate:** the card reads as an object, not a UI card; the handwritten face is used only on the title; the two frames read as one movement, not two products.

### Prompt 6: What is included, and the price (Modules 5 and 6)

**Context to read:** copy document Modules 5 and 6; Stage 5 display names.
**Decision-maker served:** same person.
**Task:** `components/included.tsx`: display-2 heading; a `<dl>` of eight items rendered at desktop as two columns of four with hairline rules between rows; each `<dt>` is the display name in bold, each `<dd>` its sentence. Beneath, a sub-heading "What it is not" in h3 and the paragraph in a 56ch measure. `components/price.tsx` with `id="price"`: display-2 heading "The price"; the price line in display-1 at 56px ("$2,500 for the first five bookings. $3,500 after that."); the limit paragraph; then two labelled paragraphs "Holding a slot." and "Our commitment." separated by a hairline rule; then the primary Button "Hold a slot" wired to the Server Action with `track('cta_hold_slot_click', { location: 'price' })`. Add an IntersectionObserver that fires `track('scroll_price')` once when the module is 50% visible.
**Approved copy:** Modules 5 and 6 verbatim.
**Assets:** none.
**Visual rules:** no cards, no icons, no check marks, no "total value", no strike-through prices.
**Behavior and responsive rules:** `<dl>` single column on mobile. Both headings are `<Reveal as="h2">`. The `<dl>` is `<RevealGroup as="dl">` with each `dt`/`dd` pair grouped in a `<RevealItem>` (a `div` is valid inside `dl`) that opens with `<Hairline />`. The price line is `<Reveal as="p" pace="slow">`; the rule between "Holding a slot." and "Our commitment." is a `<Hairline />`.
**Accessibility requirements:** definition list semantics; the price is text, not an image.
**Do not:** add a comparison table; add a countdown; add "only X left".
**Output to show:** screenshots at 390 and 1280.
**Review gate:** Module 5 has zero borders and zero icons; the commitment is visually set apart by a rule only.

### Prompt 7: Questions and the founder note (Modules 7 and 8)

**Context to read:** copy document Modules 7 and 8.
**Decision-maker served:** same person.
**Task:** `components/questions.tsx`: display-2 heading "Questions men ask us"; six question/answer pairs as `<h3>` and `<p>` in a single 64ch column, hairline rules between pairs, all visible (no accordion). `components/founder-note.tsx`: h3 "From Irewole", the paragraph in body-large at 56ch, and the signature "Irewole Akande, Dallas" in the handwritten face at 26px (its third and final use). No photograph unless the founder supplies one; if supplied, place it 4:5 at 240px wide to the left at desktop.
**Approved copy:** Modules 7 and 8 verbatim; the founder may edit Module 8 before publish and the edit must be reflected in the copy document.
**Assets:** optional founder photograph (not available); do not use hands-card.webp here unless the founder chooses to.
**Visual rules:** air around the note (padding-block 128px desktop).
**Behavior and responsive rules:** the six pairs are `<RevealItem>`s in a `<RevealGroup>`, each opening with `<Hairline />`. The founder paragraph is `<Reveal as="p" pace="slow">`; the signature is `<Handwritten className="font-hand text-[26px]" delay={0.3}>` (its third and last use), so it writes itself after the note has arrived.
**Accessibility requirements:** questions are headings so screen readers can navigate them.
**Do not:** build an accordion; add a chat widget; add "Still have questions? Book a call".
**Output to show:** screenshots at 390 and 1280.
**Review gate:** all six answers visible without interaction; the signature is the only handwritten element in the module.

### Prompt 8: Closing action and the Tell Us About Her form (Module 9)

**Context to read:** copy document Module 9 and "Success and confirmation states"; this document Section 4 (Forms, Email).
**Decision-maker served:** same person.
**Task:** `components/closing.tsx`: display-2 "Her date is coming.", the two-line paragraph, the primary Button wired to the Server Action with `track('cta_hold_slot_click', { location: 'closing' })`; a hairline rule; then `components/tell-us-form.tsx` with `id="tell-us"`: h3 "Not ready? Tell us about her.", the intro line, and a form with: date input (label "Her birthday or your anniversary"), text input (label "Where you live", hint "Dallas neighbourhood or ZIP"), textarea (label "Three things she loves"), textarea (label "One thing she has said about you lately"), RadioGroup (label "Would you give her the massage yourself?", options "Yes", "I would want to, but I am nervous", "No"), email input (label "Your email"), a honeypot field hidden from users, and the Button "Send it". Server Action `submitTellUs()` validates with Zod (date within the next 180 days, ZIP or text 2 to 60 chars, each text 3 to 500 chars, radio required, email valid), rejects if the honeypot is filled, sends one Resend email to NOTIFY_EMAIL with all answers and a subject "Tell Us About Her: [date]", and returns a success state that replaces the form with "Thank you. We will write back within two days with a plan for the night and the price." Fire `track('form_started')` on first focus and `track('form_submitted', { massage: value })` on success. Show field-level errors with text and an icon next to the field.
**Approved copy:** Module 9 verbatim; the small print "We reply within two days. Your answers are used for the plan and nothing else." beneath the button.
**Assets:** none.
**Visual rules:** labels above fields; 44px min control height; error colour paired with text; no floating labels.
**Behavior and responsive rules:** single column at all widths; pending state on submit; the sticky mobile CTA (a slim bar with "Hold a slot") appears after the user scrolls past Module 3 and hides when the form is in view, mounted through `<SlideUp show={visible}>` so it rises in 300ms and drops away. The closing heading and paragraph are `<RevealItem>`s in a `<RevealGroup>`; the form itself does not animate.
**Accessibility requirements:** every field has a visible `<label>`; errors linked with `aria-describedby`; the success message is in an `aria-live` region; the sticky bar does not cover focused inputs.
**Do not:** add a phone field; add marketing consent checkboxes (none needed for a transactional reply); store submissions anywhere but the email.
**Output to show:** a completed submission arriving at NOTIFY_EMAIL; screenshots of error and success states at 390.
**Review gate:** keyboard-only completion works; errors readable by a screen reader; honeypot blocks a bot submission.

### Prompt 9: Legal pages, metadata, OG image

**Context to read:** this document Section 4 (SEO); copy document Footer.
**Decision-maker served:** same person.
**Task:** Create `app/terms/page.tsx` and `app/privacy/page.tsx` with headings and clearly marked TODO sections for the founder's reviewed text (deposit refund terms: refundable until the date is confirmed on the call; balance due two weeks before; the delivery commitment; the massage waiver reference; data used only for the night). Do not write legal text; do not use lorem ipsum. Generate `app/opengraph-image.tsx` (1200x630, bone ground, headline in Fraunces, wordmark bottom left). Set canonical to NEXT_PUBLIC_SITE_URL, keep `robots` noindex, add a favicon (wordmark "F" in Fraunces).
**Approved copy:** the two page titles and the TODO section headings only.
**Assets:** none.
**Visual rules:** same tokens.
**Behavior and responsive rules:** static pages.
**Accessibility requirements:** headings hierarchy.
**Do not:** invent legal terms; remove noindex.
**Output to show:** the OG image rendered; a link preview check.
**Review gate:** both pages reachable from the footer; OG image renders; `noindex` present in the HTML head.

### Prompt 10: Verification and publish

**Context to read:** this document Section 7; copy document in full.
**Decision-maker served:** same person.
**Task:** Add Playwright and a script that captures full-page screenshots at 390x844, 768x1024 and 1280x800 to `/screenshots`. Run Lighthouse (or `@lhci/cli`) against the local build for the home page. Walk the page by keyboard and record the tab order. Diff the rendered copy against `6-landing-page-copy.md` and list every discrepancy. Run the red-flag inventory from the copy document's audit section against the screenshots. Fix everything found. Commit on `staging` with Conventional Commits, push, open the Vercel preview URL on a phone, then merge to `main`.
**Approved copy:** none new.
**Assets:** the screenshots.
**Visual rules:** the thesis in Section 1.
**Behavior and responsive rules:** none new.
**Accessibility requirements:** Lighthouse accessibility ≥ 95; no colour-only states; reduced motion honoured: emulate it in Playwright (`page.emulateMedia({ reducedMotion: 'reduce' })`), confirm every element renders at rest with no fade, rise, draw or write-on, and keep that screenshot at 390.
**Do not:** merge to main without the staging preview having been opened on a real phone; remove noindex.
**Output to show:** the three screenshots, the Lighthouse scores, the copy diff (expected: none), the preview URL.
**Review gate:** Section 7 in full.

---

## 7. DEFINITION OF DONE

**Functional**
- Hold a slot opens Stripe Checkout in test mode from the hero, the price module and the closing; a successful payment lands on /held with the approved copy; cancel returns to #price.
- The webhook verifies signatures, sends the buyer confirmation and the founder notification, and returns the right status codes.
- Tell Us About Her validates, rejects the honeypot, emails NOTIFY_EMAIL, and shows the success state in place.
- Analytics events fire exactly once each: `cta_hold_slot_click` (with location), `deposit_started`, `deposit_completed`, `form_started`, `form_submitted`, `scroll_price`.

**Content and claims**
- Every line on the page matches `6-landing-page-copy.md`; the language rule (slot, booking, night) holds.
- No testimonials, counts, statistics, comparative prices, "total value", or outcome promises anywhere.
- Placeholder images carry the PLACEHOLDER comment; the hero crop hides the generated card text.
- The founder note is the founder's edited version.
- "A Dallas kitchen we work with" is true (a partner is agreed) before the page leaves noindex or receives paid reach.

**Accessibility**
- Lighthouse accessibility ≥ 95; every interactive element keyboard reachable with a visible focus ring; labels on every field; errors announced; reduced motion honoured (verified by emulation, screenshot kept); contrast ≥ 4.5:1 for text (warm grey verified on bone).

**Performance**
- Lighthouse performance ≥ 90 on mobile; LCP is the hero image with `priority`; CLS < 0.05; fonts via next/font with no flash of invisible text beyond the default.

**Responsive and visual**
- Screenshots at 390, 768 and 1280 match the thesis: left-aligned editorial composition, one full-bleed image, hairlines not bands, one bordered object (the cue card), oxblood in exactly two roles, handwritten face in exactly three places.
- Mobile is recomposed: image first, CTA within one and a half screens, sticky CTA after Module 3, single-column lists.
- Red-flag inventory: zero centred-hero-with-badge, zero card grids, zero icon rows, zero accordions, zero carousels, zero countdowns, zero pills.
- Motion: every reveal runs once and settles within 1.1s; the hero sequence ends under 1.6s; nothing moves with scroll position; the write-on appears in exactly the three handwritten places; step 4 is the only element that changes colour; `npm run typecheck` passes.

**SEO and sharing**
- `noindex, nofollow` during the test; canonical set; OG image renders; title and description as specified.

**Final human questions**
- Would the founder be comfortable sending this URL to a man in his own circle tonight?
- Does the page state, or does it argue? (It should state.)
- If the logo and name were removed, could this page belong to a Dallas private chef? (It should not.)

**Not built, and not claimed:** no live page exists at the end of Stage 6. The next action is to run Prompts 1 to 10 on `staging`.

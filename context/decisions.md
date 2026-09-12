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

## 2026-09-11 -- Tell Us About Her: the email is the record (Prompt 8)
- The form posts to a Server Action, validates with zod and sends one email to NOTIFY_EMAIL
  with the sender as reply-to, so the founder answers by replying. Nothing is stored (the no
  database decision holds); the log line on failure carries the cause and no addresses.
- The honeypot rejects by showing the same thank-you: a bot that filled it gets no email, no
  `form_submitted` event and no hint it was caught. A visible rejection would teach it what to
  change. State `discarded` names the case in code.
- "Within the next 180 days" is counted on the Dallas calendar (`America/Chicago`), not the
  server clock, so a date entered late in the evening is not a day out at Vercel's UTC. The
  native picker learns its `min`/`max` when the date field is first focused rather than at
  render: the page is prerendered at build, and a window computed then would age with it.
  The action holds the real rule.
- Resend is reached through `lib/resend.ts` with the env parsed once by `lib/env.ts`
  (`server-only`, zod). `RESEND_FROM_EMAIL` is optional and defaults to the Resend onboarding
  sender, which delivers to the account owner only; set it to hello@[domain] once the domain
  is verified. With any variable missing the action fails closed: the reader sees "We could
  not send that just now" and the server log names the variable (production checklist, 3).
- Verified against a local stand-in for api.resend.com through the SDK's `RESEND_BASE_URL`
  override, which captured the exact payload (subject "Tell Us About Her: February 14, 2027",
  every answer, reply-to). The real inbox was not reached: `.env` has no key locally. That
  last step is the founder's, and it closes the Prompt 8 output gate.
- Reopen if submissions need a record beyond the inbox (then Supabase per tech-stack.md), or
  if the honeypot proves insufficient against paid-reach traffic (then a timing check or
  Turnstile, in that order).

## 2026-09-11 -- The sticky bar and a fourth CTA location (Prompt 8)
- The mobile bar carries the Button and "$500 holds your slot.", the first clause of the
  Module 9 deposit sentence, so it introduces no new copy. Its event is
  `cta_hold_slot_click` with `location: "sticky"`, alongside hero, price and closing, so the
  funnel can tell a bar press from a page press.
- It hides only while the form is in view (the prompt's rule), not near the price or closing
  buttons: the closing button is a screen above the form on a phone, and the bar dropping
  away as the form arrives already covers the moment he is reading the last call to action.
- The Module 3 observer runs against a root stretched far below the viewport, so its only
  reported crossing is the module's bottom edge passing the top of the screen. A plain
  observer misses a jump (an anchor, the skip link) from below the module to above it,
  because the state on both sides is "not intersecting", and the bar stayed up at the top of
  the page. Found in the Playwright pass after `7f59e22`; the fix is the uncommitted diff.
- Reopen if the phone test finds the bar covering the last line of a module when the reader
  stops scrolling, or if the founder wants it to yield near the price button too.

## 2026-09-11 -- Copy review: the hero states the night, not the service
- A review of the page copy scored it 74/100: disciplined and honest, but the hero described
  the shape of the service (plan, set up, clear away) and never the product, then dropped
  "the massage" with a definite article for a thing the reader had not met. Dinner did not
  appear until Module 3 step 4. The hero now says what the night is in its first sentence: a
  massage he gives her with cue cards beside him, then dinner on the table, and only then the
  logistics. Product first, as in the manifesto line "You give the massage. We do everything
  else."
- "The first five are $2,500", read next to "five bookings a month", could mean each month
  has five at $2,500. It means the first five ever, a founder launch price. "Our first five"
  in the hero and the price line says so.
- The tea variant is off the page. "The tea and the dinner are available on request" in the
  massage question introduced a massage-free night inside an offer named Her Night, Your
  Hands, and "Tea for Two" on an evening page read as an afternoon. The component is now
  "Dinner for Two, Delivered". Tea remains an on-call option in the Stage 4 offer document
  (component 3); it is not sold on the page.
- Step 4 gains one sentence of her coming home ("She comes home to a room she does not
  recognise, and you are the reason."). The rubric is Pull and the page evoked the night
  nowhere but the situation paragraph. The sentence describes the scene and promises nothing
  about her reaction, so the claim ledger is unchanged.
- "Gone before she is home" fell from four uses to two (hero, step 3); "transform" left the
  Setup line; the founder note lost "I believe intentionality is what builds intimacy" and
  keeps the by-hand sentence. The founder still edits the note before publish.
- Not changed: the answer to "Why $2,500?" stays although the voice brief says the page does
  not justify the price. It lists what is delivered rather than arguing, and it is the
  question men ask.
- Reopen when night one produces documentary photographs and a first buyer conversation.
  The remaining gap is proof, not copy.

## 2026-09-11 -- One left edge for the whole page; the hero no longer bleeds
- The founder read the hero as off-centre and the site as inconsistently indented. Measured
  at 1440 and 1920: every module started at the container edge (184px / 424px) except the
  situation paragraph and the founder note, which sat one grid column in (col-start-2, a
  91px jog), and the hero image ran to the viewport edge while the text kept the container
  margin, so on wide screens the hero had a full margin on the left and none on the right.
- Fix: the two modules start at column 1 like everything else (the situation keeps its
  left rule and padding, so the rule now sits on the shared edge); the hero image ends at
  column 14 of the bleed grid, the container's right edge, instead of column 15. The hero
  is now a centred 1120px band with the image at 615px wide, the same width as the Module 3
  photograph. The `bleed-grid` utility stays on the section; only the image span changed.
- Cost: hero direction C loses the editorial bleed. The founder chose balance over it.
  Reopen if documentary photography from night one wants the bleed back; then balance it
  by bleeding the text column's gutter too, not by re-indenting the modules.

## 2026-09-11 -- No caption line above the hero headline
- The hero opened with a small-caps "Thoughtful Moments · Dallas" directly under the header
  wordmark "Thoughtful Moments", two name lines stacked in the first 250px. The founder
  removed the caption; the headline now opens the text column. Dallas is still stated in the
  qualifier line under the CTA and in the footer. The copy document carries the same note.

## 2026-09-11 -- No headcount on the page; the equipment is named
- "Two of us" / "two people" / "the two of us" appeared in step 3, the Setup component, the
  limit paragraph under the price, and two answers. The founder removed the headcount: the
  page now says "we" and, where the question is who comes in, "the founders". Reason: the
  number was an operational detail the reader does not need, and it fixed the team size in
  public before the first night. The claim ledger row reads "the founders set up and clear
  away every one themselves".
- The massage table, essential oils, towels and linens are now explicit: a ninth component
  in Module 5 ("The Massage Table, Oils and Linens"), named in step 3 of the night, and first
  in the "Why $2,500?" answer. Reason: without it a reader could assume he supplies the table
  and the oils, and the price carries less. The Module 5 grid is five rows so the nine items
  fill two columns (five and four), still column-first. "Nothing arrives in a box for you to
  assemble" in "What it is not" still holds: the equipment comes and goes with us.

## 2026-09-11 -- The founder note tells the truth about the founder
- The drafted note said "I love my partner". The founder has no partner and does not want his
  relationship status on the page, nor any reference to marriage. The note is rewritten to
  state neither: he works more hours than he would choose, he knows what a man like him does
  with money when he loves someone and has no time, and he names the man he wants to be
  instead. The thesis sentence (intimacy built by hand) and the closing two sentences are
  unchanged. No invented history, no claim of having lived the buyer's relationship.
- "Spends it on her and calls it care" is the page's only first-person admission. It
  replaces "everything I gave her was a function of what I earned", which presumed a her.
- An interim draft said "I am single" and "the far side of a long marriage"; the founder
  removed both the same day. Do not reintroduce a status line.

## 2026-09-11 -- Legal pages, link preview and favicon (Prompt 9)
- The two legal pages are headings and visible notes, not text. Each section carries a
  "TODO, founder" label in small caps and a sentence saying what the reviewed wording must
  cover (refund until the date is confirmed, balance two weeks out, the delivery commitment,
  the waiver and contraindication card, data used for the night only). The notes are shown,
  not hidden in comments, so nobody on staging mistakes a draft for terms; both pages open
  with "Draft. Reviewed text to follow." Shared shape in `components/legal-page.tsx`; a
  "Questions" section carries the hello@ address from the same env var as the footer.
- The Open Graph image and the favicon are drawn in Merriweather, not Fraunces: the
  Merriweather decision above supersedes the build sequence, which still names Fraunces in
  Prompt 9. Satori (next/og) reads no CSS and no woff2, so a static Merriweather 500 TTF
  (OFL, fetched from Google Fonts) is vendored at `app/fonts/merriweather-500.ttf` and read
  from disk at build; the tokens it needs are repeated as plain values in `lib/og.ts`. Small
  caps are not available to satori, so the wordmark on the preview is uppercase at caption
  size with the 0.06em tracking.
- The favicon letter is "T", not the "F" the build sequence asked for: that F was Firsthand,
  the rename the founder reverted. Ink T on a bone square at 32px (`app/icon.tsx`) and
  180px (`app/apple-icon.tsx`) for a phone home screen, since the founder reads the page on
  a phone. `/favicon.ico` no longer 404s: browsers take the linked icon.
- Metadata: `metadataBase` comes from `NEXT_PUBLIC_SITE_URL` with a localhost fallback so
  `next build` never fails on a fresh clone; canonical is `/` on the page and `/terms`,
  `/privacy` on the legal pages; Open Graph and Twitter card tags carry the approved title
  and description; the title template appends "· Thoughtful Moments" on subpages. `noindex,
  nofollow` stays for the 30-day test and is inherited by every route.
- Verified in a scratchpad copy of the tree built with webpack (`next build --webpack`),
  because a second build in the project directory would have collided with the Prompt 4
  session's `.next`, and Turbopack refuses a junctioned `node_modules`. The project itself
  still builds with Turbopack; the webpack build was for verification only.
- Reopen when the founder supplies the reviewed text (replace the notes and the draft line),
  when documentary photography from night one exists (the preview may then carry the room),
  or if the founder wants a mark rather than a letter.

## 2026-09-11 -- Deposit path at Prompt 4
- The Checkout Session is created in a Server Action and the reader is sent to Stripe's hosted
  page; the site never sees the card. `customer_creation: 'always'` so every deposit is a
  Customer in the dashboard, which is the only record the validation phase keeps (no database,
  per the earlier entry). Refunds stay manual from the dashboard.
- The webhook is the source of truth for "paid", not /held: the return page only shows the
  approved copy and fires `deposit_completed` when `session_id` is present. It handles
  `checkout.session.async_payment_succeeded` as well as `completed` and gates both on
  `payment_status: paid`, per Stripe's fulfilment guide, so a delayed payment method never
  gets a "held" email before the money arrives. An email failure returns 500 so Stripe retries;
  the two emails are not idempotent across retries, an accepted risk at five bookings a month.
- `deposit_started` fires server-side in the action, once per session created rather than once
  per click, with the request headers so Vercel can attribute it. The click itself is
  `cta_hold_slot_click` with its location. Off Vercel the server call logs and drops.
- The buyer confirmation's reply-to is NOTIFY_EMAIL so his two or three call windows land with
  the founder; the founder notification has no reply-to and names his address in the body.
- One "Hold a slot" component (`components/hold-slot-button.tsx`) replaces four copies of the
  form, so the pending state, the disabled state and the status region are written once.
- The review gate asked for a real test-mode payment. Every key in `.env` was empty, so the
  gate was walked against a local stand-in for both the Stripe API and Resend
  (`STRIPE_API_BASE_URL`, `RESEND_BASE_URL`; the first is a local-only variable that the Stripe
  client reads to set `host`, `port` and `protocol`). That proves the request the SDK sends,
  the return and cancel paths, the pending state, the analytics events, the signature check
  and the two emails as built; it does not prove Stripe or Resend accepting the keys. The
  founder's one real test payment (state.md) closes that.
- Reopen if the experiment passes and bookings need a record beyond Stripe (then Supabase per
  tech-stack.md), or if a retry ever double-sends the buyer email (then key sends on the
  session id).

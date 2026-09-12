# USL Build Loop — Project State

**Project:** Thoughtful Moments (Stage 5 proposed Firsthand on 2026-09-11; the founder reverted to Thoughtful Moments the same day)
**Mode:** student
**Terminal stage:** 6 (non-software build: physical kit plus service; landing page with deposit link is the digital surface). Set at the Stage 2 gate on 2026-09-11. Can be raised to 8 at any later gate if a booking system or portal is needed.
**Last updated:** 2026-09-11 (after Stage 6)

**North star (one paragraph):**
Thoughtful Moments gives a Dallas man in a demanding career and a committed relationship, with her birthday or an anniversary coming, a way to make her feel genuinely prioritised when his calendar and skills do not leave room to plan it. Her Night, Your Hands is one night at home that is unmistakably his: the founders plan it on a call, set up the room, deliver the food and the flowers, leave before she arrives, and clear it away the next morning. He gives the massage, with cue cards and a practice video. Everything except the gesture is done for him; the gesture is his. Brand Idea: undivided attention. Promise: she will know it was you. $2,500 founding rate for the first five bookings, $3,500 after, $500 refundable deposit, five bookings a month. The price rests on visible authorship and is under test.

## Stage status

| # | Stage | Packet file | Status |
|---|---|---|---|
| 1 | problem-validation | 1-problem-validation.md | done |
| 2 | solution-mvp | 2-solution-mvp.md | done (validation-first, experiment planned) |
| 3 | business-model | 3-business-model.md | preliminary only (3-business-model-preliminary.md written; completes after the Stage 2 experiment result) |
| 4 | offer-design | 4-offer-design.md | done |
| 5 | brand-strategy | 5-brand-strategy.md | done (offer named: Her Night, Your Hands) |
| 6 | landing-page | 6-landing-page-copy.md | done (copy and build sequence; no live page built) |
| 7 | prd-generation | 7-prd.md | not in scope |
| 8 | build-sequence | 8-build-sequence.md | not in scope |

## Optional workstreams

| Workstream | Status | Next action |
|---|---|---|
| expertise-map | n/a | User arrived with a formed idea and business plan |
| buyer-conversations | deferred by user on 2026-09-11 | Run with the landing page as the prop if the day-30 result is deposit-inconclusive |

**Next action:** Loop complete at the terminal stage. Run the build sequence (usl-build/6-landing-page-build-sequence.md, Prompts 1 to 10) on `staging`, then run the Stage 2 experiment for 30 days and record the result in 2-solution-mvp.md Section 11.

**Open risks carried forward:**
- Stage 1 flag: Caution. Viability 3/5 at Low confidence. Willingness to pay $2,500 for a night he delivers himself is reasoned, not observed. The landing page is the test; no inventory before a pass.
- Stage 4 finding: anchored component value is ~$1,285 against a $2,500 price. The price rests on visible authorship. The page shows no stacked total and does not argue the price (night-out anchor removed at the founder's pressure test).
- Channel: the persona must be reachable at 100+ qualified Dallas visitors for ~$1,500; under 100 is a channel result, not a price result.
- Food partner not yet signed; "a Dallas kitchen we work with" must be true before the page leaves noindex or receives paid reach. Founder's top cost concern: food plus flowers per night; two food quotes and one florist quote before launch.
- Waiver, contraindication card and delivery-commitment wording need professional review. Insurance quote outstanding.
- Thoughtful Moments: not collision-screened (Firsthand was screened, then rejected by the founder; Undivided rejected as crowded). Collision search, USPTO and domain check before paid spend or print.
- Placeholder photography is generated and atmospheric; replace with documentary photographs from night one before any wider launch.
- Founder note on the page is a draft for the founder's edit. Cue card copy on the page is a shape; the twelve-card set is a build task.

**Decisions and notes:**
- Source material: docs/business-plan.md and docs/business-plan-other-details.md (converted from the original .docx files).
- Session goal: reach Stage 6 (landing page) for a live USL Academy teaching session. Achieved 2026-09-11.
- Stage 1 reframe adopted: effort is the feature. Done-for-you setup, done-by-you gesture.
- Buyer conversations deferred by user on 2026-09-11; the landing page serves as the first price test. Founder reflection after Stage 1, used in brand and page copy: "Everything else is a function of their wealth, not their care."
- Stage 2 gate: terminal stage 6. Stages 3 to 6 run as the build steps of the planned experiment; Stage 3 is preliminary and no packet calls the price validated before day 30. Founder wants to observe genuine curiosity and interaction with the problem; recorded as secondary signals, the deposit remains the only pass condition.
- Stage 2 decisions: flagship = at-home massage night; tea and dinner available on request. Price not reduced; value added (setup team, done-for-you food via partner, roses and handwritten card, collection and cleanup). His part is exactly one thing: the massage.
- Stage 3 (preliminary): Test before committing. Unit contribution $1,440 to $2,695 per night before founder labour; floor ~$2,100 after labour; no price below $2,000 without a changed format. Founder's top verification: food plus flower cost.
- Stage 4: niche locked to Dallas men 35 to 55 with her birthday or an anniversary inside 60 days; one-off night as primary thesis, occasion-year prepay as runner-up at follow-up; follow-up tea deferred until pass; delivery-commitment guarantee, no outcome promise; paid-traffic readiness Test only; copy register emotional first.
- Stage 5: brand name Thoughtful Moments (Stage 5 proposed Firsthand with a collision check 2026-09-11; founder reverted the same day, see context/decisions.md); Brand Idea undivided attention; promise "She will know it was you."; offer Her Night, Your Hands; lead magnet Tell Us About Her; identity route By hand.
- Stage 6: service-led architecture with an editorial opening, hero direction C (tension-led). Research batch run 2026-09-11 (customer language partly blocked; Dallas category conventions; Stripe Server Action pattern). Language rule: slot is what he holds, booking is the monthly limit, night is the evening. Night-out anchor removed from the price module at the founder's pressure test. Six placeholder images generated with Magnific; three selected and converted to webp in public/images; alternates in public/images/placeholders.
- 2026-09-11, after Stage 6: the founder reversed the Stage 6 no-motion rule so the page carries intimacy through motion, by hand. Motion system built and typechecked (`lib/motion.ts`, `components/motion`); build sequence Sections 1, 2, 4, 5, Prompts 1 to 3, 5 to 8, 10 and the definition of done amended. See context/decisions.md.
- Build stack per CLAUDE.md and context/decisions.md: Next.js App Router, Tailwind 4, shadcn/ui primitives, Stripe Checkout via Server Action, Resend, no database, Vercel Analytics only, noindex during the test.

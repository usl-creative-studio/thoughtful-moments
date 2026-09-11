# thoughtful-moments

Concierge at-home experience kits that let time-poor men make their partner feel genuinely prioritised -- done-for-you setup, done-by-you gesture.

## Stack
Per the USL standard in `ai-agents/shared/tech-stack.md` -- that file is the single
source of truth. If this list and tech-stack.md ever disagree, tech-stack.md wins.

- Framework: Next.js (App Router)
- Language: TypeScript, strict mode
- Styling: Tailwind CSS 4.x
- UI Kit: shadcn/ui
- Icons: Lucide React
- Payments: Stripe (refundable $500 deposit via Checkout)
- Email: Resend
- Database: none for the validation phase -- deposits live in Stripe, notifications go
  by email. Add Supabase per tech-stack.md only if a booking system or portal is needed.
- Deployment: Vercel
- Analytics: Vercel Analytics only (decision 2026-09-11; GA deliberately omitted)

Mount `<Analytics />` from `@vercel/analytics/next` in the root layout. No env var needed.

## Repo Structure
- `/app` -- Next.js app router pages and layouts
- `/components` -- reusable UI components
- `/context` -- session context files (read before every session)
- `/docs` -- business plan and other project documents
- `/usl-build` -- USL build-loop packets (Stages 1-6) and `STATE.md`; the product
  reasoning lives here, the code reasoning lives in `/context`
- `/public` -- static assets (images in .webp preferred)
- `/lib` -- utilities and shared logic

## Environment
- `.env` -- local development (never committed)
- `.env.local.example` -- template showing required variables (committed)
- Staging and production environments managed via Vercel

## Branches
**Ship to staging first, then main. Always.** (USL standard -- see tech-stack.md.)

| Branch | Vercel environment | Rule |
|--------|--------------------|------|
| `main` | Production | Never commit directly. Only receives merges from `staging`. |
| `staging` | Preview | The default working branch. |
| `feature/*` | Preview (per-branch) | Branches off `staging`, merges back into `staging`. |

Ship path: `feature/*` -> `staging` -> `main`. Merging to `staging` deploys a Vercel
preview -- open that URL and confirm the change works there before promoting to `main`.
A change reaching `main` unseen on staging is a process failure even if it works.

## Context System
Before every session, read these files in order:
1. `context/state.md` -- what is built, in progress, and next
2. `context/decisions.md` -- why things are built the way they are
3. `context/conventions.md` -- naming, patterns, project-specific rules
4. `context/people.md` -- who owns what decisions
5. `context/production-checklist.md` -- the go-live gate; consult before any deploy, walk in full before real users

Update `context/state.md` at the end of every session. Nothing ships to real users until every box in `context/production-checklist.md` has evidence or a dated waiver in `context/decisions.md`.

## Working Directory
Project lives at `C:/dev/thoughtful-moments`

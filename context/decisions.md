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

## 2026-09-11 -- Trimmed env set
- AI and scraping keys (Anthropic, OpenAI, OpenRouter, Firecrawl, Exa, Jina) omitted:
  nothing on the validation page calls them. Add back per feature, not by habit.

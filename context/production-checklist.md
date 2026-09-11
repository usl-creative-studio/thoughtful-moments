# Production Checklist — the go-live gate

**Status:** living document · applies to every USL project · **this file is the master copy**
**Sync chain:** this master → project-initializer's `references/production-checklist.md` (seeds every new project) → each project's `context/production-checklist.md` (the working copy that gets walked). When this file changes, re-sync the skill's reference copy.

**What this is:** the checklist any USL build (Onibara, outreach engine, Exelita, quote tools, ...) is checked against **before it goes live to real users**, and again **before it opens beyond the pilot team**. It is the launch-time sibling of the pre-build checkpoint rule (recorded 2026-07-22 in usl-crm).

**How to use it:** each project carries its own copy at `context/production-checklist.md` (project-initializer creates it). Walk every box there, and for each one either attach **evidence** (a test name, a command output, a URL) or record a **conscious waiver in decisions.md** with the reason. An unchecked box with neither is a launch blocker. "It compiles" and "it worked on my machine" are not evidence — every scar cited below came from a project where it compiled.

Project copies carry that project's status, evidence, and outstanding items. **This master stays generic**: scars are recorded here as dated history, never as open items.

Most line items below cite the incident that earned them (largely from Onibara / usl-crm). That is deliberate: a checklist without scars gets skipped.

---

## 1. Access and identity

- [ ] **Auth links tested from a different client than the one that requested them** — open the emailed link in a mail app / other browser, not the requesting browser. *Scar: `{{ .ConfirmationURL }}` PKCE links worked on localhost (same browser) and silently failed for every real user in prod (2026-07-06).*
- [ ] **Emailed one-time links survive scanners.** The link lands on a page that consumes nothing; verification happens via POST. *Scar: M365 SafeLinks prefetched the GET and burned the token before the human clicked (2026-07-06).*
- [ ] **Every auth email template audited** against the shape the app actually handles — including the ones nothing triggers today (recovery, email change, confirm signup). *Scar: an invite template still carried the broken PKCE shape a month after magic-link was fixed; it was routed around, not fixed (usl-crm, 2026-07).*
- [ ] **Redirect/URL allowlists carry the production origin** (Supabase Auth, OAuth callbacks, Resend). *Scar: site_url was right, `uri_allow_list` was localhost-only — links resolved to localhost (2026-07-06).*
- [ ] **Role model written down, including who can destroy data.** Destructive actions gated at BOTH layers: RLS/DB policy AND the server action, with the UI hidden as courtesy only. *Reference model: Onibara's admin-only delete, enforced by `is_admin_of()` policies + `requireAdmin()` (2026-07-08).*
- [ ] **Last-admin guard** — a tenant can never lose its only admin (demote/remove blocked).
- [ ] **One login per human.** No per-venture duplicate accounts. *Scar: duplicate venture-domain accounts cost a data-reassignment migration to unwind (2026-07-14).*

## 2. Tenancy and data isolation (multi-tenant projects)

- [ ] **Isolation proven by a test suite running as a real authenticated user** (anon key + session), not the service role, in CI or on demand. Evidence = the suite name and its count.
- [ ] **`tenant_id` never accepted from the client**; resolved server-side, re-validated against live membership on every request (the usl-crm MCP connector's discipline is the reference implementation).
- [ ] **Composite `(tenant_id, fk)` foreign keys** so the database itself rejects cross-tenant links (the usl-crm composite-FK migration, 2026-07-08, is the pattern).
- [ ] **Append-only tables REVOKE update/delete in their creating migration** — not as a later fix. *Scar: notes/events immutability rested on missing policies while the grant still held UPDATE/DELETE (found 2026-07-08).*
- [ ] **No blanket schema grants.** New tables must not be born writable-by-default with RLS as the only guard. *Scar: `grant ... on all tables ... to authenticated` + default privileges (usl-crm audit, 2026-07).*
- [ ] **Service-role paths inventoried.** Every code path that bypasses RLS is listed, and each one explains what enforces tenancy instead.

## 3. Secrets, config, environment

- [ ] **Every required env var**: set in production, named in `.env.local.example`, and the feature **fails closed** without it. *The model: the MCP connector 401s everything until its vars exist. The anti-pattern: a feature 500s in prod because its API key was never set in Vercel.* *Set is not the same as accepted: a credential can be present, correctly named and still rejected on every call — an org-level Anthropic key 400s until the request also carries `anthropic-workspace-id`. Prove one real call succeeds against each provider; a var that merely exists proves nothing.*
- [ ] **No secrets or real data anywhere in git history** — check history, not the working tree (`git log --all --diff-filter=A -- <path>`, `git cat-file`). *Scar: a real prospect spreadsheet stayed recoverable from an early commit after being untracked — untracking cleans nothing (usl-crm audit, 2026-07).*
- [ ] **Committed fixtures are synthetic.** No real emails, phones, credentials — including "dev" passwords (usl-crm audit, 2026-07).
- [ ] **Deploy-order dependencies written down** where two systems must move together. *The model: "deploy the app FIRST, then push email templates, so no email points at a 404" (2026-07-06).*

## 4. Migrations, CI, tests

- [ ] **Migration versions unique**, and CI rejects duplicates. *Scar: two migrations shared one version number; fresh-apply order was non-deterministic (2026-07-21).*
- [ ] **Migrations apply cleanly to a blank database in CI** — production must not be the first place a migration order is exercised.
- [ ] **CI runs functional tests, not just lint/typecheck/build.** At minimum: the isolation suite and one end-to-end flow.
- [ ] **All suites green, or every red diagnosed in writing** with proof it predates the change (the stash-and-rerun discipline). Known-red suites rot: Onibara carried four for two weeks.
- [ ] **`npm audit` gate green NOW, not at last push.** Advisories publish independently of your commits; the next push can fail on someone else's timeline. *Scar: an advisory landed between pushes and reddened CI untouched (2026-07-20).*

## 5. Money endpoints — every call that costs cash

- [ ] **Inventory exists**: every endpoint that spends money per call (AI, SMS, external APIs), with its model and unit cost. If you cannot list them, you cannot cap them.
- [ ] **Each one is auth-gated AND tenant-gated.** *Scar: the single most expensive AI route checked auth but never tenant membership (usl-crm audit, 2026-07).*
- [ ] **Each one is rate-limited by a limiter that survives horizontal scale** (durable counter, not an in-process Map — the Map's real ceiling is N × warm lambdas).
- [ ] **Each call is recorded**: tenant, user, feature, model, tokens in/out, estimated cost, duration, outcome. This ledger is what every cost dashboard and per-tenant cap later rides on — write it from day one (see the platform-admin blueprint, usl-crm: `docs/platform-admin-blueprint.md`).
- [ ] **A budget alert exists** — even a crude "email me past $X/day" beats discovering spend on the invoice.
- [ ] **Failure paths don't re-bill.** Truncation (`stop_reason`) handled as a typed error; partial failures abort their siblings; long pipelines are resumable or idempotent so a retry doesn't re-pay in full.

## 6. Observability — can you see it break?

- [ ] **Error tracking receives thrown server errors**, verified by a deliberate throw appearing in the tracker.
- [ ] **Structured logs with a request/tenant correlation id** — one request traceable end to end.
- [ ] **External uptime monitor** on the app and critical APIs, from outside your own infra. Rent this (Checkly / BetterStack / UptimeRobot); never build it.
- [ ] **Cron jobs monitored for "did not run"**, not just "ran and errored" — a dead cron logs nothing, which is the whole problem. Heartbeat check on every scheduled job.
- [ ] **Security headers that report have somewhere to report to.** *Scar: CSP shipped Report-Only with no `report-uri` — its own promotion gate ("after prod shows no violations") was unsatisfiable by construction.*
- [ ] **RUM / Web Vitals on** so "it feels slow" arrives with numbers.

## 7. Performance and volume

- [ ] **Every list endpoint capped server-side.** Test it: `?limit=1000000` must return the cap. *Scar: the parameter was honored (usl-crm audit, 2026-07).*
- [ ] **Tested at 10× current data volume** — 1k/10k/100k before any scale claim. *A render-cap decision on a 652-contact list only happened because someone seeded real volume.*
- [ ] **A round-trip budget written down and measured** for the main authenticated render — the usl-crm perf pass proved the cost was architectural round trips, not bundle size.

## 8. Email

- [ ] **SPF/DKIM/DMARC aligned** for the sending domain.
- [ ] **Junk-folder test at the real recipients' provider** — send to the actual inbox types your users have. *Scar: first digests landed in junk at live.com with healthy auth; new-sender reputation (2026-07-05).*
- [ ] **Consistent sending cadence** to warm the domain before volume.
- [ ] **All templates branded and non-PKCE**, generated from a single email shell source (usl-crm: `lib/emails/shell.ts` is the pattern), and re-pushed in the right deploy order (§3).

## 9. Data safety and privacy

- [ ] **Backups on, and a restore actually drilled once** against staging. An untested backup is a hope, not a plan.
- [ ] **Delete and export semantics decided** — hard vs soft vs retention, and how a tenant gets their data out.
- [ ] **Written inventory of data that leaves the system**: what goes to which third party (e.g., transcripts and card images → Anthropic; email → Resend), and where users are told.
- [ ] **PII review of logs** — no personal data in structured logs or error tracker payloads.

## 10. Admin readiness — the go-to-market layer

Full capability map: the platform-admin blueprint (usl-crm: `docs/platform-admin-blueprint.md`). The gate here is the minimum:

- [ ] **A tenant can be provisioned end to end without a developer** — or the script path is documented step-by-step as the deliberate interim.
- [ ] **The platform operator can answer, without writing SQL:** Is it up? Who used it this week? What did AI cost? What broke?
- [ ] **A tenant admin can self-serve**: members (invite/role/remove), core settings, and their own data export.
- [ ] **The superadmin access model is decided** before any cross-tenant screen exists: a platform-level role, never a row in the tenant membership table; read-only by default; every cross-tenant access itself logged.

## 11. Launch mechanics

- [ ] **Release tagged** (one repo went six weeks and a whole milestone before its first tag).
- [ ] **Rollback path known and cheap** — which deploy to re-alias, which migration (if any) blocks rolling back.
- [ ] **Prod smoke test with real auth** after deploy — not "the site loads": sign in, touch the database, exercise the newest surface (the connector acceptance walk re-derived every count in SQL rather than trusting the tool; that is the standard).
- [ ] **Support and incident owner named** — who gets told when it breaks, and where users report it.
- [ ] **context/state.md updated** with what shipped and what was consciously left.

---

## The waiver rule

A box may be skipped only by a dated entry in `decisions.md` naming the risk accepted and the condition that reopens it (model: the "Accepted risks" section of usl-crm's production-readiness plan). A silent skip is not a waiver; it is the next incident.

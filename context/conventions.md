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

## Copy and pricing (from usl-build Stage 4)
- Show the founding rate ($2,500) against the standard rate ($3,500); never show a
  stacked total of component parts -- the price rests on visible authorship.
- The guarantee is a delivery commitment, never an outcome promise.
- Copy register: emotional first.

---
Add project-specific patterns here as they emerge.

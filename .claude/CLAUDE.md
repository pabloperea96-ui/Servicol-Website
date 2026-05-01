# CLAUDE.md — Servicol

This file tells you what this project is, how to work on it, and where
to find detailed information. Read it before writing any code.

---

## What is Servicol?

A real estate agency with 25+ years of experience in Boyacá, Colombia.
Operates in the Duitama–Sogamoso–Paipa corridor. Core services: property
sales, rentals, property management, and new construction projects.

**Product goal:** generate qualified leads via WhatsApp and appointment
scheduling, and showcase the available property portfolio.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 — App Router only |
| Language | TypeScript — no `any`, always type correctly |
| Styles | Tailwind CSS v4 |
| React Compiler | Enabled |
| Package manager | npm |

---

## Reference documents

Before building anything, read the relevant doc first.

| What you need | Where to find it |
|---------------|-----------------|
| Design tokens, colors, typography, spacing, radius, motion | `docs/design-system.md` *(TBD)* |
| Component specs, variants, states, props | `docs/design-system.md` *(TBD)* |
| Responsive behavior and breakpoints | `docs/design-system.md` *(TBD)* |
| Page structure and routes | `docs/PRD.md` |
| Business context and user goals | `docs/context.md` |
| Visual design source of truth | Figma *(link TBD)* |

> When a doc is marked TBD, use the design system HTML files in the
> workspace as temporary reference.

---

## Code conventions

- Component files: PascalCase → `PropertyCard.tsx`
- Hooks: camelCase with `use` prefix → `useProperties.ts`
- Utilities: camelCase → `formatPrice.ts`
- Constants: SCREAMING_SNAKE → `MAX_RESULTS`
- Code and comments in English. UI strings in Spanish.
- Routes stay in Spanish — they are part of the product UX, not the codebase.

---

## Component build order

Atoms → Molecules → Organisms → Pages.
Never build an Organism before its Atoms and Molecules exist.

---

## Hard rules

- App Router only — never Pages Router
- No class components — functions and hooks only
- No colors, fonts, or spacing values outside the design system tokens
- No hardcoded UI strings inside components
- No `!important` in styles
- Every page must be tested on mobile before it is considered done
- If design system and this file contradict each other, the design system wins

## Agents

Before starting any feature, check `.claude/agents/` for the right agent.

| Task | Agent |
|------|-------|
| Planning a feature | `planner.md` |
| Writing or editing code | `builder.md` |
| Reviewing implementation | `reviewer.md` |
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## What is Servicol?

A real estate agency with 25+ years of experience in Boyacá, Colombia (Duitama–Sogamoso–Paipa corridor). The site's job is to generate qualified leads via WhatsApp and appointment scheduling, and showcase the property portfolio.

---

## Commands

```bash
npm run dev      # start dev server (default port 3000)
npm run build    # production build
npm run lint     # ESLint
npm run start    # serve production build
```

To test on a phone on the same LAN: the dev server already allows `192.168.1.4` via `allowedDevOrigins` in `next.config.ts`. Run `npm run dev` and open that IP from the phone.

There is no test runner.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js App Router only (`next.config.ts` sets `reactCompiler: false`) |
| Language | TypeScript — no `any`, always type correctly |
| Styles | Tailwind CSS v4 |
| Icons | `lucide-react` |
| CMS | Sanity (project `yx3xhsjf`, dataset `production`) |
| Package manager | npm |

---

## Reference documents

| What you need | Where |
|---|---|
| Business context and user goals | `docs/context.md` |
| Page structure and routes | `docs/PRD.md` |

---

## Architecture: data flow

All property data comes from Sanity. The flow is always:

1. **GROQ query** — defined in `src/lib/queries.ts`, exported as named constants
2. **Sanity client** — `src/sanity/lib/client.ts` (CDN enabled, `apiVersion: 2024-01-01`)
3. **Type + transform** — `src/lib/sanity-mappers.ts` defines `SanityProperty`, `SiteSettings`, and mapper functions (`toCardProps`, `toAdvisor`, `toImageUrls`, `mapZone`, `mapPropertyType`)
4. **Page Server Component** — fetches, maps, passes typed props to organism/molecule components

Every page that fetches from Sanity must export `export const revalidate = 60` (ISR, 60s).

The portfolio page fetches **all** available properties server-side and applies `filterProperties()` (`src/lib/filter-properties.ts`) based on URL `searchParams`. Filtering is not done in Sanity — it runs in the server component on the full dataset.

The Sanity Studio is embedded at `/studio/[[...tool]]` via `src/sanity/sanity.config.ts`.

---

## Design system — how to use tokens

Tokens live in `src/tokens/*.json` and are surfaced as CSS custom properties in `src/app/globals.css`. Do not write raw hex values or pixel numbers in components — always use the tokens.

### Colors

Prefer **semantic tokens** over primitives:

```
text-text-primary      text-text-secondary    text-text-muted    text-text-inverse
bg-bg-canvas           bg-bg-surface          bg-bg-subtle       bg-bg-dark
border-border-default  border-border-strong
text-action-cta        bg-action-cta          text-action-error
```

Primitive color utilities (`text-morado`, `bg-niebla`, etc.) are available but only use them when no semantic token fits.

### Typography

Use the **text style classes** from `@layer components` in `globals.css`. These are 1:1 with Figma text styles:

- **Display (Figtree):** `text-display-2xl` `text-display-xl` `text-display-lg` `text-display-md` `text-display-sm`
- **Body (Inter):** `text-body-xl` `text-body-lg` `text-body-md` `text-body-testimonial`
- **Card:** `text-card-title` `text-card-price` `text-card-spec` `text-card-address` `text-card-meta` `text-card-type-eyebrow`
- **Buttons:** `text-button-lg` `text-button-default` `text-button-sm` `text-button-text-link`
- **Forms:** `text-form-label` `text-form-input` `text-form-placeholder` `text-form-helper` `text-form-error`
- **Nav:** `text-nav-link` `text-nav-link-active`
- **Atoms:** `text-badge` `text-pill` `text-pill-active` `text-label-caps` `text-breadcrumb` `text-breadcrumb-active` `text-pagination` `text-pagination-active`

Font families are injected via CSS variables: `var(--font-display)` (Figtree), `var(--font-body)` (Inter), `var(--font-mono)` (Fira Code).

### Spacing & layout

Responsive contextual tokens that change at `md` (768px) and `lg` (1024px):

```
--section-y   --section-x   --card-padding   --card-gap   --nav-height   --content-max
```

Use as: `py-[var(--section-y)]`, `px-[var(--section-x)]`, etc.

### Motion

```
--duration-fast (120ms)  --duration-base (200ms)  --duration-slow (400ms)
--ease-out  --ease-in  --ease-in-out
```

### Special CSS utilities

- `.hero-pattern` — grid background for the Hero section
- `.hide-scrollbar` — hides scrollbar cross-browser
- `.hero-bg` — Ken Burns animation (respects `prefers-reduced-motion`)
- `@keyframes hero-word-exit` / `hero-word-enter` — headline word transition

---

## Sanity schemas

Defined in `src/sanity/schemas/`. Key document types:

**`property`** — core document. Fields of note:
- `code`: format `SVC-[AP|CA|LO|LT|FI]-[YY]-[SEQ]` (regex-validated)
- `zone`: `duitama-centro | duitama-norte | duitama-sur | paipa | tibasosa | santa-rosa`
- `status`: `disponible | arrendado | vendido | retirado` — only `disponible + published == true` records appear on the site
- `published` / `featured`: booleans that gate visibility
- `advisor`: reference to `advisor` document (name, role, whatsapp, photo)

**`advisor`** — team member / agent  
**`project`** — new-construction projects  
**`testimonial`** — client testimonials  
**`siteSettings`** — singleton with WhatsApp number, address, hours, social links

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

Atoms → Molecules → Organisms → Pages. Never build an Organism before its Atoms and Molecules exist.

---

## Hard rules

- App Router only — never Pages Router
- No class components — functions and hooks only
- No colors, fonts, or spacing values outside the design system tokens
- No hardcoded UI strings inside components
- No `!important` in styles
- Every page must be tested on mobile before it is considered done
- All Sanity-fetching pages must export `revalidate = 60`

---

## Agents

Before starting any feature, check `.claude/agents/` for the right agent.

| Task | Agent |
|------|-------|
| Planning a feature | `planner.md` |
| Writing or editing code | `builder.md` |
| Reviewing implementation | `reviewer.md` |

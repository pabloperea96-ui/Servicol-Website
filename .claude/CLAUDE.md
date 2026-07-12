# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## What is Servicol?

A real estate agency with 25+ years of experience in Boyacá, Colombia (Duitama–Sogamoso–Paipa corridor). The site's job is to generate qualified leads via WhatsApp and appointment scheduling, and showcase the property portfolio.

---

## Commands

```bash
pnpm dev      # start dev server (default port 3000)
pnpm build    # production build
pnpm lint     # ESLint
pnpm start    # serve production build
pnpm exec sanity typegen generate   # regenerate TypeScript types from Sanity schema
```

The repo migrated from npm to pnpm (2026-07). `packageManager` is pinned in `package.json`; `pnpm.onlyBuiltDependencies` approves the postinstall scripts pnpm 10 blocks by default (esbuild, sharp, unrs-resolver) — extend that list if a new native dependency fails to build.

To test on a phone on the same LAN: the dev server already allows `192.168.0.29` via `allowedDevOrigins` in `next.config.ts`. Run `pnpm dev` and open that IP from the phone. Update the IP in `next.config.ts` if your LAN address differs.

There is no test runner. `/test-tap` is a throwaway page for verifying touch events on iPhone — not linked from anywhere.

Note: Next.js 16's `NextConfig` type no longer accepts an `eslint` option (e.g. `ignoreDuringBuilds`) — fix lint errors instead of trying to suppress them in `next.config.ts`.

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js App Router only (`next.config.ts` sets `reactCompiler: false`) |
| Language | TypeScript — no `any`, always type correctly |
| Styles | Tailwind CSS v4 |
| Icons | `lucide-react` |
| CMS | Sanity (project `yx3xhsjf`, dataset `production`) |
| Package manager | pnpm (migrated from npm 2026-07; lockfile `pnpm-lock.yaml`) |

---

## Reference documents

| What you need | Where |
|---|---|
| Business context and user goals | `docs/context.md` |
| Page structure and routes | `docs/PRD.md` |
| History of notable changes | `docs/CHANGELOG.md` |

---

## Architecture: data flow

All property data comes from Sanity. The flow is always:

1. **GROQ query** — defined in `src/lib/queries.ts`, exported as named constants
2. **Sanity client** — `src/sanity/lib/client.ts` (CDN enabled, `apiVersion: 2024-01-01`)
3. **Type + transform** — `src/lib/sanity-mappers.ts` defines `SanityProperty`, `SiteSettings`, `MediaItem`, and mapper functions (`toCardProps`, `toAdvisor`, `toMediaItems`, `toTeamCard`, `toTestimonialCard`, `mapZone`, `mapPropertyType`)
4. **Page Server Component** — fetches, maps, passes typed props to organism/molecule components

Despite its name, `src/lib/mock-properties.ts` is still the home of the shared `Advisor` and `Property` types that `sanity-mappers.ts` and some components import — don't delete it as "dead mock data" without moving those types first.

Every page that fetches from Sanity must export `export const revalidate = 60` (ISR, 60s).

The portfolio page fetches **all** available properties server-side and applies `filterProperties()` (`src/lib/filter-properties.ts`) based on URL `searchParams`. Filtering is not done in Sanity — it runs in the server component on the full dataset. `ITEMS_PER_PAGE = 8` (constant in `filter-properties.ts`). Pagination uses the `pagina` URL param; `filterProperties()` returns both the paginated `items` slice and the full `allItems` array (used by the mobile layout to render all results at once rather than paginating).

The portfolio page uses **dual layout rendering**: `hidden md:block` for desktop (paginated `PropertyGrid`) and `md:hidden` for mobile (`MobilePropertyList` with the full unsliced dataset). Both are rendered server-side; CSS hides one at each breakpoint.

Sanity image URLs are built via `src/sanity/lib/image.ts` (wraps `@sanity/image-url`). Prefer this helper over raw `asset->url` when you need resizing or format options.

The property gallery is **mixed media**: `toMediaItems()` returns a `MediaItem[]` discriminated union (`mediaType: 'image' | 'video'`). Video items carry a file URL, an optional thumbnail, and an optional caption. Any component rendering the gallery must handle both variants.

The Sanity Studio is embedded at `/studio/[[...tool]]` via `src/sanity/sanity.config.ts`.

### NavigationWrapper pattern

Pages never import `Navigation` directly. Always use `NavigationWrapper` (`src/components/organisms/NavigationWrapper.tsx`) — it is an async Server Component that fetches `siteSettings` to resolve the WhatsApp URL, then renders `Navigation`. Pass `transparent` when needed (e.g. Hero pages).

### Suspense requirement for filter components

`FilterPanel`, `SortSelect`, `CategoryBar`, `FilterCountPill`, `ActiveFiltersBar`, and `MobileFilterDrawer` are Client Components that call `useSearchParams()`. They must always be wrapped in `<Suspense>` when used inside a Server Component, or Next.js will throw at build time.

### Other lib utilities

- `src/lib/parseMapEmbed.ts` — `parseMapSrc(embedHtml)` extracts the `src` URL from a raw Google Maps `<iframe>` embed string (stored in Sanity).
- `src/lib/useFilterCount.ts` — `useFilterCount()` counts how many URL filter params are active; used by `FilterCountPill` to show the badge number.

### Property detail page (`/portafolio/[slug]`)

Uses `generateStaticParams()` to pre-build all published slugs at deploy time (via `ALL_SLUGS_QUERY`). Falls through to `notFound()` if a slug is missing or the property is not `disponible + published`.

### API route: `/api/contacto`

The only API route. `POST src/app/api/contacto/route.ts` receives the contact form payload and sends an email via Resend. It is called from `src/app/contacto/ContactoForm.tsx` with `fetch('/api/contacto')`.

**Gotcha:** instantiate `new Resend(...)` *inside* the handler, never at module scope — module-scope instantiation reads the env var at build time and breaks the Vercel build when the key isn't available.

### Environment variables

- `NEXT_PUBLIC_BASE_URL` — used in `layout.tsx` as `metadataBase` (falls back to `https://servicolinmobiliaria.com`). Set in `.env.local` if you need accurate OG/sitemap URLs locally.
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL` — used only by `/api/contacto`.

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

Responsive contextual tokens (change at `md` 768px and `xl` 1440px — `xl` is the desktop breakpoint for this project, not `lg`):

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
- `price`: validated `min(100000)` — minimum $100.000 COP
- `gallery`: array of images **and** `videoItem` objects (video file + optional thumbnail + caption)

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

## SEO layer

Each page exports its own `metadata` object (`title`, `description`). The root layout (`src/app/layout.tsx`) sets global defaults. Structured data (JSON-LD) is injected inline via `<script type="application/ld+json">` in page Server Components — do not use a third-party library for this.

`src/app/sitemap.ts` generates the XML sitemap dynamically — it fetches all published property slugs from Sanity at build/revalidate time.

---

## Conversion rules (WhatsApp CTAs)

The North Star metric is WhatsApp conversations initiated. These rules are non-negotiable:

- The WhatsApp button must be **always visible**: floating on mobile, in the nav and property detail on desktop.
- Every property detail page must have a WhatsApp CTA **above the fold**.
- The advisor assigned to a property must appear in the detail with a direct link to their own WhatsApp number (built in `toAdvisor()` in `sanity-mappers.ts`).
- The contact form (`/contacto`) posts to `/api/contacto`, which emails the lead via Resend. All other CTAs remain direct `wa.me/` links — do not add more backend form handlers without discussing it first.

---

## Hard rules

- App Router only — never Pages Router
- No class components — functions and hooks only
- No colors, fonts, or spacing values outside the design system tokens
- No hardcoded UI strings inside components
- No `!important` in styles
- Every page must be tested on mobile before it is considered done
- All Sanity-fetching pages must export `revalidate = 60`
- Client components go in the route directory (e.g., `src/app/contacto/ContactoForm.tsx`) or in `components/` — never promoted to Server Components without adding `"use client"` to that file only

---

## Agents

Before starting any feature, check `.claude/agents/` for the right agent.

| Task | Agent |
|------|-------|
| Planning a feature | `planner.md` |
| Writing or editing code | `builder.md` |
| Reviewing implementation | `reviewer.md` |

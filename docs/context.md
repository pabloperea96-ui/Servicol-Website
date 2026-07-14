# context.md — Servicol

Business and product context for anyone building on this codebase.
This file answers the "why" behind every decision.

---

## The business

Servicol Inmobiliaria (full name: Servicol Ltda.) was founded in 1999 in
Duitama, Boyacá, Colombia. It operates in the Duitama–Sogamoso–Paipa
corridor and positions itself as the region's all-in-one real estate agency:
sales, rentals, property management, and proprietary new construction
projects — all under one roof.

**Name origin:** Servicios de Colombia.

**Key stats:**
- Founded: 1999
- Years in market: 25+
- Properties managed: 800+
- Geographic focus: 100% Boyacá

**Timeline:**
- 1999 — Founded in Duitama as an integral real estate services company
- 2005 — Portfolio expanded to Sogamoso and Paipa
- 2012 — Strategic alliance with own construction firm; first new-build projects
- 2020 — First digital presence; WhatsApp as primary contact channel
- 2026 — Full website redesign (this project)

---

## Services

| Service | Description |
|---------|-------------|
| Property sales | Advisory for buyers and sellers. Valuation, listing, visits, legal accompaniment through to deed signing |
| Rentals | Tenant screening, lease contracts, monthly collection, maintenance coordination |
| Property management | Full property management for owners with multiple properties or those living outside the city |

---

## The product

This is a complete redesign of servicolinmobiliaria.com. The existing site
has visual inconsistencies, navigation problems, and fails at its primary
job: converting visits into qualified contacts.

**North Star metric:** number of WhatsApp conversations started from the site.

**Secondary goals:**
- Show the full catalog (sales + rentals)
- Build institutional credibility (25+ years, team, testimonials)
- Capture leads via contact form and appointment scheduling

---

## User profiles

### 1. First-time homebuyer
Family looking for their first property to buy. Price-sensitive.
Needs clear information, trust signals, and easy contact with an advisor.
Primary action: WhatsApp or appointment scheduling.

### 2. Real estate investor
Looking for rental yield or appreciation opportunities. Wants complete
specs, price, location, and quick access to an advisor. Values
efficiency over hand-holding.

### 3. Rental tenant
Looking for a place to live. Filters by price, area, and location.
Primary action: WhatsApp to ask about availability.

### 4. Property owner
Wants to list their property for sale or rent, or hand over management
to Servicol. Needs to understand the service and trust the company
before making contact.

---

## Conversion rules

These are non-negotiable product decisions, not design preferences:

- The WhatsApp button is **always visible** — floating on mobile,
  in the nav and property detail on desktop.
- Every property detail page must have a WhatsApp CTA **above the fold**.
- Every property detail page must show the assigned advisor with a
  direct link to their personal WhatsApp.
- Forms have a **maximum of 5 fields**. Always include a success state
  after submission.
- The WhatsApp floating button opens `wa.me/[number]` with a pre-filled
  message: "Hola, me interesa una propiedad. ¿Me pueden ayudar?"

---

## Property catalog

**Property types:** Apartments · Houses · Commercial spaces · Lots · Farms

**Operations:** For sale · For rent

**Coverage zones:**
- Duitama (Centro, Norte, other neighborhoods)
- Sogamoso
- Paipa
- Santa Rosa de Viterbo
- Surrounding rural areas

**Filter dimensions:** type · operation · zone · price range · area range ·
bedrooms · extras (parking, gated community, garage)

---

## Contact information

| Channel | Detail |
|---------|--------|
| Primary contact | WhatsApp Business |
| Office address | Cr. 15 #14-69 Of. 405, Duitama, Boyacá |
| Business hours | Mon–Fri 8am–6pm · Sat 9am–1pm |
| Social media | Instagram · Facebook · WhatsApp |

---

## Decisions already made

These are closed decisions. Do not reopen without a specific reason.

- **Brand color:** Dark purple `#521E5B`. Chosen as a differentiator
  in the Colombian real estate market. Passes WCAG AAA.
- **Typography:** Figtree (display) + Inter (body). No other fonts.
- **Primary contact channel:** WhatsApp over phone calls or email.
- **Routes in Spanish:** `/portafolio`, `/nosotros`, `/contacto` — they
  are part of the product UX, not the codebase.
- **New construction section (revised 2026-07):** The original decision to
  exclude `/proyectos` was reversed. New construction projects have their own
  Sanity schema (`project`) and two routes: `/proyectos` (listing) and
  `/proyectos/[slug]` (detail with construction progress, unit types and
  advisor contact). Completed projects can still be listed as regular
  properties in the portfolio.
- **No backend yet:** This phase is frontend only. No CMS or database
  decisions have been made.

---

## What this file is not

This file does not contain page-by-page feature specs — that lives in `PRD.md`.
This file does not contain design tokens or component rules — that lives in
`docs/design-system.md`.
This file does not contain coding rules — that lives in `.claude/CLAUDE.md`.
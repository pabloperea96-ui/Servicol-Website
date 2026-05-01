# PRD.md — Servicol

Product Requirements Document. Defines what to build, page by page.
Read `context.md` first for business and user context.
Read `servicol_design_system_v1_1.html` for design tokens and component specs.

---

## Scope

This PRD covers the full stack of servicolinmobiliaria.com:

- 6 frontend pages plus global components (Next.js 15, App Router)
- Sanity CMS as the content layer for all catalog data
- ISR rendering strategy with Sanity webhooks for revalidation

**What is NOT in scope:**

- Custom backend or REST API beyond Sanity's hosted API
- User authentication for visitors
- Payment or transaction flows
- New construction projects (`/proyectos`). Company decision: completed
  projects are listed as regular properties in the portfolio using the
  standard `property` schema.

---

## Content layer — Sanity schemas

All dynamic content is fetched from Sanity. These schemas must be defined
before any page that depends on them is built.

### `property`

Represents a single listing in the catalog.

| Field            | Type                  | Notes                                                                    |
| ---------------- | --------------------- | ------------------------------------------------------------------------ |
| `title`          | string                | Required                                                                 |
| `slug`           | slug                  | Source: title. Used in `/portafolio/[slug]`                              |
| `status`         | string (enum)         | `activo` \| `archivado`. Default: `activo`                               |
| `operation`      | string (enum)         | `venta` \| `arriendo`                                                    |
| `propertyType`   | string (enum)         | `apartamento` \| `casa` \| `local` \| `lote` \| `finca`                 |
| `zone`           | string (enum)         | `duitama-centro` \| `duitama-norte` \| `paipa` \| `santa-rosa` \| `sogamoso` |
| `price`          | number                | In COP                                                                   |
| `negotiable`     | boolean               | Shows "Negociable" label on detail page                                  |
| `area`           | number                | In m²                                                                    |
| `bedrooms`       | number                | 0 for commercial/lots                                                    |
| `bathrooms`      | number                | 0 for commercial/lots                                                    |
| `parking`        | boolean               |                                                                          |
| `floor`          | number                | Optional                                                                 |
| `stratum`        | number                | 1–6. Optional                                                            |
| `gatedCommunity` | boolean               |                                                                          |
| `garage`         | boolean               |                                                                          |
| `images`         | array of image        | Min 6 required for publication. First image = cover                      |
| `description`    | text                  | Free text                                                                |
| `amenities`      | array of string       | e.g. "Cocina integral", "Zona de lavandería"                             |
| `address`        | string                | Street address for map embed                                             |
| `coordinates`    | object (lat/lng)      | For Google Maps embed                                                    |
| `propertyCode`   | string                | Internal reference code                                                  |
| `advisor`        | reference → `advisor` | Required                                                                 |
| `featured`       | boolean               | If true, eligible for Home featured section                              |
| `publishedAt`    | datetime              | Controls "newest" sort                                                   |

### `advisor`

Represents a Servicol team member who can be assigned to listings.

| Field      | Type    | Notes                                             |
| ---------- | ------- | ------------------------------------------------- |
| `name`     | string  | Required                                          |
| `role`     | string  | e.g. "Asesora comercial"                          |
| `photo`    | image   | Required                                          |
| `whatsapp` | string  | Phone number without +. e.g. "573001234567"       |
| `email`    | string  | Optional. For admin staff                         |
| `active`   | boolean | Inactive advisors are hidden from new assignments |

### `testimonial`

| Field        | Type    | Notes                  |
| ------------ | ------- | ---------------------- |
| `quote`      | text    | Required               |
| `clientName` | string  | Required               |
| `city`       | string  |                        |
| `stars`      | number  | 1–5                    |
| `featured`   | boolean | If true, shown on Home |

### `siteSettings`

Singleton document. One document only.

| Field             | Type   | Notes                                                                              |
| ----------------- | ------ | ---------------------------------------------------------------------------------- |
| `whatsappNumber`  | string | Global fallback number. e.g. "573001234567"                                        |
| `whatsappMessage` | string | Pre-filled message. Default: "Hola, me interesa una propiedad. ¿Me pueden ayudar?" |
| `officeAddress`   | string |                                                                                    |
| `businessHours`   | string |                                                                                    |
| `email`           | string |                                                                                    |
| `instagramUrl`    | string |                                                                                    |
| `facebookUrl`     | string |                                                                                    |

---

## Rendering strategy

| Page type            | Strategy     | Revalidation                           |
| -------------------- | ------------ | -------------------------------------- |
| `/` Home             | ISR          | On `property` or `testimonial` publish |
| `/portafolio`        | ISR          | On any `property` change               |
| `/portafolio/[slug]` | ISR per slug | On that specific `property` change     |
| `/nosotros`          | Static       | On deploy only                         |
| `/servicios`         | Static       | On deploy only                         |
| `/contacto`          | Static       | On deploy only                         |

Sanity webhooks trigger `revalidatePath` or `revalidateTag` via a Next.js
route handler at `/api/revalidate`. Revalidation target: under 60 seconds
from Sanity publish to live page.

---

## Global components

These components appear on every page. Build them before any page.

### Navigation

- Sticky header — stays visible on scroll
- Logo left · Nav links center · WhatsApp button + "Agendar cita" CTA right
- Nav links: Portafolio · Servicios · Nosotros · Contacto
- WhatsApp number pulled from `siteSettings` in Sanity
- Mobile: hamburger icon opens a full drawer with all links
- WhatsApp button always visible on mobile nav

### Footer

- Dark background (`#111111`)
- 4 columns on desktop / 2 on tablet / 1 on mobile
- Col 1: Logo + tagline + social icons (Instagram · Facebook · WhatsApp)
- Col 2: Portfolio links (by type and operation)
- Col 3: Company links (Nosotros · Servicios · Contacto)
- Col 4: Direct contact (address · hours · email) — pulled from `siteSettings`
- Bottom bar: copyright + privacy policy + terms

### WhatsApp floating button

- Fixed position, bottom-right corner, all pages
- 44px diameter · WhatsApp green · soft shadow
- Number and message pulled from `siteSettings` in Sanity
- On click: opens `wa.me/[number]?text=[message]`
- On desktop: shows tooltip on hover with "Escríbenos por WhatsApp"

---

## Pages

---

### 1. Home `/`

**Goal:** capture search intent and route the visitor to the catalog
or to WhatsApp. Conversion priority: Search → Browse → Contact.

**Data fetched from Sanity:**

- 3 `property` documents where `featured: true` and `status: "activo"`
- 3 `testimonial` documents where `featured: true`
- `siteSettings` for WhatsApp number and message

**Sections in order:**

**Hero**

- Full-width background image with dark overlay
- H1: "Tu próxima propiedad en Boyacá está aquí"
- Badge: "25 años en Boyacá · Inmobiliaria total"
- Search bar embedded in hero (see SearchBar component)

**SearchBar** ← most critical responsive component

- 3 selects: property type · operation (sale/rental) · zone
- Search button routes to `/portafolio` with filters pre-applied as query params
- Desktop: single row · Mobile: stacked full-width columns

**Quick category browse**

- 4 cards: Apartamentos · Casas · Locales/Oficinas · Lotes/Fincas
- Each routes to `/portafolio?tipo=[type]`

**Featured properties**

- Section label + heading + "Ver todo el portafolio →" text link
- Grid of 3 PropertyCards sourced from Sanity (`featured: true`)
- Each card has WhatsApp CTA button using the advisor's number

**Stats strip**

- 4 stats: 25+ años · +800 propiedades · 4 tipos de inmueble · 100% Boyacá
- Hardcoded — not managed in Sanity

**Testimonials**

- 3 TestimonialCards sourced from Sanity (`featured: true`)
- Stars + quote + client name + city

**Final CTA section**

- Dark background full-width
- Heading + subheading + WhatsApp (morado-oscuro) + "Agendar cita" (outline)
- WhatsApp number from `siteSettings`

---

### 2. Portfolio `/portafolio`

**Goal:** help the visitor find the right property using filters.

**Data fetched from Sanity:**

- All `property` documents where `status: "activo"`
- Filters applied client-side from query params

**Sections in order:**

**Page header**

- Breadcrumb: Inicio / Portafolio
- H1: "Portafolio de propiedades"

**Operation tabs**

- Tabs: Todo · En venta · En arriendo
- Switching tabs updates the `operacion` query param without page reload

**Category pills**

- Pills: Todos los tipos · Apartamentos · Casas · Locales / Oficinas · Lotes · Fincas
- Clicking updates the `tipo` query param

**Layout: sidebar + results grid**

- Desktop: fixed 220px filter sidebar left + 4-column card grid right
- Tablet: fixed 220px filter sidebar left + 2-column card grid right
- Mobile: filter button opens a bottom sheet drawer · 1-column grid · infinite scroll

**Filter panel — dimensions:**

- Price range (slider, min/max)
- Bedrooms (checkboxes: 1 / 2 / 3 / 4+)
- Area in m² (slider, min/max)
- Zone (checkboxes: Duitama Centro · Duitama Norte · Paipa · Santa Rosa · Sogamoso)
- Extras (checkboxes: Parqueadero · Conjunto cerrado · Garaje)
- "Aplicar filtros" button + "Limpiar filtros" text link

**Results area**

- Result count: "X propiedades encontradas"
- Sort dropdown: relevance / price asc / price desc / newest (`publishedAt` desc)
- PropertyCard grid
- Desktop + tablet: pagination · Mobile: infinite scroll (Intersection Observer)

---

### 3. Property detail `/portafolio/[slug]`

**Goal:** convert the visitor. WhatsApp CTA must be visible without
scrolling. Gallery + specs + contact are the three pillars.

**Data fetched from Sanity:**

- Single `property` by slug where `status: "activo"`
- 3 related `property` documents (same `propertyType` and `zone`, excluding current)
- Return 404 if slug not found or `status: "archivado"`

**Layout:** 3/5 content left · 2/5 sticky sidebar right

**Left column — sections in order:**

**Header**

- Breadcrumb: Inicio / Portafolio / [type] / [name]
- Operation badge (VENTA / ARRIENDO) + property title + address

**Gallery**

- Main photo (2/3 width) + 3 thumbnails (1/3 width)
- "Ver galería completa" button opens full-screen lightbox
- Mobile: horizontal scroll with snap
- All images served from Sanity's image pipeline with responsive sizes

**Specs grid**

- 2×2 or 2×3 grid: area · bedrooms · bathrooms · parking · floor · stratum
- Fields with no value are hidden (e.g. floor for lots)

**Description**

- Free text from `property.description`

**Amenities**

- List from `property.amenities` array
- Section hidden if array is empty

**Location**

- Embedded Google Map using `property.coordinates`

**Related properties**

- 3 PropertyCards from the related query

**Right column (sticky sidebar):**

**Price box** ← above the fold requirement

- Price formatted in COP + "Negociable" label if `property.negotiable: true`
- WhatsApp CTA button (primary, full width) — uses `advisor.whatsapp`
  with pre-filled message: "Hola, me interesa la propiedad [title] ([propertyCode])"
- "Solicitar más info" button (secondary)
- "Agendar visita" button (outline)
- Property code from `property.propertyCode`

**Advisor box**

- `advisor.photo` + `advisor.name` + `advisor.role`
- Direct WhatsApp link to `advisor.whatsapp`

**Share box**

- Share via WhatsApp + copy link

---

### 4. About `/nosotros`

**Goal:** build trust and humanize the brand through history, values,
and team. Reinforce 25 years in the market.

**Data fetched from Sanity:**

- All `advisor` documents where `active: true`
- All other content is hardcoded in the page

**Sections in order:**

**Hero**

- H1: "25 años construyendo confianza en Boyacá"
- Brand description paragraph
- Office / team photo right side

**Stats strip**

- 4 stats: 1999 (founded) · 25+ años · +800 propiedades · 100% Boyacá

**Values**

- 3-column grid: Confianza · Experiencia · Respaldo
- Icon + title + description per card

**Timeline**

- Vertical line with year markers
- 1999 · 2005 · 2012 · 2020 · 2026
- Short description per milestone

**Team**

- 4-column grid of TeamCards sourced from Sanity advisors
- Each card: `advisor.photo` + `advisor.name` + `advisor.role`
  - WhatsApp button using `advisor.whatsapp` (or email if no WhatsApp)

---

### 5. Services `/servicios`

**Goal:** explain what Servicol does and route the visitor to contact.

**Data fetched from Sanity:** None. Fully static page.

**Sections in order:**

**Page header**

- H1: "¿Qué hace Servicol por ti?"
- Subheading: "Más que comprar y vender. Somos tu aliado integral en finca raíz."

**Service cards grid — 2×2**

- Venta de inmuebles: valuation · listing · visits · legal accompaniment
- Arriendo de inmuebles: tenant screening · contract · collection · maintenance
- Administración de inmuebles: supervision · utility payments · monthly reports
- Avalúos comerciales: technical visit · certified written report · valid for legal processes
- Each card: icon + title + description + feature list + individual CTA

**Final CTA section**

- "¿Tienes una propiedad para consignar?"
- 2 buttons: WhatsApp (from `siteSettings`) + contact form link

---

### 6. Contact `/contacto`

**Goal:** ensure the visitor leaves with a contact initiated. No visitor
should leave this page without making contact.

**Data fetched from Sanity:**

- `siteSettings` for WhatsApp number, address, hours, email, and social links

**Layout:** 3/5 form left · 2/5 info right

**Left column:**

**Contact form**

- Max 5 fields:
  1. Full name (required)
  2. WhatsApp / Phone (required)
  3. Email (optional)
  4. Reason for contact (required, select): Comprar · Arrendar · Vender mi inmueble · Arrendar mi propiedad · Avalúo · Otro
  5. Message (optional, textarea)
- Submit button: "Enviar mensaje"
- On submit: opens WhatsApp with pre-filled message using global number from `siteSettings`
- Privacy note below button
- Success state: confirmation message after submit (no page reload)

**Right column:**

**WhatsApp highlight box**

- Prominent WhatsApp button with "Respondemos al instante" copy
- Number from `siteSettings`

**Contact info**

- Address, hours, and email from `siteSettings`

**Map**

- Embedded Google Map showing office location

**Social media**

- Instagram · Facebook buttons (outline style) — URLs from `siteSettings`

---

## Acceptance criteria — applies to all pages

- WhatsApp floating button visible on every page
- All pages render correctly at 390px, 768px, and 1440px
- All interactive elements have hover, focus, and active states
- All forms have a visible success state after submission
- All forms validate required fields before submission
- No page takes more than 3 seconds to load on a 4G connection
- Every page passes WCAG AA contrast minimum
- Navigation active state matches current page
- All property images have descriptive alt text
- Archived properties return 404, never appear in listings
- ISR revalidation confirmed working: publish in Sanity → page updates within 60s
- Sanity webhook endpoint `/api/revalidate` secured with a secret token
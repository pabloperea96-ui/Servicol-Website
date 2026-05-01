# SERVICOL — Project Instructions

**Versión:** 1.1 · **Fecha:** Abril 2026  
**Para uso en:** Claude Projects · Claude Code · Cursor

-----

## 1. ¿Qué es este proyecto?

Rediseño completo del sitio web de **Servicol Inmobiliaria**, una inmobiliaria con más de 25 años de operación en el corredor **Duitama – Sogamoso – Paipa, Boyacá, Colombia**.

El sitio actual (`servicolinmobiliaria.com`) tiene inconsistencias visuales, problemas de navegación y no cumple su función principal: **convertir visitas en contactos cualificados**.

-----

## 2. Objetivo del producto

Generar leads cualificados via WhatsApp y agendamiento de visitas, y exhibir el portafolio completo de propiedades disponibles para venta y arriendo.

**North Star:** número de conversaciones de WhatsApp iniciadas desde el sitio.

**Objetivos secundarios:**

- Mostrar el catálogo completo (venta + arriendo)
- Presentar proyectos nuevos / sobre planos
- Construir credibilidad institucional (25+ años, equipo, testimonios)
- Capturar leads vía formulario de contacto y agendamiento de visita

-----

## 3. Negocio

|Dato                       |Valor                                                              |
|---------------------------|-------------------------------------------------------------------|
|Nombre                     |Servicol Inmobiliaria                                              |
|Origen del nombre          |Servicios de Colombia                                              |
|Años en el mercado         |25+                                                                |
|Zona de operación          |Duitama · Sogamoso · Paipa (Boyacá)                                |
|Servicios                  |Venta · Arriendo · Administración de propiedades · Proyectos nuevos|
|Canal de contacto principal|WhatsApp Business                                                  |
|Portafolio                 |Apartamentos · Casas · Locales · Lotes · Fincas · Proyectos        |

**Perfiles de cliente:**

- Familias comprando primera vivienda
- Inversionistas en finca raíz
- Arrendatarios buscando inmueble
- Propietarios que quieren consignar su inmueble

-----

## 4. Tech Stack

|Capa           |Decisión                              |
|---------------|--------------------------------------|
|Framework      |Next.js 15 — **App Router únicamente**|
|Lenguaje       |TypeScript — sin `any`, siempre tipado|
|Estilos        |Tailwind CSS v4                       |
|CMS            |Sanity (schemas definidos)            |
|React Compiler |Habilitado                            |
|Package manager|npm                                   |

**Reglas de código:**

- App Router siempre. Nunca Pages Router.
- Solo componentes funcionales con hooks. Nunca class components.
- Ningún color, fuente o espacio fuera del design system.
- No strings hardcodeados en componentes (UI en español, código en inglés).
- Sin `!important` en estilos.
- Toda página aprobada en mobile antes de darse por terminada.
- Tipos de Sanity generados con `sanity typegen generate` — nunca escritos a mano.

-----

## 5. Estructura del proyecto

```
servicol/
├── .claude/
│   ├── CLAUDE.md
│   ├── settings.json
│   └── agents/
│       ├── planner.md
│       ├── builder.md
│       └── reviewer.md
├── docs/
│   ├── PRD.md
│   ├── context.md
│   └── CHANGELOG.md
├── src/
│   ├── app/               ← App Router (rutas en español)
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   └── organisms/
│   ├── lib/
│   └── types/
├── public/
├── .env.local
├── .gitignore
├── next.config.js
└── README.md
```

**Convención de nombres:**

- Componentes: `PascalCase` → `PropertyCard.tsx`
- Hooks: `camelCase` con prefijo `use` → `useProperties.ts`
- Utilidades: `camelCase` → `formatPrice.ts`
- Constantes: `SCREAMING_SNAKE` → `MAX_RESULTS`
- Rutas: español (forman parte del UX del producto) → `/portafolio`, `/nosotros`, `/contacto`

-----

## 6. Páginas del sitio

|Ruta                |Descripción                                                                        |
|--------------------|-----------------------------------------------------------------------------------|
|`/`                 |Home — Hero + búsqueda + catálogo destacado + stats + proyectos + testimonios + CTA|
|`/portafolio`       |Catálogo completo con filtros (tipo · operación · zona · precio · área)            |
|`/portafolio/[slug]`|Ficha individual de inmueble                                                       |
|`/proyectos`        |Listado de proyectos nuevos / sobre planos                                         |
|`/proyectos/[slug]` |Detalle de proyecto (renders · avance · tipologías · formulario)                   |
|`/nosotros`         |Historia · stats · valores · timeline · equipo                                     |
|`/servicios`        |4 servicios: venta · arriendo · administración · proyectos                         |
|`/contacto`         |Formulario + WhatsApp + mapa + info de oficina                                     |

-----

## 7. Design System

**Versión actual:** v1.1  
**Archivo de referencia:** `servicol_design_system_v1_1.html` (en el proyecto)

### Tipografía

|Rol               |Familia            |Pesos          |
|------------------|-------------------|---------------|
|Display / headings|**Figtree**        |700 · 800      |
|Body / UI         |**Inter**          |300 · 400 · 500|
|Monoespaciado     |SF Mono / Fira Code|—              |

**Escala tipográfica:**

|Token      |px|
|-----------|--|
|display/2xl|56|
|display/xl |40|
|display/lg |28|
|display/md |22|
|display/sm |18|
|body/lg    |16|
|body/md    |14|
|label      |11|

### Colores — Tokens semánticos

|Token           |Valor                      |
|----------------|---------------------------|
|text/primary    |`#111111`                  |
|text/secondary  |`#444444`                  |
|text/muted      |`#888888`                  |
|text/inverse    |`#FFFFFF`                  |
|bg/canvas       |`#F5F5F3`                  |
|bg/surface      |`#FFFFFF`                  |
|bg/subtle       |`#E8E8E6`                  |
|border/default  |`#CCCCCC`                  |
|border/strong   |`#888888`                  |
|action/primary  |`#111111`                  |
|action/cta      |`#521E5B` ← Morado oscuro  |
|action/cta-light|`#F0DCF5`                  |
|action/error    |`#B42318`                  |

**Color de acción:** Morado oscuro `#521E5B`. Diferenciador en el mercado inmobiliario colombiano. `#F0DCF5` como versión light para fondos y badges.

### Spacing — Base 4px

`4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 64 · 80 · 96`

### Radius

|Token|Valor |
|-----|------|
|none |0px   |
|sm   |4px   |
|md   |8px   |
|lg   |12px  |
|pill |24px  |
|full |9999px|

### Motion

|Token        |Valor              |
|-------------|-------------------|
|duration/fast|120ms              |
|duration/base|200ms              |
|duration/slow|400ms              |
|easing/out   |ease-out (entradas)|
|easing/in    |ease-in (salidas)  |

-----

## 8. CMS — Sanity

Proyecto montado en la cuenta de Servicol. Pablo agregado como Administrador durante desarrollo.

### Schemas definidos

| Schema          | Estado     | Descripción                              |
|-----------------|------------|------------------------------------------|
| `property`      | ✅ Completo | Listado individual del catálogo          |
| `advisor`       | ✅ Completo | Asesores del equipo                      |
| `project`       | ✅ Completo | Proyectos de obra nueva                  |
| `testimonial`   | ✅ Completo | Testimonios de clientes                  |
| `siteSettings`  | ✅ Completo | Singleton con datos globales del sitio   |

### Estrategia de rendering

- ISR con revalidación por webhook de Sanity.
- `revalidatePath` activado desde `/api/revalidate` en cada publicación.
- `revalidate: 60` segundos como fallback en rutas de portafolio y proyectos.

### Decisiones cerradas de CMS

- Tipos TypeScript generados con `sanity typegen generate` — nunca escritos a mano.
- Coordenadas de propiedades almacenadas con offset visual — nunca dirección exacta en el mapa.
- Formularios en esta fase abren `wa.me/{whatsapp}` con datos preformateados — sin backend propio.

-----

## 9. Estructura del archivo Figma

|Página              |Contenido                                                                                                                                      |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
|01 — Cover          |Nombre, versión, fecha, changelog                                                                                                              |
|02 — 🎨 Design Tokens|Variables de Figma — fuente de verdad                                                                                                          |
|03 — ⚛ Atoms        |Button · Input · Badge · Pill · Icon · Avatar · Divider · Stars · Checkbox · Slider · Progress · Tooltip                                       |
|04 — 🧬 Molecules    |Property Card · Project Card · Search Bar · Filter Panel · Stat Block · Testimonial · Team Card · Spec Grid · Gallery · Breadcrumb · Pagination|
|05 — 🏗 Organisms    |Navigation · Footer · Hero · Property Grid · Property Detail · Portafolio Layout · CTA Section · Contact Form · Timeline                       |
|06 — 📄 Desktop      |8 páginas a 1440px                                                                                                                             |
|07 — 📱 Mobile       |8 páginas a 390px                                                                                                                              |
|08 — 💻 Tablet       |Home · Portafolio · Ficha a 768px                                                                                                              |
|09 — 🔄 Flows        |Búsqueda → portafolio → ficha → WhatsApp                                                                                                       |
|10 — 🚧 WIP          |Exploración. Nunca compartir con cliente                                                                                                       |

**Naming conventions en Figma:**

- Variables: `color/text/primary`, `font/family/display` — kebab-case con barras
- Componentes: `Button/Primary/Default`, `Card/Property/Grid` — Title Case con barras
- Frames: `home-desktop-1440`, `portafolio-mobile-390` — kebab + breakpoint + ancho
- Auto Layout en todos los componentes desde el día 1

### Variables — Grupos

```
color/           → text/ · bg/ · border/ · action/
font/family/     → display (Figtree) · body (Inter) · mono (Fira Code)
font/size/       → display-2xl a label
font/weight/     → light (300) a extrabold (800)
spacing/         → section/y · section/x · card/padding · card/gap · nav/height
radius/          → none a full
motion/          → duration/ · easing/
```

-----

## 10. Componentes — Orden de construcción

**Siempre Atoms → Molecules → Organisms → Pages. Nunca al revés.**

### Atoms (construir primero)

Button · Input / Select · Badge · Pill / Tag · Icon · Avatar · Divider · Progress Bar · Checkbox / Radio · Slider · Stars · Tooltip

### Molecules (construir segundo)

Property Card · Project Card · Search Bar · Filter Panel · Stat Block · Testimonial Card · Team Card · Spec Grid · Image Gallery · Breadcrumb · Pagination · Contact Info Row

### Organisms (construir tercero)

Navigation · Footer · Hero Section · Property Grid · Property Detail · Portafolio Layout · CTA Section · Contact Form · Service Card Grid · Timeline

-----

## 11. Breakpoints

|Token Tailwind     |px  |Dispositivo|
|-------------------|----|-----------|
|base (mobile-first)|390 |iPhone 14  |
|`md`               |768 |iPad       |
|`xl`               |1440|Desktop    |

La Search Bar es el componente más crítico responsivo: 1 fila en desktop → columna stacked en mobile.

-----

## 12. Conversión — Reglas de negocio

- El botón de WhatsApp **siempre visible** (flotante en mobile, en nav + ficha en desktop).
- Cada ficha de inmueble debe tener CTA de WhatsApp **above the fold**.
- Formularios: máximo 5 campos. Siempre con success state post-envío.
- La ficha debe mostrar el asesor a cargo con CTA directo a su WhatsApp.
- Los proyectos nuevos deben mostrar el % de avance de obra.

-----

## 13. Reglas de diseño — Hard Rules

- Nunca colores, fuentes o espacios fuera de los tokens del design system.
- Si el design system y otro documento se contradicen, **el design system gana**.
- Todo componente necesita sus estados: default · hover · focus · active · disabled · error · loading.
- Touch targets mínimo 44×44px.
- Contraste WCAG AA como mínimo. AAA para textos principales.
- Sin `!important` en CSS.
- Error states nunca solo con color — siempre acompañados de texto o ícono.
- `prefers-reduced-motion` siempre respetado con fallback sin animación.

-----

## 14. Archivos de referencia del proyecto

|Archivo                           |Descripción                                      |
|----------------------------------|-------------------------------------------------|
|`servicol_wireframes.html`        |Wireframes navegables — 8 páginas con anotaciones|
|`servicol_design_directions.html` |Exploración de direcciones visuales              |
|`servicol_design_system_v1_1.html`|Design system completo v1.1 — fuente de verdad   |

-----

## 15. Estado actual del proyecto

|Entregable                          |Estado      |
|------------------------------------|------------|
|Wireframes navegables (8 páginas)   |✅ Completo  |
|Design system v1.1                  |✅ Completo  |
|Color final elegido (morado oscuro) |✅ Definido  |
|Estructura de archivo Figma         |✅ Definida  |
|Variables Figma construidas         |✅ Completo  |
|Componentes Figma (34 componentes)  |✅ Completo  |
|Schemas Sanity (5 schemas)          |✅ Completo  |
|Documentación (PRD · context)       |✅ Completo  |
|Mockup hi-fi Home                   |⬜ Pendiente |
|Setup Next.js + Tailwind v4         |⬜ Pendiente |
|Implementación                      |⬜ Pendiente |

-----

## 16. Próximos pasos recomendados

1. **Mockup hi-fi del Home** — desktop 1440px primero, luego mobile 390px
2. **Mockup hi-fi Portafolio + Ficha** — las dos páginas de mayor conversión
3. **Setup del repo** — inicializar Next.js 15 + Tailwind v4 + estructura de carpetas
4. **Conectar Sanity** — cliente, tipos generados, ISR + webhooks
5. **Implementación** — Atoms → Molecules → Organisms → Pages

-----

*Este archivo es la fuente de verdad del proyecto. Cualquier decisión que no esté aquí debe documentarse aquí.*
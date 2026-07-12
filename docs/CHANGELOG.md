# Changelog

## 2026-07-12 — Páginas de proyectos nuevos

- Nuevas rutas `/proyectos` (lista) y `/proyectos/[slug]` (detalle), basadas en el
  diseño aprobado en Figma y el schema Sanity `project`.
- Capa de datos: queries GROQ de proyectos (`ALL_PROJECTS_QUERY`,
  `PROJECT_BY_SLUG_QUERY`, `PROJECT_SLUGS_QUERY`, `PROJECT_METADATA_QUERY`,
  `OTHER_PROJECTS_QUERY`), tipo `SanityProject` y mappers `toProjectCardProps` /
  `toProjectMediaItems`.
- Componentes nuevos: `UnitTypeCard` (tipologías) y `ProjectProgress` (avance de
  obra con fechas).
- `Badge` soporta estados de proyecto (`en-planos`, `en-construccion`, `entregado`).
- `PriceInfoBar` acepta overrides (`priceLabel`, `meta`, `ctaLabel`) para fichas de
  proyecto sin afectar la página de propiedades.
- `ProgressBar` usa el token responsive `--font-size-progress-label` (14px móvil,
  16px desktop) en lugar de 13px fijo.
- Utilidad compartida `formatCOP` / `formatMonthYear` en `src/lib/formatPrice.ts`.
- Link "Proyectos" en Navigation y NavDrawer; sitemap con `/proyectos` y sus slugs.

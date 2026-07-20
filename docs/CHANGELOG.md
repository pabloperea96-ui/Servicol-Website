# Changelog

## 2026-07-20 — Videos en la galería de proyectos con autoplay

- `renders` acepta videos: el objeto `videoItem` (archivo + carátula opcional +
  descripción) se extrajo de `property.ts` a `src/sanity/schemas/objects/videoItem.ts`
  y ahora lo comparten las galerías de propiedad y proyecto (mismo `_type`, sin
  migración de contenido).
- Orden de la galería del detalle de proyecto (`toProjectMediaItems`): videos primero,
  luego `mainImage`, luego las imágenes restantes. La card y el OG siguen usando
  `mainImage`.
- `ImageGallery` gana la prop opt-in `autoPlayFirstVideo`: si el primer ítem es video,
  se reproduce automáticamente en el slot principal (muted, loop, `playsInline`, sin
  controles, con `poster`); el click sigue abriendo el lightbox con sonido. Respeta
  `prefers-reduced-motion` y fuerza `muted` + `play()` vía callback ref (React no
  serializa `muted` en SSR). Solo el detalle de proyecto la activa — propiedades sin
  cambios.

## 2026-07-20 — Proyectos "En planos": avance genérico y fechas opcionales

- El estado `en-planos` ahora significa "obra no iniciada": en el Studio se oculta
  `Avance de obra (%)` y las fechas de inicio/entrega pasan a ser opcionales
  (siguen obligatorias en construcción/entregado), vía validación condicional.
- El sitio muestra un avance simbólico para proyectos en planos: barra al 5% con el
  texto "En planos" en vez de "X% completado" (card y barra de info del detalle).
  Lógica centralizada en `toProjectProgressDisplay()` (`sanity-mappers.ts`).
- `ProgressBar` acepta `valueText` (override del texto de porcentaje, con
  `aria-valuetext`); `ProjectProgress`/`ProjectInfoBar` aceptan fechas opcionales y
  ocultan los bloques de fecha ausentes.
- La barra de info del detalle ya no exige fechas para renderizarse: basta con el
  asesor, para no perder el CTA de WhatsApp en proyectos en planos.

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

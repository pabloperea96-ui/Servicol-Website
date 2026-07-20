# Proyectos nuevos — cambios y guía del schema

> Referencia de la feature de proyectos (branch `update-proyectos`, julio 2026):
> qué se construyó, qué decisiones se tomaron y cómo funciona el contenido en Sanity.

---

## 1. Qué se construyó

Dos rutas nuevas, diseñadas primero en Figma (archivo Web Design, páginas "Proyectos" y
"Proyectos/slug") y luego llevadas a código:

| Ruta | Qué muestra |
|---|---|
| `/proyectos` | Breadcrumb + título, grid de cards (1 col móvil / 2 tablet / 3 desktop), CTA de WhatsApp y footer. Si no hay proyectos publicados muestra un empty state con botón de WhatsApp. |
| `/proyectos/[slug]` | Badge de estado + título + dirección, galería de renders, barra de info (avance de obra + fechas \| asesor \| botón Contactar), tipologías, descripción y "Otros proyectos". |

### Cambios por capa

**Datos** (`src/lib/`)
- 5 queries GROQ nuevas en `queries.ts`: `ALL_PROJECTS_QUERY`, `PROJECT_BY_SLUG_QUERY`,
  `PROJECT_SLUGS_QUERY`, `PROJECT_METADATA_QUERY`, `OTHER_PROJECTS_QUERY`
- Tipo `SanityProject` y mappers `toProjectCardProps` / `toProjectMediaItems` en `sanity-mappers.ts`
- `toAdvisor()` generalizado: el mensaje de WhatsApp distingue "propiedad" de "proyecto"
- Utilidad compartida `formatPrice.ts`: `formatCOP()` y `formatMonthYear()`

**Componentes** (`src/components/`)
- `UnitTypeCard` (nueva): card de tipología — nombre, área/hab/baños con iconos, precio "Desde"
- `ProjectProgress` (nueva): barra de avance + fechas de inicio y entrega estimada
- `ProjectInfoBar` (nueva): la barra del detalle — avance \| asesor \| Contactar
- `Badge`: 3 tipos nuevos (`en-planos`, `en-construccion`, `entregado`)
- `ProjectCard`: toda la card es un link al detalle (hover con borde morado + sombra),
  sin botones ni divider
- `ProgressBar`: tipografía con token responsive `--font-size-progress-label`
  (14px móvil/tablet, 16px desktop) en lugar de 13px fijo

**Navegación y SEO**
- Link "Proyectos" en `Navigation` y `NavDrawer` (el Footer ya lo tenía)
- `sitemap.ts` incluye `/proyectos` y los slugs publicados
- Metadata propia en ambas páginas; OG image desde `mainImage`
- Ambas páginas usan ISR (`revalidate = 60`) y el detalle se pre-genera con
  `generateStaticParams`

**Infraestructura**
- Migración de npm a **pnpm** (`pnpm-lock.yaml`, `packageManager` pineado,
  postinstall scripts aprobados vía `onlyBuiltDependencies`)
- Fix global: `history.scrollRestoration` movido de un `<script>` inline en el layout a un
  Client Component (`src/app/ScrollRestoration.tsx`)

Commits del branch: `0f24e51` (feature base), `43f8398` (fixes), `19a11a7` (card clickeable),
`b5a5762` (pnpm), `ba836d2` (rediseño barra de info).

---

## 2. Decisiones de diseño

- **El precio "Desde" no aparece en la barra del detalle.** Mostraba el precio global junto a
  los precios por tipología y confundía. Los precios viven solo en las cards de
  "Tipos de propiedad".
  El `startingPrice` sigue usándose en la card de la lista y en la meta description de SEO.
- **La card de proyecto es 100% clickeable**, sin botones "Ver Proyecto"/"Contactar" ni
  divider. El contacto por WhatsApp vive en el detalle (barra de info) y en el CTA del final.
- **Sin mapa en el detalle**: el schema no tiene campo de mapa. Si se necesita, se agrega
  un `googleMapsEmbed` como en propiedades (cambio de schema + sección en la página).
- **`startingPrice` se mantiene manual** (decisión 2026-07-12). Alternativa futura si se
  desincroniza con las tipologías: eliminarlo del schema y calcularlo en GROQ como
  `math::min(unitTypes[].price)`.
- **Proyectos "En planos" muestran avance simbólico** (decisión 2026-07-20). No se pide
  `progressPct` al editor: el sitio dibuja la barra al 5% con el texto "5% · En planos" en vez
  de un porcentaje, para no comprometer una cifra ni dejar el bloque vacío. La lógica vive
  en `toProjectProgressDisplay()` (`sanity-mappers.ts`) y aplica también como fallback si
  `progressPct` viene nulo en cualquier estado. No se agregó un campo "¿inició obra?":
  el estado "En planos" ya expresa eso y evita combinaciones contradictorias.
- **El video del proyecto se auto-reproduce solo en el detalle de proyecto** (decisión
  2026-07-20). Los navegadores solo permiten autoplay silenciado, así que el primer video
  se reproduce muted/loop/sin controles en el slot principal de la galería; el click abre
  el lightbox con sonido y controles. Es un opt-in (`autoPlayFirstVideo`) de `ImageGallery`:
  el detalle de propiedades conserva su comportamiento actual (miniatura + play). Se
  respeta `prefers-reduced-motion` (cae a miniatura + play). El orden "videos primero" lo
  impone `toProjectMediaItems()` para que el autoplay sea predecible para el editor.
  Los videos verticales se adaptan solos (la orientación se detecta al cargar la metadata):
  en desktop se ven completos sobre la carátula difuminada; en móvil el slot crece a 4:5.

---

## 3. Cómo funciona el schema `project` en Sanity

Definido en `src/sanity/schemas/project.ts`. En el Studio (`/studio`) el formulario se
organiza en 4 pestañas (grupos). **Regla de oro: un proyecto solo aparece en el sitio si
`Publicado en el sitio` está activo**; el sitio se actualiza solo (ISR, máximo 60 segundos
después de publicar).

### Pestaña "Identificación"

| Campo | Tipo | Validación | Dónde se usa en el sitio |
|---|---|---|---|
| Nombre del proyecto (`title`) | string | requerido, 10–100 caracteres | Card, título del detalle, breadcrumb, mensaje de WhatsApp, `<title>` SEO |
| Slug (`slug`) | slug | requerido, se genera del nombre | URL del detalle: `/proyectos/{slug}` |
| Dirección (`address`) | string | requerido | Línea bajo el título del detalle |
| Zona / Municipio (`zone`) | radio (6 zonas) | requerido | Línea bajo el título ("· Paipa, Boyacá") y textos SEO |
| Descripción (`description`) | texto | requerido, 50–2000 caracteres | Sección "Descripción" del detalle (cada salto de línea crea un párrafo) |
| Estado (`status`) | radio: En planos / En construcción / Entregado | requerido | Badge de color en el detalle y texto SEO ("sobre planos", "en construcción", "entregado") |
| Precio desde (`startingPrice`) | número COP | requerido, mínimo $1.000.000 | Card de la lista ("Desde $X") y meta description. **No** aparece en la barra del detalle |
| Tipos de propiedad (`unitTypes`) | lista de objetos | mínimo 1; cada una exige tipo de inmueble (Apartamento / Casa / Local-Oficina / Lote / Finca), nombre, área y precio. Habitaciones y baños solo son obligatorios para vivienda: en Local/Oficina y Lote se ocultan y quedan opcionales | Cards de la sección "Tipos de propiedad" del detalle. El tipo aparece como eyebrow en mayúsculas sobre el nombre; hab/baños solo se muestran si existen |

### Pestaña "Progreso de obra"

Los tres campos son condicionales al estado del proyecto: si el estado es **En planos**
(obra no iniciada), `progressPct` se oculta en el formulario y las fechas pasan a ser
opcionales. En los demás estados los tres son obligatorios.

| Campo | Tipo | Validación | Dónde se usa |
|---|---|---|---|
| Avance de obra (`progressPct`) | número 0–100 | entero, requerido salvo "En planos" (oculto en ese estado) | Barra de progreso en la card y en la barra de info del detalle ("X% completado"). Si el proyecto está en planos, el sitio ignora el valor y dibuja una barra simbólica al 5% con el texto "5% · En planos" |
| Fecha de inicio (`startDate`) | fecha | requerido salvo "En planos" | "Inicio de obra · Marzo 2026" en la barra de info. Si falta, el bloque no se muestra |
| Entrega estimada (`estimatedDelivery`) | fecha | requerido salvo "En planos" | "Entrega estimada · Diciembre 2026" en la barra de info. Si falta, el bloque no se muestra |

### Pestaña "Galería"

| Campo | Tipo | Validación | Dónde se usa |
|---|---|---|---|
| Imagen principal (`mainImage`) | imagen + alt obligatorio | requerido | Foto de la card y OG image para redes. En la galería del detalle va después de los videos (si los hay) |
| Galería de renders y videos (`renders`) | lista de imágenes (alt obligatorio, pie de foto opcional) **y videos** (`videoItem`: archivo + carátula opcional + descripción opcional, objeto compartido con la galería de `property`) | mínimo 1 ítem | Galería del detalle (con lightbox). Orden en el sitio: videos primero → `mainImage` → imágenes restantes en orden editorial. El primer video se reproduce automáticamente (sin sonido, en loop) al entrar al detalle; el click lo abre en el lightbox con sonido. Si un render repite la imagen principal, se deduplica. Subir MP4 cortos y comprimidos: Sanity sirve el archivo sin transcodificar |

### Pestaña "Contacto y publicación"

| Campo | Tipo | Default | Dónde se usa |
|---|---|---|---|
| Asesor a cargo (`advisor`) | referencia a `advisor` | requerido | Bloque de asesor en la barra de info; su número recibe el WhatsApp del botón "Contactar" con mensaje pre-armado que incluye el nombre del proyecto. Si faltara, el sitio usa el WhatsApp general de `siteSettings` como respaldo |
| Publicado en el sitio (`published`) | boolean | `false` | **Gate de visibilidad**: controla lista, detalle, "Otros proyectos" y sitemap. Permite cargar un proyecto completo sin publicarlo |
| Destacar en Home (`featured`) | boolean | `false` | Reservado: la sección de destacados en la Home aún no existe (ver pendientes) |
| Fecha de publicación (`publishedAt`) | datetime | ahora | Orden de la lista (más reciente primero) |

### Guía rápida: publicar un proyecto

1. Entrar a `/studio` → **Proyecto** → crear documento
2. Llenar las 4 pestañas (el Studio marca en rojo lo que falte; con `Publicado en el sitio`
   apagado se puede guardar a medias sin que se vea en el sitio)
3. Revisar el preview del documento (muestra estado, precio y si está publicado)
4. Activar **Publicado en el sitio** y dar **Publish**
5. En máximo 60 segundos aparece en `/proyectos`; el detalle queda en
   `/proyectos/{slug}` y entra al sitemap

---

## 4. Pendientes

- **Destacados en Home**: diseñar la sección en Figma y conectarla con `featured`
  (la query sería análoga a `FEATURED_PROPERTIES_QUERY`)
- **Sincronizar Figma con el código**: el Project Card del design system aún muestra
  botones, y en la barra de info del DS quedó un bloque "Entrega estimada" duplicado
- **`startingPrice` derivado** de tipologías si se vuelve difícil de mantener (ver sección 2)

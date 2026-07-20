import type { ComponentProps } from 'react'
import type PropertyCard from '@/components/molecules/PropertyCard'
import type { Advisor }  from '@/lib/mock-properties'

type CardProps = ComponentProps<typeof PropertyCard>

// ─── Tipo inferido de los resultados de Sanity ───────────────────────────────

export type SanityProperty = {
  _id:          string
  title:        string
  slug:         string
  operation:    'venta' | 'arriendo'
  propertyType: string
  price:        number
  area:         number | null
  bedrooms:     number | null
  bathrooms:    number | null
  parking:      boolean | null
  zone:         string
  neighborhood: string
  location:     string
  featured:     boolean
  status:       'disponible' | 'arrendado' | 'vendido' | 'retirado'
  published:    boolean
  mainImageUrl: string | null
  mainImageAlt: string | null
  // Solo en ficha de detalle
  code?:        string
  description?: string
  amenities?:   string[]
  floor?:       number
  stratum?:     number
  address?:          string
  googleMapsEmbed?:  string | null
  gallery?: Array<
    | { mediaType: 'image';  url: string | null; alt: string | null; caption: string | null }
    | { mediaType: 'video';  url: string | null; thumbnailUrl: string | null; caption: string | null }
  >
  advisor?: {
    name:      string
    role:      string
    whatsapp:  string
    photoUrl?: string
  }
}

// ─── Tipo para el singleton siteSettings ─────────────────────────────────────

export type SiteSettings = {
  whatsappMain:       string
  officeAddress:      string
  officeHours:        string
  email:              string
  instagram:          string | null
  facebook:           string | null
  googleMapsEmbed:    string | null
}

// ─── Mapeo de zone granular → zona simple para filtros URL ───────────────────

export function mapZone(zone: string): string {
  if (zone.startsWith('duitama')) return 'duitama'
  return zone // tibasosa, paipa, santa-rosa
}

// ─── Mapeo de propertyType Sanity → valor del filtro URL ────────────────────

export function mapPropertyType(sanityType: string): string {
  if (sanityType === 'local-oficina') return 'local'
  return sanityType
}

// ─── SanityProperty → CardProps ──────────────────────────────────────────────

export function toCardProps(p: SanityProperty): CardProps {
  return {
    slug:      p.slug,
    title:     p.title,
    price:     p.price,
    area:      p.area      ?? 0,
    bedrooms:  p.bedrooms  ?? 0,
    bathrooms: p.bathrooms ?? 0,
    location:  p.location,
    operation: p.operation,
    imageSrc:  p.mainImageUrl ?? undefined,
    mode:      'link',
  }
}

// ─── Initials desde nombre ───────────────────────────────────────────────────

export function computeInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

// ─── SanityProperty.advisor → Advisor (para PriceInfoBar) ───────────────────

export function toAdvisor(
  raw: SanityProperty['advisor'],
  propertyTitle?: string,
  kind: 'propiedad' | 'proyecto' = 'propiedad',
): Advisor | null {
  if (!raw) return null
  const interest = kind === 'proyecto' ? 'el+proyecto' : 'una+propiedad'
  return {
    name:        raw.name,
    role:        raw.role,
    initials:    computeInitials(raw.name),
    whatsappUrl: `https://wa.me/${raw.whatsapp}?text=Hola%2C+me+interesa+${interest}+de+Servicol${propertyTitle ? `%3A+${encodeURIComponent(propertyTitle)}` : ''}`,
    photoUrl:    raw.photoUrl ?? undefined,
  }
}

// ─── SanityAdvisor → TeamCard props ──────────────────────────────────────────

export type SanityAdvisor = {
  _id:      string
  name:     string
  role:     string
  whatsapp: string
  photoUrl: string | null
}

export function toTeamCard(a: SanityAdvisor) {
  return {
    name:        a.name,
    role:        a.role,
    initials:    computeInitials(a.name),
    photoSrc:    a.photoUrl ?? undefined,
    whatsappUrl: a.whatsapp
      ? `https://wa.me/${a.whatsapp}?text=Hola%2C+me+gustar%C3%ADa+hablar+con+un+asesor+de+Servicol`
      : undefined,
  }
}

// ─── SanityTestimonial → TestimonialCard props ───────────────────────────────

export type SanityTestimonial = {
  _id:    string
  quote:  string
  name:   string
  city:   string
  rating: number
}

const CITY_LABELS: Record<string, string> = {
  'duitama':    'Duitama',
  'tibasosa':   'Tibasosa',
  'paipa':      'Paipa',
  'santa-rosa': 'Santa Rosa',
}

export function toTestimonialCard(t: SanityTestimonial) {
  return {
    quote:  t.quote,
    name:   t.name,
    role:   CITY_LABELS[t.city],
    rating: t.rating,
  }
}

// ─── Tipo inferido de los resultados de project en Sanity ────────────────────

export type SanityProjectUnitType = {
  name:      string
  area:      number
  bedrooms:  number
  bathrooms: number
  price:     number
}

export type SanityProject = {
  _id:          string
  title:        string
  slug:         string
  status:       'en-planos' | 'en-construccion' | 'entregado'
  zone:         string
  startingPrice: number
  progressPct:  number | null
  featured:     boolean
  mainImageUrl: string | null
  mainImageAlt: string | null
  advisor: {
    name:      string
    role?:     string
    whatsapp:  string
    photoUrl?: string
  } | null
  // Solo en ficha de detalle
  address?:           string
  city?:              string
  description?:       string
  startDate?:         string
  estimatedDelivery?: string
  unitTypes?:         SanityProjectUnitType[]
  renders?: Array<
    | { mediaType: 'image'; url: string | null; alt: string | null; caption: string | null }
    | { mediaType: 'video'; url: string | null; thumbnailUrl: string | null; caption: string | null }
  >
}

// ─── Avance de obra → valor y texto de la barra de progreso ──────────────────

// Symbolic fill for projects that haven't broken ground yet
const PLANNED_PROGRESS_PCT = 5

export type ProjectProgressDisplay = {
  value:      number
  valueText?: string
}

export function toProjectProgressDisplay(
  status: SanityProject['status'],
  progressPct: number | null,
): ProjectProgressDisplay {
  if (status === 'en-planos' || progressPct == null) {
    return { value: PLANNED_PROGRESS_PCT, valueText: 'En planos' }
  }
  return { value: progressPct }
}

// ─── SanityProject → ProjectCard props ───────────────────────────────────────

export function toProjectCardProps(p: SanityProject) {
  const progress = toProjectProgressDisplay(p.status, p.progressPct)
  return {
    slug:              p.slug,
    title:             p.title,
    startingPrice:     p.startingPrice,
    progressValue:     progress.value,
    progressValueText: progress.valueText,
    imageSrc:          p.mainImageUrl ?? undefined,
    imageAlt:          p.mainImageAlt ?? undefined,
  }
}

// ─── Renders del proyecto → MediaItem[] para ImageGallery ───────────────────

// Videos go first so the detail page can autoplay the opening one; mainImage
// stays as card/OG cover and becomes the first image of the gallery.
export function toProjectMediaItems(p: SanityProject): MediaItem[] {
  const videos: MediaItem[] = []
  const images: MediaItem[] = []
  for (const r of p.renders ?? []) {
    if (!r.mediaType || !r.url) continue
    if (r.mediaType === 'video') {
      videos.push({
        mediaType: 'video',
        url:       r.url,
        ...(r.thumbnailUrl ? { thumbnailUrl: r.thumbnailUrl } : {}),
        ...(r.caption ? { caption: r.caption } : {}),
      })
    } else {
      if (r.url === p.mainImageUrl) continue
      images.push({
        mediaType: 'image',
        url:       r.url,
        alt:       r.alt ?? p.title,
        ...(r.caption ? { caption: r.caption } : {}),
      })
    }
  }
  const items: MediaItem[] = [...videos]
  if (p.mainImageUrl) {
    items.push({ mediaType: 'image', url: p.mainImageUrl, alt: p.mainImageAlt ?? p.title })
  }
  items.push(...images)
  return items
}

// ─── Tipo de ítem de galería (imagen o video) ────────────────────────────────

export type MediaItem =
  | { mediaType: 'image'; url: string; alt: string; caption?: string }
  | { mediaType: 'video'; url: string; thumbnailUrl?: string; caption?: string }

// ─── Gallery → MediaItem[] para ImageGallery ─────────────────────────────────

export function toMediaItems(p: SanityProperty): MediaItem[] {
  if (p.gallery && p.gallery.length > 0) {
    const result: MediaItem[] = []
    for (const g of p.gallery) {
      if (!g.mediaType || !g.url) continue
      if (g.mediaType === 'image') {
        result.push({
          mediaType: 'image',
          url:       g.url,
          alt:       g.alt ?? '',
          ...(g.caption ? { caption: g.caption } : {}),
        })
      } else if (g.mediaType === 'video') {
        result.push({
          mediaType: 'video',
          url:       g.url,
          ...(g.thumbnailUrl ? { thumbnailUrl: g.thumbnailUrl } : {}),
          ...(g.caption      ? { caption: g.caption }           : {}),
        })
      }
    }
    return result
  }
  return p.mainImageUrl
    ? [{ mediaType: 'image', url: p.mainImageUrl, alt: p.title }]
    : []
}

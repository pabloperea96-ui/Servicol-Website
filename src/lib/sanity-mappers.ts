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
  status:       string
  mainImageUrl: string | null
  mainImageAlt: string | null
  // Solo en ficha de detalle
  code?:        string
  description?: string
  amenities?:   string[]
  floor?:       number
  stratum?:     number
  coordinates?: { lat: number; lng: number }
  address?:     string
  gallery?:     { url: string; alt: string; caption?: string }[]
  advisor?: {
    name:      string
    role:      string
    whatsapp:  string
    photoUrl?: string
  }
}

// ─── Mapeo de zone granular → zona simple para filtros URL ───────────────────

export function mapZone(zone: string): string {
  if (zone.startsWith('duitama')) return 'duitama'
  return zone // sogamoso, paipa, santa-rosa
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
): Advisor | null {
  if (!raw) return null
  return {
    name:        raw.name,
    role:        raw.role,
    initials:    computeInitials(raw.name),
    whatsappUrl: `https://wa.me/${raw.whatsapp}?text=Hola%2C+me+interesa+una+propiedad+de+Servicol${propertyTitle ? `%3A+${encodeURIComponent(propertyTitle)}` : ''}`,
  }
}

// ─── Gallery → array de URLs para ImageGallery ───────────────────────────────

export function toImageUrls(p: SanityProperty): string[] {
  if (p.gallery && p.gallery.length > 0) {
    return p.gallery.map(g => g.url).filter((u): u is string => Boolean(u))
  }
  return p.mainImageUrl ? [p.mainImageUrl] : []
}

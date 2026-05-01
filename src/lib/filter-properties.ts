// src/lib/filter-properties.ts
import type { SanityProperty } from '@/lib/sanity-mappers'
import { mapZone }             from '@/lib/sanity-mappers'

export type FilterParams = {
  tipo?:         string
  operacion?:    string
  habitaciones?: string  // comma-separated: "1,2,3"
  banos?:        string  // comma-separated: "1,2"
  precioMin?:    string
  precioMax?:    string
  areaMin?:      string
  areaMax?:      string
  zona?:         string  // comma-separated: "duitama,sogamoso"
  pagina?:       string
  orden?:        string  // 'recientes' | 'precio-asc' | 'precio-desc'
}

const ITEMS_PER_PAGE = 8

function parseList(value: string | undefined): string[] {
  if (!value) return []
  return value.split(',').map(s => s.trim()).filter(Boolean)
}

function applyFilters(
  properties: SanityProperty[],
  params: FilterParams,
): SanityProperty[] {
  let result = [...properties]

  if (params.tipo) {
    // URL usa 'local'; Sanity usa 'local-oficina'
    const sanityType = params.tipo === 'local' ? 'local-oficina' : params.tipo
    result = result.filter(p => p.propertyType === sanityType)
  }

  if (params.operacion) {
    result = result.filter(p => p.operation === params.operacion)
  }

  // Zone: URL usa 'duitama'; Sanity usa 'duitama-centro|norte|sur'
  const zones = parseList(params.zona)
  if (zones.length > 0) {
    result = result.filter(p => zones.includes(mapZone(p.zone)))
  }

  const habs = parseList(params.habitaciones).map(Number)
  if (habs.length > 0) {
    result = result.filter(p => {
      const beds = p.bedrooms ?? 0
      return habs.some(h => (h >= 4 ? beds >= 4 : beds === h))
    })
  }

  const banos = parseList(params.banos).map(Number)
  if (banos.length > 0) {
    result = result.filter(p => {
      const baths = p.bathrooms ?? 0
      return banos.some(b => (b >= 3 ? baths >= 3 : baths === b))
    })
  }

  if (params.precioMin) {
    const min = Number(params.precioMin)
    result = result.filter(p => p.price >= min)
  }

  if (params.precioMax) {
    const max = Number(params.precioMax)
    result = result.filter(p => p.price <= max)
  }

  if (params.areaMin) {
    const min = Number(params.areaMin)
    result = result.filter(p => (p.area ?? 0) >= min)
  }

  if (params.areaMax) {
    const max = Number(params.areaMax)
    result = result.filter(p => (p.area ?? 0) <= max)
  }

  if (params.orden === 'precio-asc') {
    result.sort((a, b) => a.price - b.price)
  } else if (params.orden === 'precio-desc') {
    result.sort((a, b) => b.price - a.price)
  }

  return result
}

export function filterProperties(
  properties: SanityProperty[],
  params: FilterParams,
): {
  items:      SanityProperty[]
  allItems:   SanityProperty[]
  totalPages: number
  totalCount: number
} {
  const allItems   = applyFilters(properties, params)
  const totalCount = allItems.length
  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE))
  const page       = Math.max(1, Math.min(Number(params.pagina ?? 1), totalPages))
  const start      = (page - 1) * ITEMS_PER_PAGE
  const items      = allItems.slice(start, start + ITEMS_PER_PAGE)

  return { items, allItems, totalPages, totalCount }
}

'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { X } from 'lucide-react'

const LABELS: Record<string, Record<string, string>> = {
  tipo: {
    apartamento: 'Apartamento',
    casa:        'Casa',
    local:       'Local',
    lote:        'Lote',
    finca:       'Finca',
  },
  operacion: {
    venta:    'Venta',
    arriendo: 'Arriendo',
  },
  habitaciones: {
    '1': '1 hab',
    '2': '2 hab',
    '3': '3 hab',
    '4': '4+',
  },
  banos: {
    '1': '1 baño',
    '2': '2 baños',
    '3': '3+',
  },
  zona: {
    duitama:  'Duitama',
    tibasosa: 'Tibasosa',
    paipa:    'Paipa',
  },
}

const MULTI = new Set(['habitaciones', 'banos', 'zona'])

export default function ActiveFiltersBar() {
  const searchParams = useSearchParams()
  const router       = useRouter()

  type Pill = { key: string; value: string; label: string }
  const pills: Pill[] = []

  // Precio — pill único para el rango completo
  const precioMin = searchParams.get('precioMin')
  const precioMax = searchParams.get('precioMax')
  if (precioMin || precioMax) {
    const fmt = (v: string) => `$ ${Number(v).toLocaleString('es-CO')}`
    const label = precioMin && precioMax
      ? `${fmt(precioMin)} – ${fmt(precioMax)}`
      : precioMin
        ? `Desde ${fmt(precioMin)}`
        : `Hasta ${fmt(precioMax!)}`
    pills.push({ key: 'precio', value: 'rango', label })
  }

  for (const [key, map] of Object.entries(LABELS)) {
    const raw = searchParams.get(key)
    if (!raw) continue
    const values = MULTI.has(key) ? raw.split(',').filter(Boolean) : [raw]
    values.forEach(v => pills.push({ key, value: v, label: map[v] ?? v }))
  }

  if (pills.length === 0) return null

  function remove(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (key === 'precio') {
      params.delete('precioMin')
      params.delete('precioMax')
    } else if (MULTI.has(key)) {
      const updated = (params.get(key) ?? '').split(',').filter(v => v !== value).join(',')
      if (updated) params.set(key, updated)
      else         params.delete(key)
    } else {
      params.delete(key)
    }
    params.delete('pagina')
    router.replace(`/portafolio?${params.toString()}`, { scroll: false })
  }

  function clearAll() {
    router.replace('/portafolio', { scroll: false })
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {pills.map(({ key, value, label }) => (
        <span
          key={`${key}-${value}`}
          className="inline-flex items-center gap-[6px] whitespace-nowrap rounded-pill border border-action-cta bg-action-cta-light px-[14px] py-[6px] font-body text-label font-regular leading-[11px] text-action-cta"
        >
          {label}
          <button
            type="button"
            onClick={() => remove(key, value)}
            aria-label={`Quitar ${label}`}
            className="flex items-center leading-none"
          >
            <X size={10} strokeWidth={2.5} />
          </button>
        </span>
      ))}

      <button
        type="button"
        onClick={clearAll}
        className="whitespace-nowrap font-body text-label font-regular leading-[11px] text-text-muted underline underline-offset-2"
      >
        Limpiar todo
      </button>
    </div>
  )
}

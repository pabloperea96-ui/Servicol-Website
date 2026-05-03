'use client'
import { useSearchParams } from 'next/navigation'

export function useFilterCount(): number {
  const sp = useSearchParams()
  let n = 0
  if (sp.get('tipo'))         n++
  if (sp.get('operacion'))    n++
  if (sp.get('habitaciones')) n++
  if (sp.get('banos'))        n++
  if (sp.get('zona'))         n++
  if (sp.get('precioMin') || sp.get('precioMax')) n++
  return n
}

'use client'

import { X } from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useFilterCount } from '@/lib/useFilterCount'

export default function FilterCountPill() {
  const count        = useFilterCount()
  const searchParams = useSearchParams()
  const router       = useRouter()

  if (count === 0) return null

  function clearAll() {
    const params = new URLSearchParams()
    const orden  = searchParams.get('orden')
    if (orden) params.set('orden', orden)
    const qs = params.toString()
    router.replace(qs ? `/portafolio?${qs}` : '/portafolio', { scroll: false })
  }

  return (
    <button
      type="button"
      onClick={clearAll}
      className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-pill border border-action-cta bg-action-cta-light px-[14px] py-[6px] font-body text-label font-regular leading-[11px] text-action-cta"
    >
      ({count}) {count === 1 ? 'Filtro aplicado' : 'Filtros aplicados'}
      <X size={12} strokeWidth={2.5} />
    </button>
  )
}

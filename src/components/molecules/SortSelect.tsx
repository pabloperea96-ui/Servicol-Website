'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

const OPTIONS = [
  { value: '',            label: 'Más recientes'         },
  { value: 'precio-asc',  label: 'Precio: menor a mayor' },
  { value: 'precio-desc', label: 'Precio: mayor a menor' },
]

export default function SortSelect() {
  const searchParams = useSearchParams()
  const router       = useRouter()
  const current      = searchParams.get('orden') ?? ''

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString())
    if (e.target.value) params.set('orden', e.target.value)
    else params.delete('orden')
    params.delete('pagina')
    router.replace(`/portafolio?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="relative w-full">
      <select
        value={current}
        onChange={handleChange}
        aria-label="Ordenar resultados"
        suppressHydrationWarning
        className={[
          'appearance-none cursor-pointer',
          'w-full bg-bg-surface rounded-md px-4 py-3 pr-9',
          'font-body text-body-md text-text-primary',
          'border border-border-default',
          'focus:outline-none focus:border-[1.5px] focus:border-action-primary',
          'transition-[border-color] duration-base ease-out',
        ].join(' ')}
      >
        {OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
      <ChevronDown
        size={16}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
        aria-hidden
      />
    </div>
  )
}

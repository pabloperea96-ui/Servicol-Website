'use client'

// src/components/molecules/CategoryBar.tsx
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const TYPES = [
  { value: '',            label: 'Todos'        },
  { value: 'apartamento', label: 'Apartamentos' },
  { value: 'casa',        label: 'Casas'        },
  { value: 'local',       label: 'Locales'      },
  { value: 'lote',        label: 'Lotes'        },
  { value: 'finca',       label: 'Fincas'       },
]

export default function CategoryBar() {
  const searchParams = useSearchParams()
  const current      = searchParams.get('tipo') ?? ''

  function buildHref(value: string): string {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set('tipo', value)
    else params.delete('tipo')
    params.delete('pagina')
    const qs = params.toString()
    return qs ? `/portafolio?${qs}` : '/portafolio'
  }

  return (
    <div className="flex flex-wrap gap-2">
      {TYPES.map(({ value, label }) => (
        <Link
          key={value || 'todos'}
          href={buildHref(value)}
          className={[
            'inline-flex items-center justify-center px-[14px] py-[6px]',
            'rounded-pill font-body text-label font-regular leading-[11px] whitespace-nowrap',
            'border transition-colors duration-base ease-out',
            current === value
              ? 'bg-action-cta border-action-cta text-text-inverse'
              : 'bg-transparent border-plata text-text-secondary hover:bg-bg-subtle hover:border-gris hover:text-text-primary',
          ].join(' ')}
        >
          {label}
        </Link>
      ))}
    </div>
  )
}

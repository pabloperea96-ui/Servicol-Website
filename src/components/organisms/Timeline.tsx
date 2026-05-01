// src/components/organisms/Timeline.tsx

type TimelineItem = { year: string; description: string }

type TimelineProps = {
  items?: TimelineItem[]
  className?: string
}

const DEFAULT_ITEMS: TimelineItem[] = [
  { year: '1998', description: 'Fundación de Servicol en Duitama. Inicio de operaciones con venta y arriendo de inmuebles residenciales.' },
  { year: '2005', description: 'Expansión hacia Sogamoso y Paipa. Apertura de la unidad de administración de propiedades.' },
  { year: '2015', description: 'Lanzamiento de la primera alianza con constructoras para proyectos sobre planos en Boyacá.' },
  { year: '2024', description: 'Más de 500 propiedades gestionadas y presencia consolidada en el corredor Duitama – Sogamoso – Paipa.' },
]

export default function Timeline({ items = DEFAULT_ITEMS, className }: TimelineProps) {
  return (
    <ol className={['flex flex-col', className].filter(Boolean).join(' ')}>
      {items.map(({ year, description }, i) => {
        const isLast = i === items.length - 1
        return (
          <li key={year} className="flex gap-6">
            {/* Indicator column */}
            <div className="flex w-10 shrink-0 flex-col items-center">
              <span className="mt-2 size-2 shrink-0 rounded-full bg-action-primary" aria-hidden />
              {!isLast && (
                <span className="mt-1 flex-1 w-px bg-action-primary/20" aria-hidden />
              )}
            </div>
            {/* Content */}
            <div className={['flex flex-col gap-1', isLast ? 'pb-0' : 'pb-8'].join(' ')}>
              <p className="font-display text-display-2xl font-bold leading-[40px] tracking-[-0.3px] text-text-primary">
                {year}
              </p>
              <p className="font-body text-body-lg font-light leading-[28px] text-text-muted">
                {description}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
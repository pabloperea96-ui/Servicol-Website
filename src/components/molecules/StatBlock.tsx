// src/components/molecules/StatBlock.tsx

type Stat = { value: string; label: string }

type StatBlockProps = {
  stats?: Stat[]
  className?: string
}

const DEFAULT_STATS: Stat[] = [
  { value: '25+',  label: 'Años de experiencia' },
  { value: '500+', label: 'Propiedades vendidas' },
  { value: '3',    label: 'Ciudades en Boyacá' },
  { value: '98%',  label: 'Clientes satisfechos' },
]

export default function StatBlock({ stats = DEFAULT_STATS, className }: StatBlockProps) {
  return (
    <div
      className={[
        'overflow-hidden rounded-lg border border-border-default bg-bg-surface',
        'grid grid-cols-2 md:grid-cols-4',
        className,
      ].filter(Boolean).join(' ')}
    >
      {stats.map((stat, i) => (
        <div
          key={i}
          className={[
            'flex flex-col items-center justify-center gap-[6px] px-6 py-8 md:py-0 md:h-[140px]',
            i < stats.length - 1 ? 'border-b-2 border-r-0 md:border-b-0 md:border-r border-border-default' : '',
            i === 1 ? 'md:border-r border-border-default' : '',
          ].filter(Boolean).join(' ')}
        >
          <p className="font-display text-display-2xl font-bold text-text-primary tracking-[-0.3px]">
            {stat.value}
          </p>
          <p className="text-body-md text-text-muted text-center">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}
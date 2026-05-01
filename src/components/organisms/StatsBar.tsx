// src/components/organisms/StatsBar.tsx

type Stat = { value: string; label: string }

const DEFAULT_STATS: Stat[] = [
  { value: '25+',  label: 'Años de experiencia'  },
  { value: '500+', label: 'Propiedades vendidas' },
  { value: '3',    label: 'Ciudades en Boyacá'   },
  { value: '98%',  label: 'Clientes satisfechos' },
]

type StatsBarProps = {
  stats?: Stat[]
}

function statClasses(i: number, total: number): string {
  const isRightCol  = i % 2 !== 0          // columna derecha en mobile (2-col)
  const isLastItem  = i === total - 1
  const classes: string[] = []

  // Separador vertical — mobile: sólo columna izquierda · desktop: todos salvo el último
  if (!isRightCol && !isLastItem) classes.push('border-r border-text-inverse/20')
  if (isRightCol && !isLastItem)  classes.push('md:border-r border-text-inverse/20')

  // Separador horizontal — mobile: primera fila lleva borde inferior · desktop: se elimina
  if (i < 2) classes.push('border-b border-text-inverse/20 md:border-b-0')

  return classes.join(' ')
}

export default function StatsBar({ stats = DEFAULT_STATS }: StatsBarProps) {
  return (
    <section className="bg-action-cta" aria-label="Estadísticas">
      <div className="mx-auto max-w-[1440px] grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={[
              'flex flex-col items-center justify-center gap-2 py-12 px-6 text-center',
              statClasses(i, stats.length),
            ].join(' ')}
          >
            <p className="text-stat-number text-text-inverse">{stat.value}</p>
            <p className="text-stat-label text-text-inverse/80">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

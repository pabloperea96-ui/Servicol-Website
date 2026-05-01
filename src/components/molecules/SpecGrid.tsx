// src/components/molecules/SpecGrid.tsx

type SpecItem = { value: string; label: string }

type SpecGridProps = {
  specs: SpecItem[]
  columns?: 2 | 3
  className?: string
}

export default function SpecGrid({ specs, columns = 2, className }: SpecGridProps) {
  const cols = columns === 3 ? 'grid-cols-3' : 'grid-cols-2'

  return (
    <div
      className={[
        `grid ${cols} overflow-hidden rounded-lg border border-border-default bg-bg-surface`,
        className,
      ].filter(Boolean).join(' ')}
    >
      {specs.map((spec, i) => {
        const isLastRow = i >= specs.length - columns
        const isLastCol = (i + 1) % columns === 0
        return (
          <div
            key={i}
            className={[
              'flex flex-col gap-1 px-5 py-4',
              !isLastRow ? 'border-b border-border-default' : '',
              !isLastCol ? 'border-r border-border-default' : '',
            ].filter(Boolean).join(' ')}
          >
            <p className="font-display text-display-lg font-bold text-text-primary">
              {spec.value}
            </p>
            <p className="font-body text-body-md text-text-muted">
              {spec.label}
            </p>
          </div>
        )
      })}
    </div>
  )
}
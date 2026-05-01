// src/components/organisms/PropertyGrid.tsx
import PropertyCard from '@/components/molecules/PropertyCard'
import type { ComponentProps } from 'react'

type Property = ComponentProps<typeof PropertyCard>

type PropertyGridProps = {
  properties: Property[]
  layout?:    'grid' | 'list'
  columns?:   3 | 4
  className?: string
}

export default function PropertyGrid({ properties, layout = 'grid', columns = 3, className }: PropertyGridProps) {
  if (layout === 'list') {
    return (
      <div className={['flex flex-col gap-4', className].filter(Boolean).join(' ')}>
        {properties.map((p) => (
          <PropertyCard key={p.slug} {...p} layout="list" />
        ))}
      </div>
    )
  }

  return (
    <div
      className={[
        'grid gap-4',
        columns === 4
          ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4'
          : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
        className,
      ].filter(Boolean).join(' ')}
    >
      {properties.map((p) => (
        <PropertyCard key={p.slug} {...p} layout="grid" />
      ))}
    </div>
  )
}
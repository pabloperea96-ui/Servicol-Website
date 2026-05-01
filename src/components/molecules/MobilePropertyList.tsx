'use client'

import { useState } from 'react'
import PropertyCard from '@/components/molecules/PropertyCard'
import Button from '@/components/atoms/Button'
import type { ComponentProps } from 'react'

type CardProps = ComponentProps<typeof PropertyCard>

const BATCH = 4

export default function MobilePropertyList({ properties }: { properties: CardProps[] }) {
  const [count, setCount] = useState(BATCH)

  return (
    <div className="flex flex-col gap-4">
      {properties.slice(0, count).map(p => (
        <PropertyCard key={p.slug} {...p} />
      ))}
      {count < properties.length && (
        <Button
          variant="outline"
          size="md"
          className="w-full"
          onClick={() => setCount(c => Math.min(c + BATCH, properties.length))}
        >
          Ver más propiedades ({properties.length - count} restantes)
        </Button>
      )}
    </div>
  )
}

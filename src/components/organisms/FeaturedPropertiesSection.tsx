'use client'

// src/components/organisms/FeaturedPropertiesSection.tsx
import { useState } from 'react'
import Link from 'next/link'
import PropertyCard from '@/components/molecules/PropertyCard'
import type { ComponentProps } from 'react'
import type PropertyCardType from '@/components/molecules/PropertyCard'

type Property = ComponentProps<typeof PropertyCardType>

const INITIAL = 4
const INCREMENT = 2
const MAX = 12

type Props = {
  properties: Property[]
}

export default function FeaturedPropertiesSection({ properties }: Props) {
  const [visible, setVisible] = useState(INITIAL)

  const mobileProps  = properties.slice(0, visible)
  const canLoadMore  = visible < MAX && visible < properties.length

  return (
    <section className="py-[var(--section-y)] px-[var(--section-x)]">
      <div className="mx-auto max-w-[1440px] flex flex-col gap-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-display text-display-lg font-bold text-text-primary">
            Disponibles ahora
          </h2>
          <Link
            href="/portafolio"
            className="font-body text-body-md text-action-cta hover:opacity-70 transition-opacity duration-[var(--duration-fast)]"
          >
            Ver todos →
          </Link>
        </div>

        {/* Desktop — grid 4 columnas, todas las propiedades */}
        <div className="hidden md:grid gap-4 grid-cols-2 xl:grid-cols-4">
          {properties.map((p) => (
            <PropertyCard key={p.slug} {...p} />
          ))}
        </div>

        {/* Mobile — lista vertical con carga progresiva */}
        <div className="flex flex-col gap-4 md:hidden">
          {mobileProps.map((p) => (
            <PropertyCard key={p.slug} {...p} />
          ))}
          {canLoadMore && (
            <button
              onClick={() => setVisible((v) => Math.min(v + INCREMENT, MAX))}
              className="w-full rounded-md border border-border-default bg-bg-surface py-3 font-body text-body-md text-text-secondary hover:border-action-cta hover:text-action-cta transition-colors duration-[var(--duration-base)] cursor-pointer"
            >
              Ver más propiedades
            </button>
          )}
        </div>

      </div>
    </section>
  )
}

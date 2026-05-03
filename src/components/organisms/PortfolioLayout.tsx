// src/components/organisms/PortfolioLayout.tsx
'use client'

import PropertyGrid from '@/components/organisms/PropertyGrid'
import Pagination from '@/components/molecules/Pagination'
import type { ComponentProps } from 'react'
import type PropertyCard from '@/components/molecules/PropertyCard'

type Property = ComponentProps<typeof PropertyCard>

type PortfolioLayoutProps = {
  properties:    Property[]
  totalCount?:   number
  totalPages?:   number
  currentPage?:  number
  onPageChange?: (page: number) => void
  sidebar?:      React.ReactNode
  filterPill?:   React.ReactNode
  sortControl?:  React.ReactNode
  className?:    string
}

export default function PortfolioLayout({
  properties,
  totalCount,
  totalPages  = 1,
  currentPage = 1,
  onPageChange = () => {},
  sidebar,
  filterPill,
  sortControl,
  className,
}: PortfolioLayoutProps) {
  return (
    <div className={['flex gap-6 px-5 py-10 md:px-10', className].filter(Boolean).join(' ')}>

      {/* Sidebar — xl+ only */}
      {sidebar && (
        <aside className="hidden xl:block w-[220px] shrink-0">
          {sidebar}
        </aside>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col gap-6 min-w-0">

        {/* Toolbar — contador + filtros aplicados + orden */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <p className="font-body text-body-md text-text-secondary">
              {(totalCount ?? properties.length)} {(totalCount ?? properties.length) === 1 ? 'propiedad' : 'propiedades'}
            </p>
            {filterPill}
          </div>
          {sortControl}
        </div>

        {/* Grid fijo */}
        <PropertyGrid properties={properties} layout="grid" />

        {/* Paginación interna (solo si totalPages > 1 y se pasa onPageChange real) */}
        {totalPages > 1 && (
          <div className="flex justify-center pt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </div>
    </div>
  )
}

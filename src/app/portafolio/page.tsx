// src/app/portafolio/page.tsx — Server Component
import type { Metadata } from 'next'
import { Suspense }             from 'react'
import NavigationWrapper        from '@/components/organisms/NavigationWrapper'
import Footer                  from '@/components/organisms/Footer'
import PortfolioLayout         from '@/components/organisms/PortfolioLayout'
import Breadcrumb              from '@/components/molecules/Breadcrumb'
import FilterPanel             from '@/components/molecules/FilterPanel'
import PaginationController    from '@/components/molecules/PaginationController'
import CategoryBar             from '@/components/molecules/CategoryBar'
import MobilePropertyList      from '@/components/molecules/MobilePropertyList'
import MobileFilterDrawer      from '@/components/molecules/MobileFilterDrawer'
import ActiveFiltersBar        from '@/components/molecules/ActiveFiltersBar'
import SortSelect             from '@/components/molecules/SortSelect'
import FilterCountPill        from '@/components/molecules/FilterCountPill'
import { client }              from '@/sanity/lib/client'
import { ALL_PROPERTIES_QUERY } from '@/lib/queries'
import { filterProperties }    from '@/lib/filter-properties'
import { toCardProps }         from '@/lib/sanity-mappers'
import type { SanityProperty } from '@/lib/sanity-mappers'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Portafolio de propiedades',
  description:
    'Explora casas, apartamentos, lotes y locales en venta y arriendo en Duitama, Paipa, Tibasosa y Sogamoso.',
}

const BREADCRUMB = [
  { label: 'Inicio',     href: '/'         },
  { label: 'Portafolio'                    },
]

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>
}) {
  const params      = await searchParams
  const allProperties: SanityProperty[] = await client.fetch(ALL_PROPERTIES_QUERY)

  const { items, allItems, totalPages, totalCount } = filterProperties(allProperties, params)
  const currentPage  = Math.max(1, Number(params.pagina ?? 1))

  const cardItems    = items.map(toCardProps)
  const allCardItems = allItems.map(toCardProps)

  return (
    <>
      <NavigationWrapper />

      <main className="pt-[var(--nav-height)]">

        {/* Section header */}
        <div className="border-b border-border-default px-5 pt-8 pb-3 flex flex-col gap-5 md:px-12 md:pt-10">
          <Breadcrumb items={BREADCRUMB} />
          <h1 className="text-display-md text-text-primary font-display font-bold">
            Portafolio de propiedades
          </h1>
          {/* Pills de tipo + filtros activos — solo mobile */}
          <div className="md:hidden flex flex-col gap-3">
            <Suspense fallback={<div className="h-8" />}>
              <CategoryBar />
            </Suspense>
            <Suspense fallback={null}>
              <ActiveFiltersBar />
            </Suspense>
          </div>
        </div>

        {/* Desktop layout — md+ */}
        <div className="hidden md:block">
          <Suspense fallback={null}>
            <PortfolioLayout
              properties={cardItems}
              totalCount={totalCount}
              totalPages={0}
              currentPage={currentPage}
              sidebar={
                <Suspense fallback={null}>
                  <FilterPanel />
                </Suspense>
              }
              filterPill={
                <Suspense fallback={null}>
                  <FilterCountPill />
                </Suspense>
              }
              sortControl={
                <Suspense fallback={null}>
                  <SortSelect />
                </Suspense>
              }
            />
          </Suspense>
          <Suspense fallback={null}>
            <PaginationController
              totalPages={totalPages}
              currentPage={currentPage}
              className="flex justify-center pt-4 pb-12 px-10"
            />
          </Suspense>
        </div>

        {/* Mobile layout — < md */}
        <div className="md:hidden px-5 py-8 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <p className="font-body text-body-md text-text-muted shrink-0">
              {totalCount} {totalCount === 1 ? 'propiedad' : 'propiedades'}
            </p>
            <Suspense fallback={null}>
              <div className="flex-1 min-w-0">
                <SortSelect />
              </div>
            </Suspense>
            <Suspense fallback={null}>
              <MobileFilterDrawer>
                <FilterPanel />
              </MobileFilterDrawer>
            </Suspense>
          </div>
          <div className="flex flex-col gap-6">
            <Suspense fallback={null}>
              <FilterCountPill />
            </Suspense>
            <MobilePropertyList properties={allCardItems} />
          </div>
        </div>

      </main>

      <Footer />
    </>
  )
}

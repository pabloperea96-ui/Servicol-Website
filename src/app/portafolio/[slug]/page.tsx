// src/app/portafolio/[slug]/page.tsx — Server Component
import { notFound }   from 'next/navigation'
import Link           from 'next/link'
import Navigation     from '@/components/organisms/Navigation'
import Footer         from '@/components/organisms/Footer'
import Breadcrumb     from '@/components/molecules/Breadcrumb'
import Badge          from '@/components/atoms/Badge'
import SpecGrid       from '@/components/molecules/SpecGrid'
import Pill           from '@/components/atoms/Pill'
import PropertyCard   from '@/components/molecules/PropertyCard'
import ImageGallery   from '@/components/molecules/ImageGallery'
import PriceInfoBar   from '@/components/molecules/PriceInfoBar'
import PropertyMap    from '@/components/molecules/PropertyMap'
import { client }     from '@/sanity/lib/client'
import {
  PROPERTY_BY_SLUG_QUERY,
  SIMILAR_PROPERTIES_QUERY,
  ALL_SLUGS_QUERY,
}                     from '@/lib/queries'
import {
  toCardProps,
  toAdvisor,
  toImageUrls,
}                     from '@/lib/sanity-mappers'
import type { SanityProperty } from '@/lib/sanity-mappers'
import type { ComponentProps } from 'react'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(ALL_SLUGS_QUERY)
  return slugs.map(s => ({ slug: s.slug }))
}

type CardProps = ComponentProps<typeof PropertyCard>

function buildSpecs(p: SanityProperty, max: number) {
  const beds  = p.bedrooms  ?? 0
  const baths = p.bathrooms ?? 0
  const area  = p.area      ?? 0

  const all = [
    { value: `${area} m²`,              label: 'Área total'  },
    ...(beds  > 0 ? [{ value: String(beds),  label: 'Habitaciones' }] : []),
    ...(baths > 0 ? [{ value: String(baths), label: 'Baños'        }] : []),
    ...(p.floor   ? [{ value: String(p.floor),   label: 'Piso'    }] : []),
    { value: p.parking ? '1' : '—',     label: 'Parqueadero' },
    ...(p.stratum ? [{ value: String(p.stratum), label: 'Estrato'  }] : []),
  ]
  return all.slice(0, max)
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const property: SanityProperty | null = await client.fetch(
    PROPERTY_BY_SLUG_QUERY,
    { slug },
  )
  if (!property) notFound()

  const similarRaw: SanityProperty[] = await client.fetch(
    SIMILAR_PROPERTIES_QUERY,
    { propertyType: property.propertyType, slug },
  )

  // Completar hasta 4 con propiedades de otro tipo si no hay suficientes
  let similar = similarRaw
  if (similar.length < 4) {
    const others: SanityProperty[] = await client.fetch(
      `*[_type == "property" && status == "disponible" && slug.current != $slug] | order(publishedAt desc)[0...${4 - similar.length}] {
        _id, title, "slug": slug.current, operation, propertyType, price,
        "area": builtArea, bedrooms, bathrooms, parking, zone, neighborhood,
        "location": neighborhood, featured, status,
        "mainImageUrl": mainImage.asset->url, "mainImageAlt": mainImage.alt
      }`,
      { slug },
    )
    similar = [...similar, ...others]
  }

  const advisor     = toAdvisor(property.advisor, property.title)
  const images      = toImageUrls(property)
  const mobileSpecs = buildSpecs(property, 4)
  const desktopSpecs = buildSpecs(property, 6)
  const address     = property.address ?? property.location

  const desktopCrumbs = [
    { label: 'Inicio',     href: '/'           },
    { label: 'Portafolio', href: '/portafolio' },
    { label: property.title                     },
  ]

  const similarCards: CardProps[] = similar.map(p => toCardProps(p))

  return (
    <>
      <Navigation />

      <main className="pt-[var(--nav-height)]">

        {/* Breadcrumb */}
        <div className="px-6 pt-8 pb-3 md:px-12 md:pt-16">
          <Breadcrumb items={desktopCrumbs} />
          <nav className="flex items-center font-body text-[12px] leading-[12px] md:hidden">
            <Link
              href="/portafolio"
              className="text-text-muted hover:text-text-primary transition-colors duration-base"
            >
              ← Portafolio
            </Link>
          </nav>
        </div>

        {/* Contenido */}
        <div className="flex flex-col gap-6 px-6 pt-3 pb-6 md:px-12 md:pt-8 md:pb-12">

          {/* Heading */}
          <div className="flex flex-col items-start gap-4">
            <Badge type={property.operation} />
            <div className="flex flex-col gap-1 w-full">
              <h1 className="font-display text-display-lg font-bold tracking-tight md:text-display-xl">
                {property.title}
              </h1>
              <p className="font-body text-body-lg font-light text-text-secondary">
                {address}
              </p>
            </div>
          </div>

          <ImageGallery images={images} title={property.title} />

          {advisor && (
            <PriceInfoBar
              price={property.price}
              operation={property.operation}
              advisor={advisor}
              propertyCode={property.code ?? '—'}
              whatsappUrl={advisor.whatsappUrl}
            />
          )}

          {/* Specs */}
          <div className="md:hidden">
            <SpecGrid specs={mobileSpecs} columns={2} />
          </div>
          <div className="hidden md:block">
            <SpecGrid specs={desktopSpecs} columns={3} />
          </div>

          {/* Descripción */}
          {property.description && (
            <section className="flex flex-col gap-1">
              <h2 className="font-display text-display-md font-extrabold md:text-display-lg md:font-bold">
                Descripción
              </h2>
              <p className="whitespace-pre-line font-body text-body-md leading-relaxed text-text-secondary">
                {property.description}
              </p>
            </section>
          )}

          {/* Amenidades */}
          {property.amenities && property.amenities.length > 0 && (
            <section className="flex flex-col gap-4">
              <h2 className="font-display text-display-md font-extrabold md:text-display-lg md:font-bold">
                <span className="md:hidden">Detalles de la propiedad</span>
                <span className="hidden md:inline">Amenidades</span>
              </h2>
              <div className="flex flex-wrap" style={{ columnGap: '16px', rowGap: '8px' }}>
                {property.amenities.map(a => (
                  <Pill key={a} label={a} />
                ))}
              </div>
            </section>
          )}

          {/* Ubicación */}
          <PropertyMap address={address} />

          {/* Propiedades similares */}
          {similarCards.length > 0 && (
            <section className="flex flex-col gap-6">
              <h2 className="font-display text-display-md font-extrabold md:text-display-lg md:font-bold">
                Propiedades similares
              </h2>
              <div className="md:hidden -mx-6 flex gap-4 overflow-x-auto px-6 pb-2 snap-x snap-mandatory">
                {similarCards.map(p => (
                  <div key={p.slug} className="w-[300px] shrink-0 snap-start">
                    <PropertyCard {...p} mode="link" />
                  </div>
                ))}
              </div>
              <div className="hidden md:grid md:grid-cols-4 md:gap-5">
                {similarCards.map(p => (
                  <PropertyCard key={p.slug} {...p} mode="link" />
                ))}
              </div>
            </section>
          )}

        </div>
      </main>

      <Footer />
    </>
  )
}

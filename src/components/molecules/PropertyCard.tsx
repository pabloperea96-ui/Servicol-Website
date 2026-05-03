'use client'

// src/components/molecules/PropertyCard.tsx
import Link from 'next/link'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

type PropertyCardProps = {
  slug:         string
  title:        string
  price:        number
  area:         number
  bedrooms:     number
  bathrooms:    number
  location:     string
  operation:    'venta' | 'arriendo'
  imageSrc?:    string
  layout?:      'grid' | 'list'
  mode?:        'link' | 'actions'
  whatsappUrl?: string
}

function formatCOP(n: number) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)
}

function Specs({ area, bedrooms, bathrooms, location }: Pick<PropertyCardProps, 'area' | 'bedrooms' | 'bathrooms' | 'location'>) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1">
      <span className="flex items-center gap-1 font-body text-[11px] text-text-secondary">
        <Icon type="Area" size={14} /> {area} m²
      </span>
      {bedrooms > 0 && (
        <span className="flex items-center gap-1 font-body text-[11px] text-text-secondary">
          <Icon type="Bed" size={14} /> {bedrooms} hab
        </span>
      )}
      {bathrooms > 0 && (
        <span className="flex items-center gap-1 font-body text-[11px] text-text-secondary">
          <Icon type="Bath" size={14} /> {bathrooms} {bathrooms === 1 ? 'baño' : 'baños'}
        </span>
      )}
      <span className="flex items-center gap-1 font-body text-[11px] text-text-secondary">
        <Icon type="Pin" size={14} /> {location}
      </span>
    </div>
  )
}

const cardShell = 'overflow-hidden rounded-lg border border-border-default bg-bg-surface transition-[border-color,box-shadow] duration-[var(--duration-base)]'
const cardHover = 'hover:border-action-cta hover:shadow-sm'

export default function PropertyCard({
  slug, title, price, area, bedrooms, bathrooms, location,
  operation, imageSrc, layout = 'grid', mode = 'link', whatsappUrl,
}: PropertyCardProps) {
  const isGrid    = layout === 'grid'
  const isActions = mode === 'actions'

  const image = isGrid ? (
    <div className="relative h-[180px] w-full bg-bg-subtle shrink-0">
      {imageSrc && <img src={imageSrc} alt={title} className="absolute inset-0 size-full object-cover" />}
      <Badge type={operation} className="absolute left-3 top-3" />
    </div>
  ) : (
    <div className="relative w-[200px] shrink-0 bg-bg-subtle">
      {imageSrc && <img src={imageSrc} alt={title} className="absolute inset-0 size-full object-cover" />}
      <Badge type={operation} className="absolute left-[10px] top-[10px]" />
    </div>
  )

  const info = (
    <>
      <h3 className="font-display text-display-sm font-semibold text-text-primary">{title}</h3>
      <p className="font-display text-[20px] font-bold text-action-cta">{formatCOP(price)}</p>
      <Specs area={area} bedrooms={bedrooms} bathrooms={bathrooms} location={location} />
    </>
  )

  const actions = (
    <>
      <div className="h-px w-full bg-border-default" aria-hidden />
      <div className={`flex gap-2 ${isGrid ? 'flex-col' : ''}`}>
        {whatsappUrl && (
          <Button
            as="a"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="cta"
            size="sm"
            icon={<Icon type="WhatsApp" size={16} aria-hidden={false} />}
            className="flex-1"
          >
            Agendar visita
          </Button>
        )}
        <Button as={Link} href={`/portafolio/${slug}`} variant="text" size="sm" className="flex-1">
          Ver más
        </Button>
      </div>
    </>
  )

  /* ── mode="link": toda la card navega al detalle ── */
  if (!isActions) {
    return (
      <Link
        href={`/portafolio/${slug}`}
        className={`${isGrid ? 'flex flex-col' : 'flex'} ${cardShell} ${cardHover} cursor-pointer`}
      >
        {image}
        <div className={`flex flex-col gap-3 ${isGrid ? 'p-5' : 'flex-1 px-5 py-4'}`}>
          {info}
        </div>
      </Link>
    )
  }

  /* ── mode="actions": card estática con botones al fondo ── */
  return (
    <article className={`${isGrid ? 'flex flex-col' : 'flex'} ${cardShell}`}>
      {image}
      <div className={`flex flex-col gap-3 ${isGrid ? 'p-5' : 'flex-1 px-5 py-4'}`}>
        {info}
        {actions}
      </div>
    </article>
  )
}

// src/components/molecules/UnitTypeCard.tsx
import Divider from '@/components/atoms/Divider'
import Icon from '@/components/atoms/Icon'
import { formatCOP } from '@/lib/formatPrice'
import { mapPropertyType } from '@/lib/sanity-mappers'

type UnitTypeCardProps = {
  propertyType?: string | null
  name: string
  area: number
  bedrooms?: number | null
  bathrooms?: number | null
  price: number
  className?: string
}

export default function UnitTypeCard({
  propertyType, name, area, bedrooms, bathrooms, price, className,
}: UnitTypeCardProps) {
  const specs = [
    { icon: 'Area' as const, label: `${area} m²` },
    ...(bedrooms != null
      ? [{ icon: 'Bed' as const, label: `${bedrooms} hab` }]
      : []),
    ...(bathrooms != null
      ? [{ icon: 'Bath' as const, label: `${bathrooms} ${bathrooms === 1 ? 'baño' : 'baños'}` }]
      : []),
  ]

  return (
    <article
      className={[
        'flex flex-col gap-[14px] rounded-lg border border-border-default bg-bg-surface p-5',
        className,
      ].filter(Boolean).join(' ')}
    >
      <div className="flex flex-col gap-1.5">
        {propertyType && (
          <p className="text-card-type-eyebrow text-text-muted">{mapPropertyType(propertyType)}</p>
        )}
        <h3 className="font-display text-display-sm font-semibold text-text-primary">{name}</h3>
      </div>

      <div className="flex items-center gap-4">
        {specs.map(({ icon, label }) => (
          <span key={icon} className="flex items-center gap-1.5 font-body text-[12px] text-text-muted">
            <Icon type={icon} size={16} />
            {label}
          </span>
        ))}
      </div>

      <Divider />

      <div className="flex flex-col gap-1">
        <p className="font-body text-[12px] text-text-muted">Desde</p>
        <p className="font-display text-display-sm font-bold text-action-cta">{formatCOP(price)}</p>
      </div>
    </article>
  )
}

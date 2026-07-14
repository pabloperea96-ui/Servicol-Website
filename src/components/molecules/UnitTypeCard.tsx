// src/components/molecules/UnitTypeCard.tsx
import Divider from '@/components/atoms/Divider'
import Icon from '@/components/atoms/Icon'
import { formatCOP } from '@/lib/formatPrice'

type UnitTypeCardProps = {
  name: string
  area: number
  bedrooms: number
  bathrooms: number
  price: number
  className?: string
}

export default function UnitTypeCard({
  name, area, bedrooms, bathrooms, price, className,
}: UnitTypeCardProps) {
  const specs = [
    { icon: 'Area' as const, label: `${area} m²` },
    { icon: 'Bed' as const,  label: `${bedrooms} hab` },
    { icon: 'Bath' as const, label: `${bathrooms} ${bathrooms === 1 ? 'baño' : 'baños'}` },
  ]

  return (
    <article
      className={[
        'flex flex-col gap-[14px] rounded-lg border border-border-default bg-bg-surface p-5',
        className,
      ].filter(Boolean).join(' ')}
    >
      <h3 className="font-display text-display-sm font-semibold text-text-primary">{name}</h3>

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

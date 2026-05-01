// src/components/molecules/CategoryCard.tsx
import Link from 'next/link'
import Icon from '@/components/atoms/Icon'
import type { IconType } from '@/components/atoms/Icon'

type CategoryCardProps = {
  title:      string
  subtitle?:  string
  icon:       IconType
  href?:      string
  className?: string
}

export default function CategoryCard({ title, subtitle, icon, href = '#', className }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={[
        'flex flex-col items-center gap-2 md:gap-4 rounded-lg border border-border-default bg-bg-surface',
        'p-4 md:p-8 w-full',
        'hover:border-action-cta hover:shadow-sm transition-all duration-base',
        className,
      ].filter(Boolean).join(' ')}
    >
      <span className="block md:hidden"><Icon type={icon} size={36} className="text-text-primary" /></span>
      <span className="hidden md:block"><Icon type={icon} size={48} className="text-text-primary" /></span>
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="font-display text-[13px] md:text-display-sm font-semibold text-text-primary">
          {title}
        </p>
        {subtitle && (
          <p className="font-body text-[11px] md:text-[12px] text-text-muted">{subtitle}</p>
        )}
      </div>
    </Link>
  )
}

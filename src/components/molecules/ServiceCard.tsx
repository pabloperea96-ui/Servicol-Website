// src/components/molecules/ServiceCard.tsx
import Link from 'next/link'
import Divider from '@/components/atoms/Divider'
import Icon from '@/components/atoms/Icon'
import { CheckCircle2 } from 'lucide-react'

type ServiceCardProps = {
  title: string
  description: string
  features: string[]
  href?: string
  ctaLabel?: string
  className?: string
}

export default function ServiceCard({
  title, description, features, href = '#', ctaLabel = 'Saber más', className,
}: ServiceCardProps) {
  return (
    <article
      className={[
        'flex flex-col gap-4 rounded-lg border border-border-default bg-bg-surface p-8 w-[400px]',
        className,
      ].filter(Boolean).join(' ')}
    >
      <h3 className="font-display text-display-sm font-bold text-text-primary">{title}</h3>
      <p className="font-body text-body-md text-text-muted leading-[21px]">{description}</p>
      <div className="flex flex-col gap-2">
        {features.map((feature, i) => (
          <div key={i} className="flex items-center gap-2">
            <CheckCircle2 size={16} className="shrink-0 text-action-cta" aria-hidden />
            <p className="font-body text-body-md text-text-muted">{feature}</p>
          </div>
        ))}
      </div>
      <Divider />
      <Link
        href={href}
        className="inline-flex items-center gap-2 font-body text-body-md font-medium text-text-primary hover:text-action-cta transition-colors duration-base"
      >
        {ctaLabel} →
      </Link>
    </article>
  )
}
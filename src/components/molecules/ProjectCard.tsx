// src/components/molecules/ProjectCard.tsx
import Link from 'next/link'
import Badge from '@/components/atoms/Badge'
import ProgressBar from '@/components/atoms/ProgressBar'
import { formatCOP } from '@/lib/formatPrice'

type ProjectCardProps = {
  slug: string
  title: string
  startingPrice: number
  progressValue: number
  progressValueText?: string
  imageSrc?: string
  imageAlt?: string
  className?: string
}

export default function ProjectCard({
  slug, title, startingPrice, progressValue, progressValueText, imageSrc, imageAlt, className,
}: ProjectCardProps) {
  return (
    <Link
      href={`/proyectos/${slug}`}
      className={[
        'flex flex-col overflow-hidden rounded-lg border border-border-default bg-bg-surface w-full',
        'transition-[border-color,box-shadow] duration-[var(--duration-base)] hover:border-action-cta hover:shadow-sm cursor-pointer',
        className,
      ].filter(Boolean).join(' ')}
    >
      <div className="relative h-[200px] w-full bg-bg-subtle shrink-0">
        {imageSrc && <img src={imageSrc} alt={imageAlt ?? title} className="absolute inset-0 size-full object-cover" />}
        <Badge type="nuevo" className="absolute left-3 top-3" />
      </div>

      <div className="flex flex-col gap-[14px] p-5">
        <h3 className="font-display text-display-sm font-semibold text-text-primary">{title}</h3>

        <ProgressBar value={progressValue} valueText={progressValueText} label="Avance" />

        <div className="flex flex-col gap-1">
          <p className="font-body text-[12px] text-text-muted">Desde</p>
          <p className="font-display text-display-sm font-bold text-action-cta">{formatCOP(startingPrice)}</p>
        </div>
      </div>
    </Link>
  )
}

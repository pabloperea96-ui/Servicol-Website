// src/components/molecules/ProjectCard.tsx
import Link from 'next/link'
import Badge from '@/components/atoms/Badge'
import ProgressBar from '@/components/atoms/ProgressBar'
import Button from '@/components/atoms/Button'
import Divider from '@/components/atoms/Divider'
import Icon from '@/components/atoms/Icon'

type ProjectCardProps = {
  slug: string
  title: string
  startingPrice: number
  progressPct: number
  imageSrc?: string
  whatsappUrl?: string
  className?: string
}

function formatCOP(n: number) {
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)
}

export default function ProjectCard({
  slug, title, startingPrice, progressPct, imageSrc, whatsappUrl, className,
}: ProjectCardProps) {
  return (
    <article
      className={[
        'flex flex-col overflow-hidden rounded-lg border border-border-default bg-bg-surface w-[300px]',
        className,
      ].filter(Boolean).join(' ')}
    >
      <div className="relative h-[200px] w-full bg-bg-subtle shrink-0">
        {imageSrc && <img src={imageSrc} alt={title} className="absolute inset-0 size-full object-cover" />}
        <Badge type="nuevo" className="absolute left-3 top-3" />
      </div>

      <div className="flex flex-col gap-[14px] p-5">
        <h3 className="font-display text-display-sm font-semibold text-text-primary">{title}</h3>

        <ProgressBar value={progressPct} label="Avance" />

        <div className="flex flex-col gap-1">
          <p className="font-body text-[12px] text-text-muted">Desde</p>
          <p className="font-display text-display-sm font-bold text-action-cta">{formatCOP(startingPrice)}</p>
        </div>

        <Divider />

        <div className="flex gap-2">
          <Button as={Link} href={`/proyectos/${slug}`} variant="cta" size="sm" className="flex-1">
            Ver Proyecto
          </Button>
          {whatsappUrl && (
            <Button
              as="a"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="sm"
              icon={<Icon type="WhatsApp" size={16} aria-hidden={false} />}
              className="flex-1"
            >
              Contactar
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
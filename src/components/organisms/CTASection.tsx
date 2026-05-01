// src/components/organisms/CTASection.tsx
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

type CTASectionProps = {
  title?: string
  subtitle?: string
  ctaLabel?: string
  whatsappUrl?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export default function CTASection({
  title = 'Te ayudamos a encontrar tu próxima vivienda',
  subtitle = 'Escríbenos por WhatsApp o agenda una cita con uno de nuestros asesores.',
  ctaLabel = 'Agenda tu cita',
  whatsappUrl = 'https://wa.me/573112345678',
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) {
  return (
    <section className="flex flex-col items-center justify-center gap-6 px-5 py-20 text-center md:px-20">
      <div className="flex flex-col gap-4 max-w-[619px]">
        <h2 className="font-display text-display-lg font-bold leading-[32px] tracking-[-0.2px] text-text-primary">
          {title}
        </h2>
        <p className="font-body text-body-lg font-light leading-[28px] text-text-secondary">
          {subtitle}
        </p>
      </div>
      <div className="flex flex-col gap-3 md:flex-row">
        <Button
          as="a"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="cta"
          size="lg"
          icon={<Icon type="WhatsApp" size={18} aria-hidden={false} />}
        >
          {ctaLabel}
        </Button>
        {secondaryLabel && secondaryHref && (
          <Button as="a" href={secondaryHref} variant="outline" size="lg">
            {secondaryLabel}
          </Button>
        )}
      </div>
    </section>
  )
}
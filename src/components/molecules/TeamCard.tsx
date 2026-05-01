// src/components/molecules/TeamCard.tsx
import Avatar from '@/components/atoms/Avatar'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'

type TeamCardProps = {
  name: string
  role: string
  initials?: string
  photoSrc?: string
  whatsappUrl?: string
  className?: string
}

export default function TeamCard({
  name, role, initials, photoSrc, whatsappUrl, className,
}: TeamCardProps) {
  return (
    <article
      className={[
        'flex flex-col items-center gap-3 rounded-lg border border-border-default bg-bg-surface p-6 w-[200px]',
        className,
      ].filter(Boolean).join(' ')}
    >
      <Avatar src={photoSrc} initials={initials} size="md" alt={name} />
      <div className="flex flex-col items-center gap-1 text-center w-full">
        <p className="font-display text-[16px] font-semibold leading-[17px] text-text-primary">{name}</p>
        <p className="font-body text-[12px] leading-[12px] text-text-muted">{role}</p>
      </div>
      {whatsappUrl && (
        <Button
          as="a"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="cta"
          size="sm"
          icon={<Icon type="WhatsApp" size={16} aria-hidden={false} />}
          className="w-full"
        >
          Contactar
        </Button>
      )}
    </article>
  )
}
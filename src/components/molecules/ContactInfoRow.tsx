// src/components/molecules/ContactInfoRow.tsx
import Icon from '@/components/atoms/Icon'
import type { IconType } from '@/components/atoms/Icon'

type ContactInfoType = 'direccion' | 'horario' | 'correo' | 'telefono'

type ContactInfoRowProps = {
  type: ContactInfoType
  lines: string[]
  className?: string
}

const ICON_MAP: Record<ContactInfoType, IconType> = {
  direccion: 'Pin',
  horario:   'Clock',
  correo:    'Mail',
  telefono:  'Phone',
}

export default function ContactInfoRow({ type, lines, className }: ContactInfoRowProps) {
  return (
    <div className={['flex items-start gap-3', className].filter(Boolean).join(' ')}>
      <Icon type={ICON_MAP[type]} size={18} className="mt-0.5 shrink-0 text-text-secondary" />
      <div className="font-body text-body-md text-text-secondary leading-[21px]">
        {lines.map((line, i) => <p key={i}>{line}</p>)}
      </div>
    </div>
  )
}
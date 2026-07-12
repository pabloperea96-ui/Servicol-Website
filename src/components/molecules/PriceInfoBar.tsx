// src/components/molecules/PriceInfoBar.tsx
import Avatar  from '@/components/atoms/Avatar'
import Button  from '@/components/atoms/Button'
import Divider from '@/components/atoms/Divider'
import type { Advisor } from '@/lib/mock-properties'
import { formatCOP } from '@/lib/formatPrice'

type Props = {
  price:         number
  advisor:       Advisor
  whatsappUrl:   string
  operation?:    'venta' | 'arriendo'
  propertyCode?: string
  // Overrides para fichas que no son de propiedad (p. ej. proyectos)
  priceLabel?:   string
  meta?:         { label: string; value: string }
  ctaLabel?:     string
}

function AgentBlock({ advisor }: { advisor: Advisor }) {
  return (
    <div className="flex items-center gap-2">
      <Avatar src={advisor.photoUrl} initials={advisor.initials} size="md" alt={advisor.name} />
      <div>
        <p className="font-display text-[16px] font-semibold leading-[17px] text-text-primary">
          {advisor.name}
        </p>
        <p className="font-body text-[12px] leading-[12px] text-text-muted">
          {advisor.role}
        </p>
      </div>
    </div>
  )
}

function MetaBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-display text-[16px] font-semibold leading-[17px] text-text-primary">
        {label}
      </p>
      <p className="font-body text-[12px] leading-[12px] text-text-muted">
        {value}
      </p>
    </div>
  )
}

export default function PriceInfoBar({
  price, advisor, whatsappUrl, operation, propertyCode, priceLabel, meta, ctaLabel,
}: Props) {
  const resolvedPriceLabel =
    priceLabel ?? (operation === 'arriendo' ? 'Canon mensual' : 'Precio de venta')
  const resolvedMeta =
    meta ?? (propertyCode ? { label: 'Código inmueble', value: propertyCode } : null)

  const cta = (
    <Button
      as="a"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      variant="cta"
      className="w-full md:w-auto"
    >
      {ctaLabel ?? 'Agendar cita'}
    </Button>
  )

  return (
    <>
      {/* ── Mobile ─────────────────────────────────────────── */}
      <div
        className="md:hidden flex flex-col gap-4 overflow-hidden rounded-lg border border-border-default bg-bg-surface"
        style={{ padding: '24px 16px' }}
      >
        <div className="flex flex-col gap-1">
          <p className="text-body-md text-text-primary">
            {resolvedPriceLabel}
          </p>
          <p className="font-display text-display-xl font-bold text-action-cta">
            {formatCOP(price)}
          </p>
        </div>

        <Divider />
        <AgentBlock advisor={advisor} />

        {resolvedMeta && (
          <>
            <Divider />
            <MetaBlock label={resolvedMeta.label} value={resolvedMeta.value} />
          </>
        )}

        <Divider />
        {cta}
      </div>

      {/* ── Desktop ────────────────────────────────────────── */}
      <div className="hidden md:flex items-center gap-4 overflow-hidden rounded-lg border border-border-default bg-bg-surface px-4 py-6">
        <div className="flex-1 flex flex-col gap-1">
          <p className="text-body-md text-text-primary">
            {resolvedPriceLabel}
          </p>
          <p className="font-display text-display-2xl font-extrabold tracking-tight text-action-cta">
            {formatCOP(price)}
          </p>
        </div>

        <Divider direction="vertical" />

        <div className="shrink-0 px-6">
          <AgentBlock advisor={advisor} />
        </div>

        {resolvedMeta && (
          <>
            <Divider direction="vertical" />
            <div className="shrink-0 px-6">
              <MetaBlock label={resolvedMeta.label} value={resolvedMeta.value} />
            </div>
          </>
        )}

        <Divider direction="vertical" />

        <div className="shrink-0 px-6">
          {cta}
        </div>
      </div>
    </>
  )
}

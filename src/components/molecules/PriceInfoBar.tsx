// src/components/molecules/PriceInfoBar.tsx
import Avatar  from '@/components/atoms/Avatar'
import Button  from '@/components/atoms/Button'
import Divider from '@/components/atoms/Divider'
import type { Advisor } from '@/lib/mock-properties'

type Props = {
  price:        number
  operation:    'venta' | 'arriendo'
  advisor:      Advisor
  propertyCode: string
  whatsappUrl:  string
}

function formatCOP(n: number) {
  return new Intl.NumberFormat('es-CO', {
    style:                 'currency',
    currency:              'COP',
    maximumFractionDigits: 0,
  }).format(n)
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

function CodeBlock({ propertyCode }: { propertyCode: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-display text-[16px] font-semibold leading-[17px] text-text-primary">
        Código inmueble
      </p>
      <p className="font-body text-[12px] leading-[12px] text-text-muted">
        {propertyCode}
      </p>
    </div>
  )
}

export default function PriceInfoBar({ price, operation, advisor, propertyCode, whatsappUrl }: Props) {
  const priceLabel = operation === 'venta' ? 'Precio de venta' : 'Canon mensual'

  const cta = (
    <Button
      as="a"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      variant="cta"
      className="w-full md:w-auto"
    >
      Agendar cita
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
            {priceLabel}
          </p>
          <p className="font-display text-display-xl font-bold text-action-cta">
            {formatCOP(price)}
          </p>
        </div>

        <Divider />
        <AgentBlock advisor={advisor} />

        <Divider />
        <CodeBlock propertyCode={propertyCode} />

        <Divider />
        {cta}
      </div>

      {/* ── Desktop ────────────────────────────────────────── */}
      <div className="hidden md:flex items-center gap-4 overflow-hidden rounded-lg border border-border-default bg-bg-surface px-4 py-6">
        <div className="flex-1 flex flex-col gap-1">
          <p className="text-body-md text-text-primary">
            {priceLabel}
          </p>
          <p className="font-display text-display-2xl font-extrabold tracking-tight text-action-cta">
            {formatCOP(price)}
          </p>
        </div>

        <Divider direction="vertical" />

        <div className="shrink-0 px-6">
          <AgentBlock advisor={advisor} />
        </div>

        <Divider direction="vertical" />

        <div className="shrink-0 px-6">
          <CodeBlock propertyCode={propertyCode} />
        </div>

        <Divider direction="vertical" />

        <div className="shrink-0 px-6">
          {cta}
        </div>
      </div>
    </>
  )
}

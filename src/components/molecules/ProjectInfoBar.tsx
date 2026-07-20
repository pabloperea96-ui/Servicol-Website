// src/components/molecules/ProjectInfoBar.tsx
import Button  from '@/components/atoms/Button'
import Divider from '@/components/atoms/Divider'
import Icon    from '@/components/atoms/Icon'
import ProjectProgress from '@/components/molecules/ProjectProgress'
import { AgentBlock } from '@/components/molecules/PriceInfoBar'
import type { Advisor } from '@/lib/mock-properties'

type Props = {
  progressValue:      number
  progressValueText?: string
  startDate?:         string
  estimatedDelivery?: string
  advisor:            Advisor
  whatsappUrl:        string
}

export default function ProjectInfoBar({
  progressValue, progressValueText, startDate, estimatedDelivery, advisor, whatsappUrl,
}: Props) {
  const progress = (
    <ProjectProgress
      progressValue={progressValue}
      progressValueText={progressValueText}
      startDate={startDate}
      estimatedDelivery={estimatedDelivery}
    />
  )

  const cta = (
    <Button
      as="a"
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      variant="cta"
      icon={<Icon type="WhatsApp" size={18} aria-hidden={false} />}
      className="w-full md:w-auto"
    >
      Contactar
    </Button>
  )

  return (
    <>
      {/* ── Mobile ─────────────────────────────────────────── */}
      <div
        className="md:hidden flex flex-col gap-4 overflow-hidden rounded-lg border border-border-default bg-bg-surface"
        style={{ padding: '24px 16px' }}
      >
        {progress}

        <Divider />
        <AgentBlock advisor={advisor} />

        <Divider />
        {cta}
      </div>

      {/* ── Desktop ────────────────────────────────────────── */}
      <div className="hidden md:flex items-center gap-4 overflow-hidden rounded-lg border border-border-default bg-bg-surface px-4 py-6">
        <div className="flex-1">
          {progress}
        </div>

        <Divider direction="vertical" />

        <div className="shrink-0 px-6">
          <AgentBlock advisor={advisor} />
        </div>

        <Divider direction="vertical" />

        <div className="shrink-0 px-6">
          {cta}
        </div>
      </div>
    </>
  )
}

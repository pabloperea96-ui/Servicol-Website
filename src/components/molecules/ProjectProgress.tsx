// src/components/molecules/ProjectProgress.tsx
import ProgressBar from '@/components/atoms/ProgressBar'
import { formatMonthYear } from '@/lib/formatPrice'

type ProjectProgressProps = {
  progressValue: number
  progressValueText?: string
  startDate?: string
  estimatedDelivery?: string
  className?: string
}

function DateBlock({ label, value, alignEnd }: { label: string; value: string; alignEnd?: boolean }) {
  return (
    <div className={['flex flex-col gap-1', alignEnd ? 'items-end text-right' : ''].filter(Boolean).join(' ')}>
      <p className="font-body text-[12px] text-text-muted">{label}</p>
      <p className="font-display text-display-sm font-semibold text-text-primary">{value}</p>
    </div>
  )
}

export default function ProjectProgress({
  progressValue, progressValueText, startDate, estimatedDelivery, className,
}: ProjectProgressProps) {
  return (
    <div className={['flex flex-col gap-4', className].filter(Boolean).join(' ')}>
      <ProgressBar value={progressValue} valueText={progressValueText} label="Avance del proyecto" />

      {(startDate || estimatedDelivery) && (
        <div className="flex justify-between gap-4">
          {startDate && <DateBlock label="Inicio de obra" value={formatMonthYear(startDate)} />}
          {estimatedDelivery && (
            <DateBlock label="Entrega estimada" value={formatMonthYear(estimatedDelivery)} alignEnd />
          )}
        </div>
      )}
    </div>
  )
}

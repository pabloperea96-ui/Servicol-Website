type ProgressBarProps = {
  value: number          // 0–100
  label?: string
  valueText?: string     // overrides the "X% completado" text (e.g. "En planos")
  showLabel?: boolean
  className?: string
}

export default function ProgressBar({
  value,
  label = 'Avance del proyecto',
  valueText,
  showLabel = true,
  className,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={['flex flex-col gap-[6px] w-full', className].filter(Boolean).join(' ')}>
      {showLabel && (
        <div className="flex justify-between font-body text-[length:var(--font-size-progress-label)] font-medium text-text-secondary">
          <span>{label}</span>
          <span>{valueText ?? `${clamped}% completado`}</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={valueText}
        aria-label={label}
        className="relative h-[6px] w-full overflow-hidden rounded-full bg-bg-subtle"
      >
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-action-cta transition-[width] duration-slow ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}

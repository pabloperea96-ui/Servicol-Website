type RatingProps = {
  value: number   // 1–5
  max?: number
  className?: string
}

function StarFilled({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

function StarEmpty({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}

export default function Rating({ value, max = 5, className }: RatingProps) {
  const clamped = Math.min(max, Math.max(1, Math.round(value)))

  return (
    <div
      role="img"
      aria-label={`${clamped} de ${max} estrellas`}
      className={['flex items-center gap-1', className].filter(Boolean).join(' ')}
    >
      {Array.from({ length: max }, (_, i) => (
        i < clamped
          ? <StarFilled key={i} className="size-6 text-status-star" />
          : <StarEmpty key={i} className="size-6 text-plata" />
      ))}
    </div>
  )
}

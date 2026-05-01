type DotProps = {
  active?: boolean
  className?: string
}

export default function Dot({ active = false, className }: DotProps) {
  return (
    <span
      className={[
        'block rounded-full transition-all duration-base ease-out',
        active ? 'w-6 h-2 bg-white' : 'size-2 bg-white/35',
        className,
      ].filter(Boolean).join(' ')}
      aria-hidden
    />
  )
}

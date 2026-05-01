type DividerProps = {
  direction?: 'horizontal' | 'vertical'
  className?: string
}

export default function Divider({ direction = 'horizontal', className }: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={direction}
      className={[
        'bg-border-default shrink-0',
        direction === 'vertical' ? 'w-px self-stretch' : 'h-px w-full',
        className,
      ].filter(Boolean).join(' ')}
    />
  )
}

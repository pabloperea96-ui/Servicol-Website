'use client'

import Link from 'next/link'

type ButtonVariant = 'primary' | 'cta' | 'outline' | 'text'
type ButtonSize    = 'sm' | 'md' | 'lg'

type ButtonProps = {
  as?:        'button' | 'a' | typeof Link
  variant?:   ButtonVariant
  size?:      ButtonSize
  loading?:   boolean
  icon?:      React.ReactNode
  children:   React.ReactNode
  className?: string
  href?:      string
  target?:    string
  rel?:       string
  onClick?:   React.MouseEventHandler<HTMLElement>
  disabled?:  boolean
  type?:      'button' | 'submit' | 'reset'
  'aria-label'?: string
}

const base =
  'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-md font-body font-medium whitespace-nowrap transition-opacity duration-[var(--duration-fast)] ease-out focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-40'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-action-primary text-text-inverse hover:opacity-85 focus-visible:outline-action-primary',
  cta:     'bg-action-cta text-text-inverse hover:opacity-85 focus-visible:outline-action-cta',
  outline: 'border-[1.5px] border-action-primary text-text-primary hover:bg-bg-subtle focus-visible:outline-action-primary',
  text:    'text-action-cta hover:opacity-70 focus-visible:outline-action-cta',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'min-h-[36px] px-4 py-2 text-button-sm',
  md: 'min-h-[44px] px-6 py-3 text-button-default',
  lg: 'min-h-[56px] px-8 py-4 text-button-lg',
}

const iconSizes: Record<ButtonSize, string> = {
  sm: 'size-4',
  md: 'size-4',
  lg: 'size-[18px]',
}

function Spinner({ variant }: { variant: ButtonVariant }) {
  const borderColor =
    variant === 'outline' || variant === 'text'
      ? 'border-text-primary'
      : 'border-text-inverse'
  return (
    <span
      aria-hidden
      className={`size-4 rounded-full border-2 border-t-transparent animate-spin ${borderColor}`}
    />
  )
}

function Button({
  as: Tag = 'button',
  variant  = 'primary',
  size     = 'md',
  loading  = false,
  icon,
  children,
  className,
  disabled,
  href,
  target,
  rel,
  onClick,
  type: htmlType,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const isDisabled = disabled || loading
  const classes    = [base, variants[variant], sizes[size], className].filter(Boolean).join(' ')

  const inner = loading ? (
    <Spinner variant={variant} />
  ) : (
    <>
      {icon && (
        <span aria-hidden className={`shrink-0 ${iconSizes[size]}`}>
          {icon}
        </span>
      )}
      {variant === 'text' ? (
        <>
          <span>{children}</span>
          <span aria-hidden>→</span>
        </>
      ) : (
        children
      )}
    </>
  )

  if (Tag === 'a') {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        aria-label={ariaLabel}
        aria-busy={loading || undefined}
        className={classes}
      >
        {inner}
      </a>
    )
  }

  if (Tag === Link) {
    return (
      <Link
        href={href ?? '/'}
        target={target}
        rel={rel}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        aria-label={ariaLabel}
        aria-busy={loading || undefined}
        className={classes}
      >
        {inner}
      </Link>
    )
  }

  return (
    <button
      type={htmlType ?? 'button'}
      disabled={isDisabled}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      className={classes}
    >
      {inner}
    </button>
  )
}

export { Button }
export default Button
export type { ButtonProps, ButtonVariant, ButtonSize }

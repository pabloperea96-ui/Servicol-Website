'use client'

import { forwardRef } from 'react'

type RadioButtonProps = {
  label?: string
  className?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(function RadioButton(
  { label, className, disabled, ...rest },
  ref,
) {
  return (
    <label
      className={[
        'inline-flex items-center gap-2 cursor-pointer select-none',
        disabled ? 'opacity-40 cursor-not-allowed' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      <span className="relative inline-flex size-5 shrink-0">
        <input
          ref={ref}
          type="radio"
          disabled={disabled}
          className="peer absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
          {...rest}
        />
        {/* Outer ring */}
        <span
          className={[
            'size-5 rounded-full border border-gris bg-bg-surface flex items-center justify-center transition-colors duration-base',
            'peer-checked:border-action-cta',
            'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-action-primary',
          ].join(' ')}
          aria-hidden
        >
          {/* Inner dot — always rendered, opacity driven by peer state */}
          <span className="size-2.5 rounded-full bg-action-cta opacity-0 peer-checked:opacity-100 transition-opacity duration-base" />
        </span>
      </span>
      {label && (
        <span className="font-body text-body-md text-text-primary">{label}</span>
      )}
    </label>
  )
})

export default RadioButton

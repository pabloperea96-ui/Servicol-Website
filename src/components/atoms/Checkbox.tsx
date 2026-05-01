'use client'

import { forwardRef } from 'react'

type CheckboxProps = {
  label?: string
  indeterminate?: boolean
  className?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, indeterminate = false, className, disabled, ...rest },
  ref,
) {
  return (
    <label
      className={[
        'group inline-flex items-center gap-2 cursor-pointer select-none',
        disabled ? 'opacity-40 cursor-not-allowed' : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      <span className="relative inline-flex size-5 shrink-0">
        <input
          ref={ref}
          type="checkbox"
          disabled={disabled}
          className="peer absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
          {...rest}
        />
        {/* Box visual */}
        <span
          className={[
            'size-5 rounded-sm border border-gris bg-bg-surface flex items-center justify-center transition-colors duration-base',
            'peer-checked:bg-action-cta peer-checked:border-action-cta',
            'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-action-primary',
            indeterminate ? 'bg-action-cta border-action-cta' : '',
          ].filter(Boolean).join(' ')}
          aria-hidden
        >
          {indeterminate ? (
            <span className="block h-0.5 w-3 rounded-full bg-white" />
          ) : (
            // Checkmark SVG
            <svg
              className="hidden group-has-[:checked]:block size-3 text-white"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 6l3 3 5-5" />
            </svg>
          )}
        </span>
      </span>
      {label && (
        <span className="font-body text-body-md text-text-primary">{label}</span>
      )}
    </label>
  )
})

export default Checkbox

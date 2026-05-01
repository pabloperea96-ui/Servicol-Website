// src/components/atoms/Input.tsx
import { forwardRef, useId } from 'react'
import { AlertCircle, Search, ChevronDown } from 'lucide-react'

type InputType = 'text' | 'select' | 'search' | 'textarea'

type BaseProps = {
  label?: string
  helper?: string
  error?: string
  className?: string
}

type TextProps = BaseProps & {
  inputType?: 'text' | 'search'
  placeholder?: string
} & React.InputHTMLAttributes<HTMLInputElement>

type TextAreaProps = BaseProps & {
  inputType: 'textarea'
  placeholder?: string
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

type SelectProps = BaseProps & {
  inputType: 'select'
  options: { value: string; label: string }[]
  placeholder?: string
} & React.SelectHTMLAttributes<HTMLSelectElement>

type InputProps = TextProps | TextAreaProps | SelectProps

// ── Shared field wrapper ────────────────────────────────────────────────────

const fieldBase =
  'w-full bg-bg-surface rounded-md px-4 py-3 font-body text-body-md font-regular text-text-primary placeholder:text-text-muted transition-[border-color] duration-base ease-out outline-none'

const borderDefault = 'border border-border-default'
const borderFocus   = 'focus:border-[1.5px] focus:border-action-primary'
const borderError   = 'border border-action-error'

function fieldClasses(hasError: boolean) {
  return [fieldBase, hasError ? borderError : `${borderDefault} ${borderFocus}`].join(' ')
}

// ── Component ───────────────────────────────────────────────────────────────

const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  InputProps
>(function Input(props, ref) {
  const uid = useId()
  const id = (props as any).id ?? uid
  const { label, helper, error, className, inputType = 'text', ...rest } = props as any
  const hasError = Boolean(error)

  return (
    <div className={['flex flex-col gap-[6px]', className].filter(Boolean).join(' ')}>
      {label && (
        <label
          htmlFor={id}
          className="font-body text-[12px] font-regular leading-[17px] text-text-secondary"
        >
          {label}
        </label>
      )}

      {/* TEXT */}
      {(inputType === 'text') && (
        <div className="relative">
          <input
            id={id}
            ref={ref as React.Ref<HTMLInputElement>}
            type="text"
            className={[fieldClasses(hasError), hasError ? 'pr-9' : ''].join(' ')}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${id}-error` : helper ? `${id}-helper` : undefined}
            {...rest}
          />
          {hasError && (
            <AlertCircle
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-action-error pointer-events-none"
              aria-hidden
            />
          )}
        </div>
      )}

      {/* SEARCH */}
      {inputType === 'search' && (
        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
            aria-hidden
          />
          <input
            id={id}
            ref={ref as React.Ref<HTMLInputElement>}
            type="search"
            className={[fieldClasses(hasError), 'pl-10', hasError ? 'pr-9' : ''].join(' ')}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${id}-error` : helper ? `${id}-helper` : undefined}
            {...rest}
          />
          {hasError && (
            <AlertCircle
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-action-error pointer-events-none"
              aria-hidden
            />
          )}
        </div>
      )}

      {/* SELECT */}
      {inputType === 'select' && (
        <div className="relative">
          <select
            id={id}
            ref={ref as React.Ref<HTMLSelectElement>}
            className={[
              fieldClasses(hasError),
              'appearance-none cursor-pointer pr-9',
              hasError ? 'pr-16' : '',
            ].join(' ')}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${id}-error` : helper ? `${id}-helper` : undefined}
            {...rest}
          >
            {rest.placeholder && (
              <option value="" disabled>
                {rest.placeholder}
              </option>
            )}
            {rest.options?.map((opt: { value: string; label: string }) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
            aria-hidden
          />
          {hasError && (
            <AlertCircle
              size={16}
              className="absolute right-9 top-1/2 -translate-y-1/2 text-action-error pointer-events-none"
              aria-hidden
            />
          )}
        </div>
      )}

      {/* TEXTAREA */}
      {inputType === 'textarea' && (
        <div className="relative">
          <textarea
            id={id}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={4}
            className={[fieldClasses(hasError), 'resize-none'].join(' ')}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${id}-error` : helper ? `${id}-helper` : undefined}
            {...rest}
          />
          {hasError && (
            <AlertCircle
              size={16}
              className="absolute right-3 top-3 text-action-error pointer-events-none"
              aria-hidden
            />
          )}
        </div>
      )}

      {/* HELPER / ERROR */}
      {(helper || error) && (
        <p
          id={hasError ? `${id}-error` : `${id}-helper`}
          className={[
            'font-body text-[12px] font-regular leading-[17px]',
            hasError ? 'text-action-error' : 'text-text-muted',
          ].join(' ')}
          role={hasError ? 'alert' : undefined}
        >
          {error ?? helper}
        </p>
      )}
    </div>
  )
})

export default Input
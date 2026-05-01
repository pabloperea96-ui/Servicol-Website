'use client'

import { useCallback, useId } from 'react'

function formatCOP(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value)
}

function pct(value: number, min: number, max: number) {
  return ((value - min) / (max - min)) * 100
}

function thumbCSS(id: string) {
  return `
    #${id} input[type=range] {
      -webkit-appearance: none;
      appearance: none;
      background: transparent;
      cursor: pointer;
      width: 100%;
      height: 16px;
    }
    #${id} input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 16px;
      height: 16px;
      border-radius: 9999px;
      background: var(--color-action-cta);
      border: 2px solid white;
      box-shadow: 0 0 0 1.5px var(--color-action-cta);
      cursor: pointer;
      transition: box-shadow 120ms ease-out;
    }
    #${id} input[type=range]::-moz-range-thumb {
      width: 16px;
      height: 16px;
      border-radius: 9999px;
      background: var(--color-action-cta);
      border: 2px solid white;
      box-shadow: 0 0 0 1.5px var(--color-action-cta);
      cursor: pointer;
      transition: box-shadow 120ms ease-out;
    }
    #${id} input[type=range]:focus-visible::-webkit-slider-thumb {
      box-shadow: 0 0 0 3px var(--color-action-cta-light);
    }
    #${id} input[type=range]:focus-visible::-moz-range-thumb {
      box-shadow: 0 0 0 3px var(--color-action-cta-light);
    }
    #${id} input[type=range]::-webkit-slider-runnable-track { background: transparent; }
    #${id} input[type=range]::-moz-range-track { background: transparent; }
  `
}

type SingleProps = {
  type: 'single'
  value: number
  min?: number
  max?: number
  step?: number
  onChange: (value: number) => void
  formatValue?: (value: number) => string
  className?: string
}

type RangeProps = {
  type: 'range'
  valueMin: number
  valueMax: number
  min?: number
  max?: number
  step?: number
  onChange: (min: number, max: number) => void
  formatValue?: (value: number) => string
  className?: string
}

type SliderProps = SingleProps | RangeProps

export default function Slider(props: SliderProps) {
  const uid = useId().replace(/:/g, '')
  const id = `slider-${uid}`
  const fmt = props.formatValue ?? formatCOP

  if (props.type === 'range') {
    const { valueMin, valueMax, min = 0, max = 100, step = 1, onChange, className } = props
    const fillLeft = pct(valueMin, min, max)
    const fillRight = pct(valueMax, min, max)

    const handleMin = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const next = Math.min(Number(e.target.value), valueMax - step)
      onChange(next, valueMax)
    }, [valueMax, step, onChange])

    const handleMax = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const next = Math.max(Number(e.target.value), valueMin + step)
      onChange(valueMin, next)
    }, [valueMin, step, onChange])

    return (
      <div id={id} className={['flex flex-col gap-[6px] w-full', className].filter(Boolean).join(' ')}>
        <style dangerouslySetInnerHTML={{ __html: thumbCSS(id) }} />
        <div className="flex justify-between font-body text-[12px] text-text-secondary">
          <span>{fmt(valueMin)}</span>
          <span>{fmt(valueMax)}</span>
        </div>
        <div className="relative h-4 flex items-center">
          <div className="absolute inset-x-0 h-1 rounded-full bg-bg-subtle" />
          <div
            className="absolute h-1 rounded-full bg-action-cta"
            style={{ left: `${fillLeft}%`, right: `${100 - fillRight}%` }}
            aria-hidden
          />
          <input
            type="range" min={min} max={max} step={step} value={valueMin}
            onChange={handleMin}
            aria-label="Precio mínimo" aria-valuenow={valueMin} aria-valuetext={fmt(valueMin)}
            className="absolute inset-0"
          />
          <input
            type="range" min={min} max={max} step={step} value={valueMax}
            onChange={handleMax}
            aria-label="Precio máximo" aria-valuenow={valueMax} aria-valuetext={fmt(valueMax)}
            className="absolute inset-0 pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
          />
        </div>
      </div>
    )
  }

  // Single
  const { value, min = 0, max = 100, step = 1, onChange, className } = props
  const fillPct = pct(value, min, max)

  return (
    <div id={id} className={['flex flex-col gap-[6px] w-full', className].filter(Boolean).join(' ')}>
      <style dangerouslySetInnerHTML={{ __html: thumbCSS(id) }} />
      <div className="flex justify-between font-body text-[12px] text-text-secondary">
        <span>{fmt(min)}</span>
        <span>{fmt(value)}</span>
      </div>
      <div className="relative h-4 flex items-center">
        <div className="absolute inset-x-0 h-1 rounded-full bg-bg-subtle" />
        <div
          className="absolute left-0 h-1 rounded-full bg-action-cta"
          style={{ width: `${fillPct}%` }}
          aria-hidden
        />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label="Valor" aria-valuenow={value} aria-valuetext={fmt(value)}
          className="absolute inset-0"
        />
      </div>
    </div>
  )
}

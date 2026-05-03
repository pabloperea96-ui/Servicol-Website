'use client'

import { useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'

type Option = { value: string; label: string }

type SearchBarProps = {
  onSearch?: (values: { tipo: string; operacion: string; zona: string }) => void
}

const TIPO_OPTIONS: Option[] = [
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'casa',        label: 'Casa'        },
  { value: 'local',       label: 'Local'       },
  { value: 'lote',        label: 'Lote'        },
  { value: 'finca',       label: 'Finca'       },
]

const OPERACION_OPTIONS: Option[] = [
  { value: 'venta',    label: 'Venta'    },
  { value: 'arriendo', label: 'Arriendo' },
]

const ZONA_OPTIONS: Option[] = [
  { value: 'duitama',  label: 'Duitama'  },
  { value: 'tibasosa', label: 'Tibasosa' },
  { value: 'paipa',    label: 'Paipa'    },
]

const TIPO_PLACEHOLDER      = 'Selecciona un tipo'
const OPERACION_PLACEHOLDER = 'Venta o arriendo'
const ZONA_PLACEHOLDER      = 'Selecciona una zona'

type FieldProps = {
  label:       string
  placeholder: string
  value:       string
  options:     Option[]
  onChange:    (v: string) => void
}

function NativeSelect({
  label, placeholder, value, options, onChange,
}: FieldProps) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      onInput={e => onChange((e.target as HTMLSelectElement).value)}
      className="absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
      aria-label={label}
      suppressHydrationWarning
    >
      <option value="" disabled hidden>{placeholder}</option>
      {options.map(o => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}

function MobileField(props: FieldProps) {
  const { label, placeholder, value, options } = props
  const valueLabel = options.find(o => o.value === value)?.label
  const isPlaceholder = !valueLabel

  return (
    <div className="relative flex h-11 w-full shrink-0 items-center gap-[2px] self-stretch rounded-md border-[0.5px] border-border-default bg-bg-surface px-4 py-1 text-left">
      <div className="pointer-events-none flex min-w-0 flex-1 flex-col gap-[6px] overflow-hidden">
        <span className="text-label-caps text-text-muted">{label}</span>
        <span
          className={`truncate text-form-search-input ${
            isPlaceholder ? 'text-text-muted' : 'text-text-secondary'
          }`}
        >
          {valueLabel ?? placeholder}
        </span>
      </div>
      <ChevronDown
        size={18}
        className="pointer-events-none shrink-0 text-text-secondary"
        aria-hidden
      />
      <NativeSelect {...props} />
    </div>
  )
}

function DesktopField(props: FieldProps & { isLast?: boolean }) {
  const { label, placeholder, value, options, isLast } = props
  const valueLabel = options.find(o => o.value === value)?.label
  const isPlaceholder = !valueLabel

  return (
    <div
      className={`relative flex h-full min-w-0 flex-1 flex-col justify-center gap-1 overflow-hidden px-5 text-left ${
        isLast ? '' : 'border-r-[0.5px] border-border-default'
      }`}
    >
      <span className="pointer-events-none text-label-caps text-text-muted">
        {label}
      </span>
      <div className="pointer-events-none flex items-center gap-2 overflow-hidden">
        <span
          className={`min-w-0 flex-1 truncate text-form-search-input ${
            isPlaceholder ? 'text-text-muted' : 'text-text-secondary'
          }`}
        >
          {valueLabel ?? placeholder}
        </span>
        <ChevronDown
          size={18}
          className="shrink-0 text-text-secondary"
          aria-hidden
        />
      </div>
      <NativeSelect {...props} />
    </div>
  )
}

export default function SearchBar({ onSearch = () => {} }: SearchBarProps) {
  const [tipo,      setTipo]      = useState('')
  const [operacion, setOperacion] = useState('')
  const [zona,      setZona]      = useState('')

  function handleSearch() {
    onSearch({ tipo, operacion, zona })
  }

  return (
    <>
      {/* Desktop */}
      <div className="hidden h-14 overflow-hidden rounded-md border-[0.5px] border-border-default bg-bg-surface md:flex">
        <DesktopField label="Tipo"      placeholder={TIPO_PLACEHOLDER}      value={tipo}      options={TIPO_OPTIONS}      onChange={setTipo}      />
        <DesktopField label="Operación" placeholder={OPERACION_PLACEHOLDER} value={operacion} options={OPERACION_OPTIONS} onChange={setOperacion} />
        <DesktopField label="Zona"      placeholder={ZONA_PLACEHOLDER}      value={zona}      options={ZONA_OPTIONS}      onChange={setZona}      isLast />
        <button
          type="button"
          onClick={handleSearch}
          className="flex shrink-0 cursor-pointer items-center justify-center gap-2 bg-action-cta px-8 py-4 text-button-lg text-text-inverse transition-opacity duration-[var(--duration-base)] ease-out hover:opacity-90"
        >
          <Search size={18} aria-hidden />
          Buscar
        </button>
      </div>

      {/* Mobile */}
      <div className="flex flex-col gap-2 md:hidden">
        <MobileField label="Tipo"      placeholder={TIPO_PLACEHOLDER}      value={tipo}      options={TIPO_OPTIONS}      onChange={setTipo}      />
        <MobileField label="Operación" placeholder={OPERACION_PLACEHOLDER} value={operacion} options={OPERACION_OPTIONS} onChange={setOperacion} />
        <MobileField label="Zona"      placeholder={ZONA_PLACEHOLDER}      value={zona}      options={ZONA_OPTIONS}      onChange={setZona}      />
        <button
          type="button"
          onClick={handleSearch}
          className="flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-md bg-action-cta px-6 py-3 text-button-default text-text-inverse transition-opacity duration-[var(--duration-base)] ease-out hover:opacity-90"
        >
          <Search size={16} aria-hidden />
          Buscar
        </button>
      </div>
    </>
  )
}

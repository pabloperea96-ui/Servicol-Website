'use client'

// src/components/molecules/FilterPanel.tsx
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Pill     from '@/components/atoms/Pill'
import Checkbox from '@/components/atoms/Checkbox'
import Divider  from '@/components/atoms/Divider'
import Button   from '@/components/atoms/Button'

const TIPOS = [
  { value: 'apartamento', label: 'Apartamento' },
  { value: 'casa',        label: 'Casa'        },
  { value: 'local',       label: 'Local'       },
  { value: 'lote',        label: 'Lote'        },
  { value: 'finca',       label: 'Finca'       },
]

const OPERACIONES = [
  { value: 'venta',    label: 'Venta'    },
  { value: 'arriendo', label: 'Arriendo' },
]

const HAB_OPTIONS = [
  { value: '1', label: '1 hab' },
  { value: '2', label: '2 hab' },
  { value: '3', label: '3 hab' },
  { value: '4', label: '4+'    },
]

const BANO_OPTIONS = [
  { value: '1', label: '1 baño'  },
  { value: '2', label: '2 baños' },
  { value: '3', label: '3+'      },
]

const ZONA_OPTIONS = [
  { value: 'duitama',  label: 'Duitama'  },
  { value: 'sogamoso', label: 'Sogamoso' },
  { value: 'paipa',    label: 'Paipa'    },
]

function toggleMulti(current: string, value: string): string {
  const items = current.split(',').filter(Boolean)
  const idx   = items.indexOf(value)
  if (idx === -1) items.push(value)
  else items.splice(idx, 1)
  return items.join(',')
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-body text-[11px] font-medium uppercase tracking-[0.09em] text-text-muted">
      {children}
    </p>
  )
}

type FilterPanelProps = {
  onApply?: () => void
}

export default function FilterPanel({ onApply }: FilterPanelProps) {
  const searchParams = useSearchParams()
  const router       = useRouter()
  const isMobile     = onApply !== undefined

  // En mobile: estado local (no toca el URL hasta que el usuario aplica)
  // En desktop: lee directo del URL para aplicación inmediata
  const [localTipo,  setLocalTipo]  = useState(searchParams.get('tipo')          ?? '')
  const [localOp,    setLocalOp]    = useState(searchParams.get('operacion')      ?? '')
  const [localHabs,  setLocalHabs]  = useState(searchParams.get('habitaciones')   ?? '')
  const [localBanos, setLocalBanos] = useState(searchParams.get('banos')          ?? '')
  const [localZona,  setLocalZona]  = useState(searchParams.get('zona')           ?? '')

  // Valores activos según contexto
  const tipoActive  = isMobile ? localTipo  : (searchParams.get('tipo')          ?? '')
  const opActive    = isMobile ? localOp    : (searchParams.get('operacion')      ?? '')
  const habsStr     = isMobile ? localHabs  : (searchParams.get('habitaciones')   ?? '')
  const banosStr    = isMobile ? localBanos : (searchParams.get('banos')          ?? '')
  const zonaStr     = isMobile ? localZona  : (searchParams.get('zona')           ?? '')

  const habsActive  = habsStr.split(',').filter(Boolean)
  const banosActive = banosStr.split(',').filter(Boolean)
  const zonasActive = zonaStr.split(',').filter(Boolean)

  function setLocal(key: string, value: string) {
    switch (key) {
      case 'tipo':         setLocalTipo(value);  break
      case 'operacion':    setLocalOp(value);    break
      case 'habitaciones': setLocalHabs(value);  break
      case 'banos':        setLocalBanos(value); break
      case 'zona':         setLocalZona(value);  break
    }
  }

  // Desktop: aplica inmediato al URL
  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    params.delete('pagina')
    router.replace(`/portafolio?${params.toString()}`, { scroll: false })
  }

  function handleChange(key: string, value: string) {
    if (isMobile) setLocal(key, value)
    else updateParam(key, value)
  }

  // Mobile: aplica todos los filtros acumulados y cierra el drawer
  function handleApply() {
    const params = new URLSearchParams()
    if (localTipo)  params.set('tipo',         localTipo)
    if (localOp)    params.set('operacion',     localOp)
    if (localHabs)  params.set('habitaciones',  localHabs)
    if (localBanos) params.set('banos',         localBanos)
    if (localZona)  params.set('zona',          localZona)
    router.replace(`/portafolio?${params.toString()}`, { scroll: false })
    onApply?.()
  }

  function handleClear() {
    if (isMobile) {
      setLocalTipo(''); setLocalOp(''); setLocalHabs(''); setLocalBanos(''); setLocalZona('')
      router.replace('/portafolio', { scroll: false })
      onApply?.()
    } else {
      router.replace('/portafolio', { scroll: false })
    }
  }

  return (
    <aside
      className="flex flex-col gap-5 p-6 md:w-[220px] md:shrink-0 md:sticky md:top-24 md:border md:border-border-default md:rounded-lg md:bg-bg-surface"
      style={{ width: '100%' }}
    >
      {/* TIPO */}
      <div className="flex flex-col gap-3 w-full">
        <SectionTitle>Tipo</SectionTitle>
        <div className="flex flex-wrap gap-2 w-full">
          {TIPOS.map(({ value, label }) => (
            <Pill
              key={value}
              label={label}
              active={tipoActive === value}
              onClick={() => handleChange('tipo', tipoActive === value ? '' : value)}
            />
          ))}
        </div>
      </div>

      <Divider />

      {/* OPERACIÓN */}
      <div className="flex flex-col gap-3 w-full">
        <SectionTitle>Operación</SectionTitle>
        <div className="flex flex-wrap gap-2 w-full">
          {OPERACIONES.map(({ value, label }) => (
            <Pill
              key={value}
              label={label}
              active={opActive === value}
              onClick={() => handleChange('operacion', opActive === value ? '' : value)}
            />
          ))}
        </div>
      </div>

      <Divider />

      {/* HABITACIONES */}
      <div className="flex flex-col gap-3 w-full">
        <SectionTitle>Habitaciones</SectionTitle>
        <div className="flex flex-col gap-[10px] w-full">
          {HAB_OPTIONS.map(({ value, label }) => (
            <Checkbox
              key={value}
              label={label}
              checked={habsActive.includes(value)}
              onChange={() => handleChange('habitaciones', toggleMulti(habsStr, value))}
            />
          ))}
        </div>
      </div>

      <Divider />

      {/* BAÑOS */}
      <div className="flex flex-col gap-3 w-full">
        <SectionTitle>Baños</SectionTitle>
        <div className="flex flex-col gap-[10px] w-full">
          {BANO_OPTIONS.map(({ value, label }) => (
            <Checkbox
              key={value}
              label={label}
              checked={banosActive.includes(value)}
              onChange={() => handleChange('banos', toggleMulti(banosStr, value))}
            />
          ))}
        </div>
      </div>

      <Divider />

      {/* ZONA */}
      <div className="flex flex-col gap-3 w-full">
        <SectionTitle>Zona</SectionTitle>
        <div className="flex flex-col gap-[10px] w-full">
          {ZONA_OPTIONS.map(({ value, label }) => (
            <Checkbox
              key={value}
              label={label}
              checked={zonasActive.includes(value)}
              onChange={() => handleChange('zona', toggleMulti(zonaStr, value))}
            />
          ))}
        </div>
      </div>

      <Divider />

      {/* Mobile: Ver resultados / Desktop: Limpiar */}
      {isMobile ? (
        <div className="flex flex-col gap-3">
          <Button variant="cta" className="w-full" onClick={handleApply}>
            Ver resultados
          </Button>
          <Button variant="outline" className="w-full" onClick={handleClear}>
            Limpiar filtros
          </Button>
        </div>
      ) : (
        <Button variant="outline" className="w-full" onClick={handleClear}>
          Limpiar filtros
        </Button>
      )}
    </aside>
  )
}

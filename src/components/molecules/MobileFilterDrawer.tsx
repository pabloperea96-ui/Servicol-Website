'use client'

// src/components/molecules/MobileFilterDrawer.tsx
import React, { useState } from 'react'
import { X } from 'lucide-react'
import Icon from '@/components/atoms/Icon'

type MobileFilterDrawerProps = {
  children: React.ReactNode
}

export default function MobileFilterDrawer({ children }: MobileFilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

  // Inyecta onApply={close} al hijo para que cada filtro cierre el drawer
  const panel = React.isValidElement<{ onApply?: () => void }>(children)
    ? React.cloneElement(children, { onApply: close })
    : children

  return (
    <>
      {/* Trigger inline — sin posición fija */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 border-[1.5px] border-border-strong rounded-md px-4 py-2 min-h-[44px] font-body text-body-md font-medium text-text-primary cursor-pointer md:hidden"
      >
        <Icon type="Filter" size={16} />
        Filtrar
      </button>

      {/* Drawer — solo cuando está abierto */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={close}
            aria-hidden
          />

          {/* Panel desde el bottom */}
          <div
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-bg-surface"
            role="dialog"
            aria-modal
            aria-label="Filtros"
          >
            <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-border-default">
              <p className="font-display text-display-sm font-bold text-text-primary">Filtros</p>
              <button
                type="button"
                onClick={close}
                className="p-2 -mr-2 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                aria-label="Cerrar filtros"
              >
                <X size={20} />
              </button>
            </div>
            <div className="w-full pb-8">
              {panel}
            </div>
          </div>
        </>
      )}
    </>
  )
}

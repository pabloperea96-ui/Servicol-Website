'use client'

import { useState } from 'react'
import Link          from 'next/link'
import { Menu, X }   from 'lucide-react'

const LINKS = [
  { label: 'Portafolio', href: '/portafolio' },
  { label: 'Servicios',  href: '/servicios'  },
  { label: 'Nosotros',   href: '/nosotros'   },
  { label: 'Contacto',   href: '/contacto'   },
]

export default function NavDrawer({ iconClass = '' }: { iconClass?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir menú"
        className={`md:hidden p-2 ${iconClass}`}
      >
        <Menu size={24} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[9999] flex flex-col justify-end">
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          {/* panel */}
          <div className="relative bg-white rounded-t-2xl pb-10">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <span className="text-lg font-bold">Servicol</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="p-2"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col px-6">
              {LINKS.map(({ label, href }, i) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`py-4 text-lg text-gray-700 ${i < LINKS.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

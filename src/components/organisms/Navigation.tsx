'use client'

import { useState, useEffect } from 'react'
import Link        from 'next/link'
import { usePathname } from 'next/navigation'
import Button      from '@/components/atoms/Button'
import Icon        from '@/components/atoms/Icon'
import NavDrawer   from '@/components/organisms/NavDrawer'

const NAV_LINKS = [
  { label: 'Portafolio', href: '/portafolio' },
  { label: 'Servicios',  href: '/servicios'  },
  { label: 'Nosotros',   href: '/nosotros'   },
  { label: 'Contacto',   href: '/contacto'   },
]

type NavigationProps = {
  transparent?: boolean
  whatsappUrl?: string
}

export default function Navigation({
  transparent = false,
  whatsappUrl = 'https://wa.me/573112345678',
}: NavigationProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!transparent) return
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [transparent])

  const isWhite    = !transparent || scrolled
  const bgClass    = isWhite ? 'bg-bg-surface'           : 'bg-transparent'
  const borderClass = isWhite ? 'border-b border-border-default' : ''
  const logoColor  = isWhite ? 'text-text-primary'       : 'text-text-inverse'
  const linkColor  = isWhite ? 'text-text-secondary'     : 'text-white/80'
  const linkActive = isWhite ? 'text-text-primary'       : 'text-white'

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-40 flex items-center px-5 md:px-10',
        'h-[var(--nav-height)] transition-colors duration-base',
        bgClass, borderClass,
      ].join(' ')}
    >
      {/* Logo */}
      <div className="flex flex-1 items-center">
        <Link
          href="/"
          className={`font-display text-[20px] font-bold tracking-[0.4px] ${logoColor}`}
        >
          Servicol
        </Link>
      </div>

      {/* Links desktop */}
      <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
        {NAV_LINKS.map(({ label, href }) => {
          const active = pathname?.startsWith(href) ?? false
          return (
            <Link
              key={href}
              href={href}
              className={[
                'font-body text-[16px]',
                active
                  ? `font-medium ${linkActive}`
                  : `font-regular ${linkColor} hover:text-text-primary transition-colors duration-base`,
              ].join(' ')}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      {/* CTA desktop + hamburger mobile (NavDrawer autónomo) */}
      <div className="flex flex-1 items-center justify-end gap-4">
        <Button
          as="a"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="cta"
          size="sm"
          icon={<Icon type="WhatsApp" size={16} aria-hidden={false} />}
          className="hidden md:inline-flex"
        >
          WhatsApp
        </Button>

        {/* NavDrawer incluye el botón hamburger y su propio estado */}
        <NavDrawer iconClass={logoColor} />
      </div>
    </header>
  )
}

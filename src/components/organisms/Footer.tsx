// src/components/organisms/Footer.tsx
import Link from 'next/link'
import Icon from '@/components/atoms/Icon'

const PORTAFOLIO_LINKS = [
  { label: 'Apartamentos', href: '/portafolio?tipo=apartamento' },
  { label: 'Casas',        href: '/portafolio?tipo=casa'        },
  { label: 'Locales',      href: '/portafolio?tipo=local'       },
  { label: 'Lotes',        href: '/portafolio?tipo=lote'        },
  { label: 'Fincas',       href: '/portafolio?tipo=finca'       },
]

const EMPRESA_LINKS = [
  { label: 'Nosotros',  href: '/nosotros'  },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Contacto',  href: '/contacto'  },
]

const CONTACT_INFO = [
  { type: 'direccion' as const, lines: ['Calle 16 #14-35', 'Duitama, Boyacá'] },
  { type: 'horario'  as const, lines: ['Lun–Vie: 8am – 6pm', 'Sáb: 9am – 1pm'] },
  { type: 'telefono' as const, lines: ['+57 311 234 5678'] },
]

const ICON_MAP = { direccion: 'Pin', horario: 'Clock', telefono: 'Phone' } as const

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-[13px] font-bold leading-[16px] text-text-inverse">
      {children}
    </p>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="font-body text-body-md text-text-inverse/80 hover:text-text-inverse transition-colors duration-base"
    >
      {children}
    </Link>
  )
}

export default function Footer() {
  return (
    <footer className="bg-action-primary">
      <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-20 md:py-16 flex flex-col gap-8 md:gap-12">

        {/* Top grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr_1fr_1.5fr]">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <p className="font-display text-display-lg font-bold tracking-[-0.2px] text-text-inverse">
              Servicol
            </p>
            <p className="font-body text-body-md text-text-inverse/80 leading-[21px] max-w-[334px]">
              Más de 25 años conectando familias con su hogar ideal en el corredor Duitama – Sogamoso – Paipa.
            </p>
            <a
              href="https://instagram.com/servicolinmobiliaria"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Servicol"
            >
              <Icon type="Instagram" size={24} className="text-text-inverse/80 hover:text-text-inverse transition-colors duration-base" />
            </a>
          </div>

          {/* Portafolio */}
          <div className="flex flex-col gap-3">
            <FooterHeading>PORTAFOLIO</FooterHeading>
            {PORTAFOLIO_LINKS.map(({ label, href }) => (
              <FooterLink key={href} href={href}>{label}</FooterLink>
            ))}
          </div>

          {/* Empresa */}
          <div className="flex flex-col gap-3">
            <FooterHeading>EMPRESA</FooterHeading>
            {EMPRESA_LINKS.map(({ label, href }) => (
              <FooterLink key={href} href={href}>{label}</FooterLink>
            ))}
          </div>

          {/* Contacto */}
          <div className="flex flex-col gap-3">
            <FooterHeading>CONTACTO</FooterHeading>
            {CONTACT_INFO.map(({ type, lines }) => (
              <div key={type} className="flex items-start gap-[10px]">
                <Icon
                  type={ICON_MAP[type]}
                  size={24}
                  className="shrink-0 text-text-inverse/80 mt-0.5"
                />
                <div className="font-body text-body-md text-text-inverse/80 leading-[21px]">
                  {lines.map((line, i) => <p key={i}>{line}</p>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-text-inverse/20 pt-6 md:flex-row md:justify-between">
          <p className="font-body text-[11px] text-text-inverse/60">
            © {new Date().getFullYear()} Servicol Ltda. Todos los derechos reservados.
          </p>
          <Link
            href="/privacidad"
            className="font-body text-[11px] text-text-inverse/60 hover:text-text-inverse transition-colors duration-base"
          >
            Política de privacidad
          </Link>
        </div>
      </div>
    </footer>
  )
}
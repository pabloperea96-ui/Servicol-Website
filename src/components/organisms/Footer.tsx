import Link                   from 'next/link'
import Icon                   from '@/components/atoms/Icon'
import { client }             from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/lib/queries'
import type { SiteSettings }   from '@/lib/sanity-mappers'

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

function ContactItem({ icon, lines }: { icon: React.ReactNode; lines: string[] }) {
  return (
    <div className="flex items-start gap-[10px]">
      {icon}
      <div className="font-body text-body-md text-text-inverse/80 leading-[21px]">
        {lines.map((line, i) => <p key={i}>{line}</p>)}
      </div>
    </div>
  )
}

export default async function Footer() {
  const settings: SiteSettings | null = await client.fetch(SITE_SETTINGS_QUERY)

  const addressLines = (settings?.officeAddress ?? '').split('\n').filter(Boolean)
  const hoursLines   = (settings?.officeHours   ?? '').split('\n').filter(Boolean)

  const iconClass = 'shrink-0 text-text-inverse/80 mt-0.5'

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
              Más de 25 años conectando familias con su hogar ideal en el corredor Duitama – Tibasosa – Paipa.
            </p>
            {settings?.instagram && (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Servicol"
              >
                <Icon type="Instagram" size={24} className="text-text-inverse/80 hover:text-text-inverse transition-colors duration-base" />
              </a>
            )}
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
            {addressLines.length > 0 && (
              <ContactItem
                icon={<Icon type="Pin"   size={24} className={iconClass} />}
                lines={addressLines}
              />
            )}
            {hoursLines.length > 0 && (
              <ContactItem
                icon={<Icon type="Clock" size={24} className={iconClass} />}
                lines={hoursLines}
              />
            )}
            {settings?.whatsappMain && (
              <ContactItem
                icon={<Icon type="Phone" size={24} className={iconClass} />}
                lines={[settings.whatsappMain]}
              />
            )}
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

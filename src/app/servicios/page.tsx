// src/app/servicios/page.tsx — Server Component
import type { Metadata } from 'next'
import Link             from 'next/link'
import NavigationWrapper from '@/components/organisms/NavigationWrapper'
import Footer            from '@/components/organisms/Footer'
import Divider           from '@/components/atoms/Divider'
import { CheckCircle2 }  from 'lucide-react'

const HERO = {
  title:       'Servicios inmobiliarios completos',
  description:
    'Más de 25 años acompañando a familias e inversionistas en venta, arriendo y proyectos nuevos en Boyacá.',
}

const SERVICES = [
  {
    title:       'Venta de propiedades',
    description: 'Te acompañamos en todo el proceso de compra, desde la búsqueda hasta la escritura.',
    features:    ['Asesoría personalizada', 'Trámites y documentación', 'Negociación de precio'],
    ctaLabel:    'Ver propiedades en venta',
    href:        '/portafolio?operacion=venta',
  },
  {
    title:       'Arriendo',
    description: 'Encuentra el inmueble ideal para arrendar o consigna el tuyo con la confianza de Servicol.',
    features:    ['Catálogo amplio en la región', 'Estudio de arrendatarios', 'Contratos respaldados'],
    ctaLabel:    'Ver propiedades en arriendo',
    href:        '/portafolio?operacion=arriendo',
  },
  {
    title:       'Proyectos nuevos',
    description: 'Acceso anticipado a desarrollos sobre planos y obra en construcción en el corredor Duitama–Tibasosa–Paipa.',
    features:    ['Renders y planos detallados', 'Avance de obra mensual', 'Asesoría en financiación'],
    ctaLabel:    'Hablar por WhatsApp',
    href:        'https://wa.me/573112345678?text=Hola%2C%20me%20interesa%20conocer%20los%20proyectos%20nuevos',
  },
]

export const metadata: Metadata = {
  title: 'Servicios inmobiliarios',
  description:
    'Ofrecemos compraventa, arriendo, avalúos y administración de inmuebles en la región de Boyacá.',
}

export default function ServiciosPage() {
  return (
    <>
      <NavigationWrapper />

      <main className="pt-[var(--nav-height)]">

        {/* Hero */}
        <section className="px-5 py-12 md:px-12 md:py-16">
          <div className="mx-auto flex max-w-[948px] flex-col items-center gap-6 text-center">
            <h1 className="font-display text-display-xl font-bold tracking-tight text-text-primary md:text-display-2xl md:font-extrabold md:leading-[56px]">
              {HERO.title}
            </h1>
            <p className="font-body text-body-lg font-light text-text-secondary md:text-display-xl md:leading-[45px]">
              {HERO.description}
            </p>
          </div>
        </section>

        {/* Cards de servicios */}
        <section className="bg-bg-subtle px-5 py-12 md:px-12 md:py-16">
          <div className="flex flex-col gap-6 md:gap-8">
            <h2 className="font-display text-display-lg font-bold tracking-tight text-text-primary md:text-display-xl">
              Nuestros servicios
            </h2>

            <div className="flex flex-col gap-6 md:flex-row">
              {SERVICES.map((s) => (
                <article
                  key={s.title}
                  className="flex flex-1 flex-col gap-4 rounded-lg border border-border-default bg-bg-surface p-8"
                >
                  <h3 className="font-display text-display-sm font-bold text-text-primary">
                    {s.title}
                  </h3>
                  <p className="font-body text-body-md text-text-secondary leading-[21px]">
                    {s.description}
                  </p>
                  <div className="flex flex-1 flex-col gap-2">
                    {s.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="shrink-0 text-action-cta" aria-hidden />
                        <p className="font-body text-body-md text-text-secondary">{feature}</p>
                      </div>
                    ))}
                  </div>
                  <Divider />
                  <Link
                    href={s.href}
                    className="inline-flex items-center gap-2 font-body text-body-md font-medium text-text-primary hover:text-action-cta transition-colors duration-base"
                  >
                    {s.ctaLabel} →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}

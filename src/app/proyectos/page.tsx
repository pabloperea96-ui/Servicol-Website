// src/app/proyectos/page.tsx — Server Component
import type { Metadata } from 'next'
import NavigationWrapper from '@/components/organisms/NavigationWrapper'
import Footer            from '@/components/organisms/Footer'
import CTASection        from '@/components/organisms/CTASection'
import Breadcrumb        from '@/components/molecules/Breadcrumb'
import ProjectCard       from '@/components/molecules/ProjectCard'
import Button            from '@/components/atoms/Button'
import Icon              from '@/components/atoms/Icon'
import { client }        from '@/sanity/lib/client'
import { ALL_PROJECTS_QUERY, SITE_SETTINGS_QUERY } from '@/lib/queries'
import { toProjectCardProps } from '@/lib/sanity-mappers'
import type { SanityProject, SiteSettings } from '@/lib/sanity-mappers'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Proyectos nuevos',
  description:
    'Proyectos de vivienda nueva sobre planos y en construcción en el corredor Duitama – Paipa, con el acompañamiento de Servicol de principio a fin.',
}

const BREADCRUMB = [
  { label: 'Inicio', href: '/' },
  { label: 'Proyectos' },
]

export default async function ProyectosPage() {
  const [projects, settings] = await Promise.all([
    client.fetch<SanityProject[]>(ALL_PROJECTS_QUERY),
    client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY),
  ])
  const cards = projects.map(toProjectCardProps)
  const whatsappUrl = settings?.whatsappMain
    ? `https://wa.me/${settings.whatsappMain}`
    : undefined

  return (
    <>
      <NavigationWrapper />

      <main className="pt-[var(--nav-height)]">

        {/* Section header */}
        <div className="border-b border-border-default px-5 pt-8 pb-6 flex flex-col gap-5 md:px-12 md:pt-10">
          <Breadcrumb items={BREADCRUMB} />
          <h1 className="text-display-md text-text-primary font-display font-bold md:text-display-xl">
            Proyectos nuevos
          </h1>
        </div>

        {/* Grid de proyectos */}
        <section className="px-5 py-8 md:px-12 md:py-12">
          {cards.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {cards.map((card) => (
                <ProjectCard key={card.slug} {...card} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6 py-16 text-center">
              <p className="font-display text-display-md font-bold text-text-primary">
                Muy pronto anunciaremos nuevos proyectos
              </p>
              <p className="max-w-[480px] font-body text-body-lg font-light text-text-secondary">
                Escríbenos por WhatsApp y te contamos de primero cuando abramos ventas de
                un nuevo proyecto en Duitama, Paipa o Tibasosa.
              </p>
              {whatsappUrl && (
                <Button
                  as="a"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="cta"
                  icon={<Icon type="WhatsApp" size={18} aria-hidden={false} />}
                >
                  Escríbenos por WhatsApp
                </Button>
              )}
            </div>
          )}
        </section>

        <CTASection whatsappUrl={whatsappUrl} />
      </main>

      <Footer />
    </>
  )
}

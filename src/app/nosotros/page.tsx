// src/app/nosotros/page.tsx — Server Component
import type { Metadata } from 'next'
import NavigationWrapper from '@/components/organisms/NavigationWrapper'
import Footer     from '@/components/organisms/Footer'
import StatBlock  from '@/components/molecules/StatBlock'
import TeamCard   from '@/components/molecules/TeamCard'
import Button     from '@/components/atoms/Button'
import Icon       from '@/components/atoms/Icon'
import { client } from '@/sanity/lib/client'
import { ADVISORS_QUERY } from '@/lib/queries'
import { toTeamCard } from '@/lib/sanity-mappers'
import type { SanityAdvisor } from '@/lib/sanity-mappers'

const HERO = {
  description:
    'Servicol nació de la vocación de servicio y el profundo conocimiento del mercado inmobiliario. Hoy somos la inmobiliaria número 1 de la región: venta, arriendo, administración.',
  imageSrc: '/images/nosotros-hero.jpg',
}

const STATS = [
  { value: '25+',  label: 'Años de experiencia'    },
  { value: '500+', label: 'Propiedades vendidas'   },
  { value: '150+', label: 'Propiedades arrendadas' },
  { value: '3',    label: 'Ciudades en Boyacá'     },
]

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Quiénes somos',
  description:
    'Conoce al equipo de Servicol: más de 25 años acompañando a familias y empresas en sus decisiones inmobiliarias en Boyacá.',
}

export default async function NosotrosPage() {
  const advisorsRaw = await client.fetch<SanityAdvisor[]>(ADVISORS_QUERY)
  const advisors = advisorsRaw.map(toTeamCard)

  return (
    <>
      <NavigationWrapper />

      <main className="pt-[var(--nav-height)]">

        {/* Hero — split desktop, stacked mobile */}
        <section className="bg-bg-surface px-5 py-12 md:px-12 md:py-20">
          <div className="flex flex-col gap-12 md:flex-row md:items-center md:gap-20">
            <div className="flex flex-1 flex-col gap-6">
              <h1 className="font-display text-display-xl font-bold tracking-tight text-text-primary md:text-display-2xl md:font-extrabold md:leading-[56px]">
                25 años{' '}
                <span className="text-action-cta">construyendo confianza</span>
                {' '}en Boyacá
              </h1>
              <p className="font-body text-body-lg font-light text-text-secondary">
                {HERO.description}
              </p>
            </div>
            <div className="h-[420px] flex-1 overflow-hidden rounded-md bg-bg-subtle">
              <img
                src={HERO.imageSrc}
                alt="Equipo Servicol"
                className="size-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="px-5 py-8 md:px-12 md:py-12">
          <StatBlock stats={STATS} />
        </section>

        {/* Team */}
        {advisors.length > 0 && (
          <section className="bg-bg-canvas px-5 py-8 md:px-12 md:py-16">
            <div className="flex flex-col gap-6 md:gap-8">
              <h2 className="font-display text-display-lg font-bold tracking-tight text-text-primary md:text-display-xl">
                Nuestro equipo
              </h2>

              {/* Mobile / Tablet — usa TeamCard */}
              <div className="grid grid-cols-1 gap-6 lg:hidden">
                {advisors.map((member) => (
                  <TeamCard
                    key={member.name}
                    name={member.name}
                    role={member.role}
                    initials={member.initials}
                    photoSrc={member.photoSrc}
                    whatsappUrl={member.whatsappUrl}
                    className="min-w-full h-[189px]"
                  />
                ))}
              </div>

              {/* Desktop — layout exacto del Figma */}
              <div className="hidden lg:grid lg:grid-cols-4 lg:gap-6">
                {advisors.map((member) => (
                  <article
                    key={member.name}
                    className="flex flex-col items-center gap-[18px] rounded-lg border border-border-default bg-bg-surface p-[36px]"
                  >
                    {/* Avatar 72px */}
                    <div className="relative flex size-[72px] shrink-0 items-center justify-center rounded-full bg-bg-subtle overflow-hidden">
                      {member.photoSrc ? (
                        <img src={member.photoSrc} alt={member.name} className="absolute inset-0 size-full object-cover" />
                      ) : (
                        <span className="font-body text-[21px] font-medium leading-[21px] text-text-primary uppercase select-none">
                          {member.initials}
                        </span>
                      )}
                    </div>

                    {/* Nombre + rol */}
                    <div className="flex flex-col items-center gap-[6px] text-center w-full overflow-hidden">
                      <p className="font-display text-[24px] font-semibold leading-[25.5px] text-text-primary w-full">
                        {member.name}
                      </p>
                      <p className="font-body text-[18px] font-normal leading-[18px] text-text-muted w-full">
                        {member.role}
                      </p>
                    </div>

                    {/* CTA */}
                    <Button
                      as="a"
                      href={member.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="cta"
                      size="lg"
                      icon={<Icon type="WhatsApp" size={24} aria-hidden={false} />}
                      className="w-full"
                    >
                      Contactar
                    </Button>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      <Footer />
    </>
  )
}

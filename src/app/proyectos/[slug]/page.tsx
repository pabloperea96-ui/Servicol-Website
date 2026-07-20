// src/app/proyectos/[slug]/page.tsx — Server Component
import type { Metadata } from 'next'
import { notFound }   from 'next/navigation'
import Link           from 'next/link'
import NavigationWrapper from '@/components/organisms/NavigationWrapper'
import Footer         from '@/components/organisms/Footer'
import CTASection     from '@/components/organisms/CTASection'
import Breadcrumb     from '@/components/molecules/Breadcrumb'
import Badge          from '@/components/atoms/Badge'
import ImageGallery   from '@/components/molecules/ImageGallery'
import ProjectCard    from '@/components/molecules/ProjectCard'
import ProjectInfoBar from '@/components/molecules/ProjectInfoBar'
import UnitTypeCard   from '@/components/molecules/UnitTypeCard'
import { client }     from '@/sanity/lib/client'
import {
  PROJECT_BY_SLUG_QUERY,
  PROJECT_METADATA_QUERY,
  PROJECT_SLUGS_QUERY,
  OTHER_PROJECTS_QUERY,
  SITE_SETTINGS_QUERY,
}                     from '@/lib/queries'
import {
  toAdvisor,
  toProjectCardProps,
  toProjectMediaItems,
  toProjectProgressDisplay,
  computeInitials,
}                     from '@/lib/sanity-mappers'
import type { SanityProject, SiteSettings } from '@/lib/sanity-mappers'
import { formatCOP } from '@/lib/formatPrice'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(PROJECT_SLUGS_QUERY)
  return slugs.map(s => ({ slug: s.slug }))
}

type ProjectMeta = {
  title: string
  status: SanityProject['status']
  zone: string
  startingPrice: number | null
  mainImageUrl: string | null
}

const STATUS_LABELS: Record<SanityProject['status'], string> = {
  'en-planos':       'sobre planos',
  'en-construccion': 'en construcción',
  entregado:         'entregado',
}

function zoneLabel(zone: string): string {
  if (zone.startsWith('duitama')) return 'Duitama'
  if (zone === 'santa-rosa') return 'Santa Rosa'
  return zone.charAt(0).toUpperCase() + zone.slice(1)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const p: ProjectMeta | null = await client.fetch(PROJECT_METADATA_QUERY, { slug })
  if (!p) return {}

  const title = `${p.title} — Proyecto ${STATUS_LABELS[p.status]} en ${zoneLabel(p.zone)}`
  const description = p.startingPrice
    ? `Proyecto de vivienda nueva ${STATUS_LABELS[p.status]} en ${zoneLabel(p.zone)} desde ${formatCOP(p.startingPrice)}. Conócelo con Servicol.`
    : `Proyecto de vivienda nueva ${STATUS_LABELS[p.status]} en ${zoneLabel(p.zone)}. Conócelo con Servicol.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: p.mainImageUrl ? [{ url: p.mainImageUrl }] : [],
      type: 'website',
    },
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const project: SanityProject | null = await client.fetch(
    PROJECT_BY_SLUG_QUERY,
    { slug },
  )
  if (!project) notFound()

  const [othersRaw, settings] = await Promise.all([
    client.fetch<SanityProject[]>(OTHER_PROJECTS_QUERY, { slug }),
    client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY),
  ])

  const advisor = project.advisor
    ? toAdvisor(
        {
          name:     project.advisor.name,
          role:     project.advisor.role ?? 'Asesor comercial',
          whatsapp: project.advisor.whatsapp,
          photoUrl: project.advisor.photoUrl,
        },
        project.title,
        'proyecto',
      )
    : null
  const effectiveAdvisor = advisor ?? (settings?.whatsappMain
    ? {
        name:        'Servicol Inmobiliaria',
        role:        'Asesor disponible',
        initials:    computeInitials('Servicol Inmobiliaria'),
        whatsappUrl: `https://wa.me/${settings.whatsappMain}?text=Hola%2C+me+interesa+el+proyecto+de+Servicol%3A+${encodeURIComponent(project.title)}`,
      }
    : null)

  const media       = toProjectMediaItems(project)
  const progress    = toProjectProgressDisplay(project.status, project.progressPct)
  const otherCards  = othersRaw.map(toProjectCardProps)
  const whatsappUrl = settings?.whatsappMain
    ? `https://wa.me/${settings.whatsappMain}`
    : undefined
  const addressLine = [project.address, project.city].filter(Boolean).join(' · ')

  const desktopCrumbs = [
    { label: 'Inicio',    href: '/'          },
    { label: 'Proyectos', href: '/proyectos' },
    { label: project.title                    },
  ]

  return (
    <>
      <NavigationWrapper />

      <main className="pt-[var(--nav-height)]">

        {/* Breadcrumb */}
        <div className="px-6 pt-8 pb-3 md:px-12 md:pt-16">
          <Breadcrumb items={desktopCrumbs} />
          <nav className="flex items-center font-body text-[12px] leading-[12px] md:hidden">
            <Link
              href="/proyectos"
              className="text-text-muted hover:text-text-primary transition-colors duration-base"
            >
              ← Proyectos
            </Link>
          </nav>
        </div>

        {/* Contenido */}
        <div className="flex flex-col gap-6 px-6 pt-3 pb-6 md:px-12 md:pt-8 md:pb-12">

          {/* Heading */}
          <div className="flex flex-col items-start gap-4">
            <Badge type={project.status} />
            <div className="flex flex-col gap-1 w-full">
              <h1 className="font-display text-display-lg font-bold tracking-tight md:text-display-xl">
                {project.title}
              </h1>
              {addressLine && (
                <p className="font-body text-body-lg font-light text-text-secondary">
                  {addressLine}
                </p>
              )}
            </div>
          </div>

          {media.length > 0 && <ImageGallery media={media} title={project.title} autoPlayFirstVideo />}

          {effectiveAdvisor && (
            <ProjectInfoBar
              progressValue={progress.value}
              progressValueText={progress.valueText}
              startDate={project.startDate}
              estimatedDelivery={project.estimatedDelivery}
              advisor={effectiveAdvisor}
              whatsappUrl={effectiveAdvisor.whatsappUrl}
            />
          )}

          {/* Tipos de propiedad */}
          {project.unitTypes && project.unitTypes.length > 0 && (
            <section className="flex flex-col gap-4">
              <h2 className="font-display text-display-md font-extrabold md:text-display-lg md:font-bold">
                Tipos de propiedad
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {project.unitTypes.map(unit => (
                  <UnitTypeCard key={unit.name} {...unit} />
                ))}
              </div>
            </section>
          )}

          {/* Descripción */}
          {project.description && (
            <section className="flex flex-col gap-3">
              <h2 className="font-display text-display-md font-extrabold md:text-display-lg md:font-bold">
                Descripción
              </h2>
              <div className="flex flex-col gap-4">
                {project.description.split('\n').filter(p => p.trim()).map((paragraph, i) => (
                  <p key={i} className="whitespace-pre-line font-body text-body-md leading-relaxed text-text-secondary">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Otros proyectos */}
          {otherCards.length > 0 && (
            <section className="flex flex-col gap-6">
              <h2 className="font-display text-display-md font-extrabold md:text-display-lg md:font-bold">
                Otros proyectos
              </h2>
              <div className="md:hidden -mx-6 flex gap-4 overflow-x-auto px-6 pb-2 snap-x snap-mandatory">
                {otherCards.map(p => (
                  <div key={p.slug} className="w-[300px] shrink-0 snap-start">
                    <ProjectCard {...p} />
                  </div>
                ))}
              </div>
              <div className="hidden md:grid md:grid-cols-3 md:gap-5">
                {otherCards.map(p => (
                  <ProjectCard key={p.slug} {...p} />
                ))}
              </div>
            </section>
          )}

        </div>

        <CTASection whatsappUrl={whatsappUrl} />
      </main>

      <Footer />
    </>
  )
}

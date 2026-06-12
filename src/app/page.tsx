import NavigationWrapper         from '@/components/organisms/NavigationWrapper'
import SearchHero               from '@/components/organisms/SearchHero'
import CategoryGrid             from '@/components/organisms/CategoryGrid'
import FeaturedPropertiesSection from '@/components/organisms/FeaturedPropertiesSection'
import StatsBar                 from '@/components/organisms/StatsBar'
import TestimonialsSection      from '@/components/organisms/TestimonialsSection'
import CTASection               from '@/components/organisms/CTASection'
import Footer                   from '@/components/organisms/Footer'
import { client }               from '@/sanity/lib/client'
import { FEATURED_PROPERTIES_QUERY, TESTIMONIALS_QUERY, SITE_SETTINGS_QUERY } from '@/lib/queries'
import { toCardProps, toTestimonialCard } from '@/lib/sanity-mappers'
import type { SanityProperty, SanityTestimonial, SiteSettings } from '@/lib/sanity-mappers'

export const revalidate = 60

export default async function Home() {
  const [featured, testimonials, settings] = await Promise.all([
    client.fetch<SanityProperty[]>(FEATURED_PROPERTIES_QUERY),
    client.fetch<SanityTestimonial[]>(TESTIMONIALS_QUERY),
    client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY),
  ])
  const FEATURED     = featured.map(toCardProps)
  const TESTIMONIALS = testimonials.map(toTestimonialCard)
  const whatsappUrl  = settings?.whatsappMain
    ? `https://wa.me/${settings.whatsappMain}`
    : undefined

  return (
    <>
      <NavigationWrapper />

      <main className="pt-[var(--nav-height)]">
        <SearchHero />

        <section className="bg-bg-surface py-[var(--section-y)] px-[var(--section-x)]">
          <div className="mx-auto max-w-[1440px]">
            <CategoryGrid />
          </div>
        </section>

        <FeaturedPropertiesSection properties={FEATURED} />

        <StatsBar />
        <TestimonialsSection testimonials={TESTIMONIALS.length > 0 ? TESTIMONIALS : undefined} />
        <CTASection whatsappUrl={whatsappUrl} />
      </main>

      <Footer />
    </>
  )
}

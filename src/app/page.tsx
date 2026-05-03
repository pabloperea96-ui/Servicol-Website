import NavigationWrapper         from '@/components/organisms/NavigationWrapper'
import SearchHero               from '@/components/organisms/SearchHero'
import CategoryGrid             from '@/components/organisms/CategoryGrid'
import FeaturedPropertiesSection from '@/components/organisms/FeaturedPropertiesSection'
import StatsBar                 from '@/components/organisms/StatsBar'
import TestimonialsSection      from '@/components/organisms/TestimonialsSection'
import CTASection               from '@/components/organisms/CTASection'
import Footer                   from '@/components/organisms/Footer'
import { client }               from '@/sanity/lib/client'
import { FEATURED_PROPERTIES_QUERY, SITE_SETTINGS_QUERY } from '@/lib/queries'
import { toCardProps }          from '@/lib/sanity-mappers'
import type { SanityProperty, SiteSettings } from '@/lib/sanity-mappers'

export const revalidate = 60

export default async function Home() {
  const [featured, settings] = await Promise.all([
    client.fetch<SanityProperty[]>(FEATURED_PROPERTIES_QUERY),
    client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY),
  ])
  const FEATURED = featured.map(toCardProps)
  const whatsappUrl = settings?.whatsappMain
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
        <TestimonialsSection />
        <CTASection whatsappUrl={whatsappUrl} />
      </main>

      <Footer />
    </>
  )
}

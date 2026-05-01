import Navigation               from '@/components/organisms/Navigation'
import SearchHero               from '@/components/organisms/SearchHero'
import CategoryGrid             from '@/components/organisms/CategoryGrid'
import FeaturedPropertiesSection from '@/components/organisms/FeaturedPropertiesSection'
import StatsBar                 from '@/components/organisms/StatsBar'
import TestimonialsSection      from '@/components/organisms/TestimonialsSection'
import CTASection               from '@/components/organisms/CTASection'
import Footer                   from '@/components/organisms/Footer'
import { client }               from '@/sanity/lib/client'
import { FEATURED_PROPERTIES_QUERY } from '@/lib/queries'
import { toCardProps }          from '@/lib/sanity-mappers'
import type { SanityProperty }  from '@/lib/sanity-mappers'

export const revalidate = 60

export default async function Home() {
  const featured: SanityProperty[] = await client.fetch(FEATURED_PROPERTIES_QUERY)
  const FEATURED = featured.map(toCardProps)

  return (
    <>
      <Navigation />

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
        <CTASection />
      </main>

      <Footer />
    </>
  )
}

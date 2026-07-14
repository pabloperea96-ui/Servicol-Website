import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { ALL_SLUGS_QUERY, PROJECT_SLUGS_QUERY } from '@/lib/queries'

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://servicolinmobiliaria.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, projectSlugs] = await Promise.all([
    client.fetch<{ slug: string }[]>(ALL_SLUGS_QUERY),
    client.fetch<{ slug: string }[]>(PROJECT_SLUGS_QUERY),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE,                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 1   },
    { url: `${BASE}/portafolio`,    lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/proyectos`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/servicios`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/nosotros`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contacto`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const propertyRoutes: MetadataRoute.Sitemap = slugs.map(({ slug }) => ({
    url: `${BASE}/portafolio/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map(({ slug }) => ({
    url: `${BASE}/proyectos/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...propertyRoutes, ...projectRoutes]
}

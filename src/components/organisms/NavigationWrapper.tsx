import Navigation              from '@/components/organisms/Navigation'
import { client }             from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/lib/queries'
import type { SiteSettings }   from '@/lib/sanity-mappers'

type Props = {
  transparent?: boolean
}

export default async function NavigationWrapper({ transparent }: Props) {
  const settings: SiteSettings | null = await client.fetch(SITE_SETTINGS_QUERY)
  const whatsappUrl = settings?.whatsappMain
    ? `https://wa.me/${settings.whatsappMain}`
    : undefined

  return <Navigation transparent={transparent} whatsappUrl={whatsappUrl} />
}

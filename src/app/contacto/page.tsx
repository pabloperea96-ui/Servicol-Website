import { client }             from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/lib/queries'
import type { SiteSettings }   from '@/lib/sanity-mappers'
import { parseMapSrc }         from '@/lib/parseMapEmbed'
import NavigationWrapper        from '@/components/organisms/NavigationWrapper'
import Footer                  from '@/components/organisms/Footer'
import ContactInfoRow          from '@/components/molecules/ContactInfoRow'
import ContactoForm            from './ContactoForm'

export const revalidate = 3600

export default async function ContactoPage() {
  const settings: SiteSettings | null = await client.fetch(SITE_SETTINGS_QUERY)

  const addressLines = (settings?.officeAddress ?? '').split('\n').filter(Boolean)
  const hoursLines   = (settings?.officeHours   ?? '').split('\n').filter(Boolean)
  const mapSrc       = parseMapSrc(settings?.googleMapsEmbed)

  return (
    <>
      <NavigationWrapper />

      <main className="pt-[var(--nav-height)]">

        {/* Page header */}
        <section className="bg-bg-subtle px-5 py-16 md:px-20 md:py-24">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="font-display text-display-lg font-bold tracking-tight text-text-primary md:text-display-xl">
              Escríbenos
            </h1>
            <p className="font-body text-body-md font-light text-text-secondary md:text-body-lg">
              Nuestros expertos te ayudarán a encontrar lo que buscas
            </p>
          </div>
        </section>

        {/* Form + Info grid */}
        <section className="px-5 py-12 md:px-12 md:py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-6">

            {/* Form column */}
            <ContactoForm whatsappNumber={settings?.whatsappMain ?? ''} />

            {/* Info + Map column */}
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-display-lg font-bold tracking-tight text-text-primary">
                Información de contacto
              </h2>
              <div className="flex flex-col gap-3">
                {addressLines.length > 0 && (
                  <ContactInfoRow type="direccion" lines={addressLines} />
                )}
                {hoursLines.length > 0 && (
                  <ContactInfoRow type="horario" lines={hoursLines} />
                )}
                {settings?.email && (
                  <ContactInfoRow type="correo" lines={[settings.email]} />
                )}
                {settings?.whatsappMain && (
                  <ContactInfoRow type="telefono" lines={[settings.whatsappMain]} />
                )}
              </div>

              {mapSrc ? (
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación oficina Servicol"
                />
              ) : (
                <div className="flex h-[350px] w-full items-center justify-center overflow-hidden rounded-lg bg-bg-subtle">
                  <p className="font-display text-display-md font-bold text-text-muted">Mapa</p>
                </div>
              )}
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}

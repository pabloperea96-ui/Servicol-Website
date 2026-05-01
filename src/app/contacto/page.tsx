'use client'

import { useState } from 'react'
import Navigation     from '@/components/organisms/Navigation'
import Footer         from '@/components/organisms/Footer'
import Input          from '@/components/atoms/Input'
import Button         from '@/components/atoms/Button'
import ContactInfoRow from '@/components/molecules/ContactInfoRow'

// ── Constantes ────────────────────────────────────────────────
const WHATSAPP_NUMBER = '573112345678'

const SEARCH_OPTIONS = [
  { value: '',                 label: 'Selecciona una opción...'        },
  { value: 'comprar',          label: 'Comprar una propiedad'           },
  { value: 'arrendar',         label: 'Arrendar una propiedad'          },
  { value: 'consignar-venta',  label: 'Vender mi propiedad'             },
  { value: 'consignar-renta',  label: 'Arrendar mi propiedad'           },
  { value: 'administracion',   label: 'Administración de inmueble'      },
  { value: 'proyectos',        label: 'Información de proyectos nuevos' },
  { value: 'otro',             label: 'Otro'                            },
]

// ── Types ──────────────────────────────────────────────────────
type FormState = {
  nombre:   string
  telefono: string
  correo:   string
  tipo:     string
  mensaje:  string
}

const INITIAL: FormState = { nombre: '', telefono: '', correo: '', tipo: '', mensaje: '' }

// ── Helpers ────────────────────────────────────────────────────
function buildWhatsAppMessage(data: FormState): string {
  const tipoLabel = SEARCH_OPTIONS.find(o => o.value === data.tipo)?.label ?? '—'
  const lines = [
    `Hola, mi nombre es ${data.nombre}.`,
    '',
    `📞 Teléfono: ${data.telefono || '—'}`,
    `📧 Correo: ${data.correo || '—'}`,
    `🎯 Interés: ${tipoLabel}`,
    '',
    'Mensaje:',
    data.mensaje.trim(),
  ]
  return encodeURIComponent(lines.join('\n'))
}

// ── Page ───────────────────────────────────────────────────────
export default function ContactoPage() {
  const [form, setForm]           = useState<FormState>(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]         = useState('')

  const set =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.nombre.trim() || !form.mensaje.trim()) {
      setError('El nombre y el mensaje son obligatorios.')
      return
    }
    if (!form.telefono.trim() && !form.correo.trim()) {
      setError('Ingresa al menos un teléfono o correo para que podamos responderte.')
      return
    }
    setError('')
    setSubmitted(true)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage(form)}`, '_blank')
  }

  return (
    <>
      <Navigation />

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
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="font-display text-display-xl font-bold tracking-tight text-text-primary">
                  Escríbenos
                </h2>
                <p className="font-body text-body-lg font-light text-text-secondary">
                  Uno de nuestros asesores te contactará en menos de 24 horas.
                </p>
              </div>

              {submitted ? (
                <div className="flex flex-col gap-3 rounded-lg border border-action-cta bg-action-cta-light p-6">
                  <p className="font-display text-display-sm font-bold text-action-cta">
                    ¡Mensaje listo!
                  </p>
                  <p className="font-body text-body-md text-text-secondary">
                    Te redirigimos a WhatsApp con tu mensaje pre-rellenado. Si no se abrió, revisa los permisos de popups del navegador.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setForm(INITIAL); setSubmitted(false) }}
                    className="self-start font-body text-body-md font-medium text-action-cta underline"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
                  <Input
                    inputType="text"
                    label="Nombre completo *"
                    placeholder="Tu nombre"
                    value={form.nombre}
                    onChange={set('nombre')}
                  />
                  <Input
                    inputType="text"
                    label="Teléfono"
                    placeholder="+57 300 000 0000"
                    value={form.telefono}
                    onChange={set('telefono')}
                  />
                  <Input
                    inputType="text"
                    label="Correo electrónico"
                    placeholder="tu@correo.com"
                    value={form.correo}
                    onChange={set('correo')}
                  />
                  <Input
                    inputType="select"
                    label="¿Qué estás buscando?"
                    value={form.tipo}
                    onChange={set('tipo')}
                    options={SEARCH_OPTIONS}
                  />
                  <Input
                    inputType="textarea"
                    label="Mensaje *"
                    placeholder="Cuéntanos más sobre lo que buscas..."
                    value={form.mensaje}
                    onChange={set('mensaje')}
                  />

                  {error && (
                    <p className="font-body text-body-md text-action-error" role="alert">
                      {error}
                    </p>
                  )}

                  <Button type="submit" variant="cta" size="lg" className="mt-2 w-full">
                    Enviar mensaje
                  </Button>
                </form>
              )}
            </div>

            {/* Info + Map column */}
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-display-lg font-bold tracking-tight text-text-primary">
                Información de contacto
              </h2>
              <div className="flex flex-col gap-3">
                <ContactInfoRow type="direccion" lines={['Calle 16 #14-35, Duitama', 'Boyacá, Colombia']} />
                <ContactInfoRow type="horario"   lines={['Lunes a viernes: 8am – 6pm', 'Sábados: 9am – 1pm']} />
                <ContactInfoRow type="correo"    lines={['info@servicolinmobiliaria.com']} />
                <ContactInfoRow type="telefono"  lines={['+57 311 234 5678']} />
              </div>
              <div className="flex h-[350px] w-full items-center justify-center overflow-hidden rounded-lg bg-bg-subtle">
                <p className="font-display text-display-md font-bold text-text-muted">Mapa</p>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}

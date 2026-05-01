// src/components/organisms/ContactForm.tsx
'use client'

import { useState } from 'react'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import ContactInfoRow from '@/components/molecules/ContactInfoRow'
import { CheckCircle2 } from 'lucide-react'

const INTEREST_OPTIONS = [
  { value: '',           label: 'Selecciona una opción...' },
  { value: 'compra',     label: 'Comprar una propiedad'    },
  { value: 'arriendo',   label: 'Arrendar una propiedad'   },
  { value: 'consignar',  label: 'Consignar mi propiedad'   },
  { value: 'proyectos',  label: 'Proyectos nuevos'         },
]

type FormState = {
  nombre: string
  telefono: string
  correo: string
  interes: string
  mensaje: string
}

const INITIAL: FormState = { nombre: '', telefono: '', correo: '', interes: '', mensaje: '' }

export default function ContactForm() {
  const [form, setForm]       = useState<FormState>(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // Integración real va aquí (ej. fetch a /api/contacto)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section className="grid grid-cols-1 gap-6 px-5 py-16 md:grid-cols-2 md:gap-6 md:px-12">

      {/* Form */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="font-display text-display-xl font-bold tracking-[-0.3px] text-text-primary">
            Escríbenos
          </h2>
          <p className="font-body text-body-lg font-medium text-text-secondary">
            Uno de nuestros asesores te contactará en menos de 24 horas.
          </p>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 rounded-lg border border-border-default bg-bg-surface p-8 text-center">
            <CheckCircle2 size={40} className="text-action-cta" />
            <p className="font-display text-display-md font-bold text-text-primary">
              ¡Mensaje enviado!
            </p>
            <p className="font-body text-body-md text-text-secondary">
              Te contactaremos pronto.
            </p>
            <Button variant="outline" size="sm" onClick={() => { setForm(INITIAL); setSubmitted(false) }}>
              Enviar otro mensaje
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2" noValidate>
            <Input
              inputType="text"
              label="Nombre completo"
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={set('nombre')}
              required
            />
            <Input
              inputType="text"
              label="Teléfono"
              placeholder="+57 300 000 0000"
              value={form.telefono}
              onChange={set('telefono')}
              required
            />
            <Input
              inputType="text"
              label="Correo electrónico"
              placeholder="tu@correo.com"
              value={form.correo}
              onChange={set('correo')}
              required
            />
            <Input
              inputType="select"
              label="¿Qué estás buscando?"
              value={form.interes}
              onChange={set('interes')}
              options={INTEREST_OPTIONS}
              required
            />
            <Input
              inputType="textarea"
              label="Mensaje"
              placeholder="Cuéntanos más del tipo de propiedad que buscas..."
              value={form.mensaje}
              onChange={set('mensaje')}
            />
            <Button type="submit" variant="cta" size="lg" loading={loading} className="mt-2 w-full">
              Enviar mensaje
            </Button>
          </form>
        )}
      </div>

      {/* Info + Map */}
      <div className="flex flex-col gap-6">
        <h2 className="font-display text-display-lg font-bold tracking-[-0.2px] text-text-primary">
          Información de contacto
        </h2>
        <div className="flex flex-col gap-3">
          <ContactInfoRow type="direccion" lines={['Calle 16 #14-35, Duitama', 'Boyacá, Colombia']} />
          <ContactInfoRow type="horario"   lines={['Lunes a viernes: 8am – 6pm', 'Sábados: 9am – 1pm']} />
          <ContactInfoRow type="correo"    lines={['info@servicolinmobiliaria.com']} />
          <ContactInfoRow type="telefono"  lines={['+57 311 234 5678']} />
        </div>
        {/* Map placeholder — reemplazar con Google Maps embed */}
        <div className="h-[350px] w-full overflow-hidden rounded-lg bg-bg-subtle flex items-center justify-center">
          <p className="font-display text-display-lg font-bold text-text-muted">Mapa</p>
        </div>
      </div>
    </section>
  )
}
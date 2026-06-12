'use client'

import { useState }  from 'react'
import Input          from '@/components/atoms/Input'
import Button         from '@/components/atoms/Button'

const SEARCH_OPTIONS = [
  { value: '',                label: 'Selecciona una opción...'        },
  { value: 'comprar',         label: 'Comprar una propiedad'           },
  { value: 'arrendar',        label: 'Arrendar una propiedad'          },
  { value: 'consignar-venta', label: 'Vender mi propiedad'             },
  { value: 'consignar-renta', label: 'Arrendar mi propiedad'           },
  { value: 'administracion',  label: 'Administración de inmueble'      },
  { value: 'proyectos',       label: 'Información de proyectos nuevos' },
  { value: 'otro',            label: 'Otro'                            },
]

type FormState = {
  nombre:   string
  telefono: string
  correo:   string
  tipo:     string
  mensaje:  string
}

const INITIAL: FormState = { nombre: '', telefono: '', correo: '', tipo: '', mensaje: '' }

export default function ContactoForm() {
  const [form, setForm]           = useState<FormState>(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]         = useState('')

  const set =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
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

    try {
      const res = await fetch('/api/contacto', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Error al enviar')
      setSubmitted(true)
    } catch {
      setError('No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.')
    }
  }

  return (
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
            ¡Mensaje enviado!
          </p>
          <p className="font-body text-body-md text-text-secondary">
            Recibimos tu mensaje. Un asesor de Servicol te responderá en menos de 24 horas.
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
  )
}

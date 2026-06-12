import { Resend }       from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

const TIPO_LABELS: Record<string, string> = {
  comprar:           'Comprar una propiedad',
  arrendar:          'Arrendar una propiedad',
  'consignar-venta': 'Vender mi propiedad',
  'consignar-renta': 'Arrendar mi propiedad',
  administracion:    'Administración de inmueble',
  proyectos:         'Información de proyectos nuevos',
  otro:              'Otro',
}

export async function POST(req: NextRequest) {
  const { nombre, telefono, correo, tipo, mensaje } = await req.json()

  if (!nombre?.trim() || !mensaje?.trim()) {
    return NextResponse.json({ error: 'Faltan campos obligatorios.' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from:    `Servicol Inmobiliaria <${process.env.RESEND_FROM_EMAIL}>`,
    to:      process.env.RESEND_TO_EMAIL!,
    replyTo: correo || undefined,
    subject: `Nuevo contacto web: ${nombre}`,
    text: [
      'Nuevo mensaje desde el sitio web de Servicol Inmobiliaria',
      '',
      `Nombre:   ${nombre}`,
      `Teléfono: ${telefono || '—'}`,
      `Correo:   ${correo   || '—'}`,
      `Interés:  ${TIPO_LABELS[tipo] ?? tipo ?? '—'}`,
      '',
      'Mensaje:',
      mensaje,
    ].join('\n'),
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

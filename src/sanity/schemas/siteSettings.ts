import { defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export default defineType({
  name: 'siteSettings',
  title: 'Configuración del sitio',
  type: 'document',
  icon: CogIcon,

  // Este documento es un singleton — solo debe existir uno.
  // Para reforzarlo en el Studio, se recomienda ocultar el botón
  // "Crear nuevo" desde la configuración de la estructura del desk.

  fields: [
    defineField({
      name: 'whatsappMain',
      title: 'WhatsApp principal',
      type: 'string',
      description:
        'Número principal de Servicol. Formato internacional sin espacios: 573001234567',
      placeholder: '573001234567',
      validation: (Rule) =>
        Rule.required()
          .regex(/^57\d{10}$/, { name: 'Formato WhatsApp Colombia' })
          .error('Usa formato internacional: 573001234567'),
    }),

    defineField({
      name: 'officeAddress',
      title: 'Dirección de la oficina',
      type: 'string',
      description: 'Ej: Cr. 15 #14-69 Of. 405, Duitama, Boyacá',
      validation: (Rule) =>
        Rule.required().error('La dirección de la oficina es obligatoria'),
    }),

    defineField({
      name: 'officeHours',
      title: 'Horario de atención',
      type: 'string',
      description: 'Ej: Lun–Vie 8am–6pm · Sáb 9am–1pm',
      validation: (Rule) =>
        Rule.required().error('El horario de atención es obligatorio'),
    }),

    defineField({
      name: 'email',
      title: 'Correo electrónico',
      type: 'string',
      description: 'Correo principal de contacto de la inmobiliaria.',
      validation: (Rule) =>
        Rule.required()
          .email()
          .error('Ingresa un correo electrónico válido'),
    }),

    defineField({
      name: 'instagram',
      title: 'Instagram (URL)',
      type: 'url',
      description: 'URL completa del perfil. Ej: https://instagram.com/servicol',
      validation: (Rule) =>
        Rule.uri({ scheme: ['https'] }).error('Ingresa una URL válida con https://'),
    }),

    defineField({
      name: 'facebook',
      title: 'Facebook (URL)',
      type: 'url',
      description: 'URL completa del perfil. Ej: https://facebook.com/servicol',
      validation: (Rule) =>
        Rule.uri({ scheme: ['https'] }).error('Ingresa una URL válida con https://'),
    }),

    defineField({
      name: 'googleMapsEmbedUrl',
      title: 'URL del mapa embebido (Google Maps)',
      type: 'url',
      description:
        'URL del embed de Google Maps para mostrar la ubicación de la oficina en /contacto. Obtenerla desde Google Maps → Compartir → Incorporar un mapa → Copiar HTML → extraer solo el src="..."',
      validation: (Rule) =>
        Rule.uri({ scheme: ['https'] }).error('Ingresa una URL válida con https://'),
    }),
  ],

  // ─── PREVIEW ──────────────────────────────────────────────────────────────

  preview: {
    select: {
      whatsapp: 'whatsappMain',
      email: 'email',
    },
    prepare({ whatsapp, email }) {
      return {
        title: 'Configuración del sitio',
        subtitle: `WA: ${whatsapp ?? 'Sin configurar'} · ${email ?? 'Sin correo'}`,
      }
    },
  },
})
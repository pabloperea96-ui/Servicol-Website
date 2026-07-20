import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'
import { videoItemMember } from './objects/videoItem'

// Unit types where bedrooms/bathrooms don't apply
const UNIT_TYPES_WITHOUT_ROOMS = ['local-oficina', 'lote']

function unitTypeHasNoRooms(parent: unknown): boolean {
  const propertyType = (parent as { propertyType?: string } | undefined)?.propertyType
  return UNIT_TYPES_WITHOUT_ROOMS.includes(propertyType ?? '')
}

export default defineType({
  name: 'project',
  title: 'Proyecto',
  type: 'document',
  icon: HomeIcon,

  groups: [
    { name: 'identification', title: 'Identificación', default: true },
    { name: 'progress', title: 'Progreso de obra' },
    { name: 'media', title: 'Galería' },
    { name: 'contact', title: 'Contacto y publicación' },
  ],

  fields: [
    // ─── IDENTIFICATION ───────────────────────────────────────────────────────

    defineField({
      name: 'title',
      title: 'Nombre del proyecto',
      type: 'string',
      group: 'identification',
      description: 'Ej: Conjunto Residencial Los Arrayanes',
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(100)
          .error('El nombre debe tener entre 10 y 100 caracteres'),
    }),

    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'identification',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required().error('El slug es obligatorio'),
    }),

    defineField({
      name: 'address',
      title: 'Dirección del proyecto',
      type: 'string',
      group: 'identification',
      description: 'Dirección o sector donde se ubica el proyecto',
      validation: (Rule) => Rule.required().error('La dirección es obligatoria'),
    }),

    defineField({
      name: 'zone',
      title: 'Zona / Municipio',
      type: 'string',
      group: 'identification',
      options: {
        list: [
          { title: 'Duitama Centro', value: 'duitama-centro' },
          { title: 'Duitama Norte', value: 'duitama-norte' },
          { title: 'Duitama Sur', value: 'duitama-sur' },
          { title: 'Paipa', value: 'paipa' },
          { title: 'Tibasosa', value: 'tibasosa' },
          { title: 'Santa Rosa de Viterbo', value: 'santa-rosa' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required().error('Selecciona la zona'),
    }),

    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      group: 'identification',
      rows: 6,
      description: 'Descripción general del proyecto. Visible en la página de detalle.',
      validation: (Rule) =>
        Rule.required()
          .min(50)
          .max(2000)
          .error('La descripción debe tener entre 50 y 2000 caracteres'),
    }),

    defineField({
      name: 'status',
      title: 'Estado del proyecto',
      type: 'string',
      group: 'identification',
      options: {
        list: [
          { title: 'En planos', value: 'en-planos' },
          { title: 'En construcción', value: 'en-construccion' },
          { title: 'Entregado', value: 'entregado' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required().error('Selecciona el estado del proyecto'),
    }),

    defineField({
      name: 'startingPrice',
      title: 'Precio desde (COP)',
      type: 'number',
      group: 'identification',
      description: 'Precio de la unidad más económica disponible.',
      validation: (Rule) =>
        Rule.required()
          .min(1000000)
          .error('El precio debe ser mayor a $1.000.000 COP'),
    }),

    defineField({
      name: 'unitTypes',
      title: 'Tipos de propiedad',
      type: 'array',
      group: 'identification',
      description: 'Tipos de unidad disponibles en el proyecto.',
      of: [
        {
          type: 'object',
          name: 'unitType',
          title: 'Tipología',
          fields: [
            defineField({
              name: 'propertyType',
              title: 'Tipo de inmueble',
              type: 'string',
              options: {
                list: [
                  { title: 'Apartamento', value: 'apartamento' },
                  { title: 'Casa', value: 'casa' },
                  { title: 'Local / Oficina', value: 'local-oficina' },
                  { title: 'Lote', value: 'lote' },
                  { title: 'Finca', value: 'finca' },
                ],
                layout: 'dropdown',
              },
              validation: (Rule) =>
                Rule.required().error('Selecciona el tipo de inmueble de esta tipología'),
            }),
            defineField({
              name: 'name',
              title: 'Nombre de la tipología',
              type: 'string',
              description: 'Ej: Apartamento tipo A, Casa esquinera, Local comercial',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'area',
              title: 'Área (m²)',
              type: 'number',
              validation: (Rule) =>
                Rule.required().min(1).error('El área debe ser mayor a 0'),
            }),
            defineField({
              name: 'bedrooms',
              title: 'Habitaciones',
              type: 'number',
              hidden: ({ parent }) => unitTypeHasNoRooms(parent),
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  if (unitTypeHasNoRooms(context.parent)) return true
                  if (value === undefined || value === null) {
                    return 'Las habitaciones son obligatorias para esta tipología'
                  }
                  if (!Number.isInteger(value) || value < 0) {
                    return 'Debe ser un número entero mayor o igual a 0'
                  }
                  return true
                }),
            }),
            defineField({
              name: 'bathrooms',
              title: 'Baños',
              type: 'number',
              hidden: ({ parent }) => unitTypeHasNoRooms(parent),
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  if (unitTypeHasNoRooms(context.parent)) return true
                  if (value === undefined || value === null) {
                    return 'Los baños son obligatorios para esta tipología'
                  }
                  if (!Number.isInteger(value) || value < 0) {
                    return 'Debe ser un número entero mayor o igual a 0'
                  }
                  return true
                }),
            }),
            defineField({
              name: 'price',
              title: 'Precio (COP)',
              type: 'number',
              validation: (Rule) =>
                Rule.required()
                  .min(1000000)
                  .error('El precio debe ser mayor a $1.000.000 COP'),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              propertyType: 'propertyType',
              area: 'area',
              price: 'price',
            },
            prepare({ title, propertyType, area, price }) {
              const typeLabels: Record<string, string> = {
                apartamento:     'Apartamento',
                casa:            'Casa',
                'local-oficina': 'Local / Oficina',
                lote:            'Lote',
                finca:           'Finca',
              }
              const typePrefix = typeLabels[propertyType as string] ?? ''
              return {
                title,
                subtitle: [typePrefix, `${area}m² · $${price?.toLocaleString('es-CO')}`]
                  .filter(Boolean)
                  .join(' · '),
              }
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error('Agrega al menos una tipología'),
    }),

    // ─── PROGRESS ─────────────────────────────────────────────────────────────

    defineField({
      name: 'progressPct',
      title: 'Avance de obra (%)',
      type: 'number',
      group: 'progress',
      description:
        'Porcentaje de avance de la construcción. Valor entre 0 y 100. No aplica si el proyecto está en planos: el sitio muestra un avance genérico.',
      hidden: ({ document }) => document?.status === 'en-planos',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.status === 'en-planos') return true
          if (value === undefined || value === null) {
            return 'El avance es obligatorio cuando la obra ya inició'
          }
          if (!Number.isInteger(value) || value < 0 || value > 100) {
            return 'El avance debe ser un número entero entre 0 y 100'
          }
          return true
        }),
    }),

    defineField({
      name: 'startDate',
      title: 'Fecha de inicio de obra',
      type: 'date',
      group: 'progress',
      description: 'Opcional si el proyecto está en planos (puede ser una fecha estimada).',
      options: {
        dateFormat: 'DD/MM/YYYY',
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.status === 'en-planos') return true
          return value
            ? true
            : 'La fecha de inicio es obligatoria cuando la obra ya inició'
        }),
    }),

    defineField({
      name: 'estimatedDelivery',
      title: 'Fecha estimada de entrega',
      type: 'date',
      group: 'progress',
      description: 'Opcional si el proyecto está en planos.',
      options: {
        dateFormat: 'DD/MM/YYYY',
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (context.document?.status === 'en-planos') return true
          return value
            ? true
            : 'La fecha estimada de entrega es obligatoria cuando la obra ya inició'
        }),
    }),

    // ─── MEDIA ────────────────────────────────────────────────────────────────

    defineField({
      name: 'mainImage',
      title: 'Imagen principal',
      type: 'image',
      group: 'media',
      description: 'Imagen de portada. Aparece en las tarjetas del listado de proyectos.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Descripción de la imagen',
          type: 'string',
          validation: (Rule) =>
            Rule.required().error('Agrega una descripción para accesibilidad'),
        }),
      ],
      validation: (Rule) => Rule.required().error('La imagen principal es obligatoria'),
    }),

    defineField({
      name: 'renders',
      title: 'Galería de renders y videos',
      type: 'array',
      group: 'media',
      description:
        'Renders del proyecto: exterior, interior, planos. También acepta videos: el primero aparece de primero en la galería y se reproduce automáticamente (sin sonido) en la página del proyecto. Usa MP4 cortos y comprimidos.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Descripción de la imagen',
              type: 'string',
              validation: (Rule) =>
                Rule.required().error('Agrega una descripción para accesibilidad'),
            }),
            defineField({
              name: 'caption',
              title: 'Pie de foto (opcional)',
              type: 'string',
              description: 'Ej: Render exterior · Render interior · Plano de planta',
            }),
          ],
        },
        videoItemMember,
      ],
      validation: (Rule) =>
        Rule.required().min(1).error('Agrega al menos un render del proyecto'),
      options: {
        layout: 'grid',
      },
    }),

    // ─── CONTACT & PUBLICATION ────────────────────────────────────────────────

    defineField({
      name: 'advisor',
      title: 'Asesor a cargo',
      type: 'reference',
      group: 'contact',
      to: [{ type: 'advisor' }],
      validation: (Rule) =>
        Rule.required().error('Asigna un asesor a este proyecto'),
    }),

    defineField({
      name: 'published',
      title: 'Publicado en el sitio',
      type: 'boolean',
      group: 'contact',
      description: 'Activa para mostrar este proyecto en el sitio. Puedes cargarlo completo sin publicarlo todavía.',
      initialValue: false,
    }),

    defineField({
      name: 'featured',
      title: 'Destacar en Home',
      type: 'boolean',
      group: 'contact',
      description: 'Aparece en la sección de proyectos nuevos del inicio.',
      initialValue: false,
    }),

    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      group: 'contact',
      initialValue: () => new Date().toISOString(),
    }),
  ],

  // ─── PREVIEW ──────────────────────────────────────────────────────────────

  preview: {
    select: {
      title:         'title',
      status:        'status',
      published:     'published',
      startingPrice: 'startingPrice',
      media:         'mainImage',
    },
    prepare({ title, status, published, startingPrice, media }) {
      const statusLabels: Record<string, string> = {
        'en-planos':       'En planos',
        'en-construccion': 'En construcción',
        'entregado':       'Entregado',
      }
      const statusLabel    = statusLabels[status] ?? status
      const priceFormatted = startingPrice
        ? `$${startingPrice.toLocaleString('es-CO')}`
        : 'Sin precio'
      const draftLabel = published ? '' : ' · 🚫 No publicado'
      return {
        title,
        subtitle: `${statusLabel} · Desde ${priceFormatted}${draftLabel}`,
        media,
      }
    },
  },
})
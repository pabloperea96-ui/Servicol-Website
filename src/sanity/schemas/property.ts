import { defineField, defineType } from 'sanity'
import { HomeIcon } from '@sanity/icons'

// Regex pattern for property code validation
const PROPERTY_CODE_PATTERN = /^SVC-(AP|CA|LO|LT|FI)-\d{2}-\d{3}$/

export default defineType({
  name: 'property',
  title: 'Propiedad',
  type: 'document',
  icon: HomeIcon,

  groups: [
    { name: 'identification', title: 'Identificación', default: true },
    { name: 'specs', title: 'Especificaciones' },
    { name: 'location', title: 'Ubicación' },
    { name: 'media', title: 'Galería' },
    { name: 'contact', title: 'Contacto y publicación' },
  ],

  fields: [
    // ─── IDENTIFICATION ───────────────────────────────────────────────────────

    defineField({
      name: 'title',
      title: 'Título del inmueble',
      type: 'string',
      group: 'identification',
      description: 'Ej: Apartamento en venta en el centro de Duitama',
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .max(100)
          .error('El título debe tener entre 10 y 100 caracteres'),
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
            .replace(/[\u0300-\u036f]/g, '') // remove accents
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required().error('El slug es obligatorio'),
    }),

    defineField({
      name: 'code',
      title: 'Código de inmueble',
      type: 'string',
      group: 'identification',
      description: 'Formato: SVC-[TIPO]-[AÑO]-[SEQ] — Ej: SVC-AP-25-001',
      placeholder: 'SVC-AP-25-001',
      validation: (Rule) =>
        Rule.required()
          .regex(PROPERTY_CODE_PATTERN, {
            name: 'Formato de código',
            invert: false,
          })
          .error(
            'Formato inválido. Use SVC-AP-25-001 (tipos: AP, CA, LO, LT, FI)',
          ),
    }),

    defineField({
      name: 'propertyType',
      title: 'Tipo de inmueble',
      type: 'string',
      group: 'identification',
      options: {
        list: [
          { title: 'Apartamento', value: 'apartamento' },
          { title: 'Casa', value: 'casa' },
          { title: 'Local / Oficina', value: 'local-oficina' },
          { title: 'Lote', value: 'lote' },
          { title: 'Finca', value: 'finca' },
        ],
        layout: 'radio',
      },
      validation: (Rule) =>
        Rule.required().error('Selecciona el tipo de inmueble'),
    }),

    defineField({
      name: 'operation',
      title: 'Tipo de operación',
      type: 'string',
      group: 'identification',
      options: {
        list: [
          { title: 'Venta', value: 'venta' },
          { title: 'Arriendo', value: 'arriendo' },
        ],
        layout: 'radio',
      },
      validation: (Rule) =>
        Rule.required().error('Selecciona el tipo de operación'),
    }),

    defineField({
      name: 'price',
      title: 'Precio',
      type: 'number',
      group: 'identification',
      description:
        'En pesos colombianos (COP). Para arriendo, ingresa el canon mensual.',
      validation: (Rule) =>
        Rule.required()
          .min(1000000)
          .error('El precio debe ser mayor a $1.000.000 COP'),
    }),

    defineField({
      name: 'negotiable',
      title: 'Precio negociable',
      type: 'boolean',
      group: 'identification',
      initialValue: false,
    }),

    defineField({
      name: 'status',
      title: 'Estado',
      type: 'string',
      group: 'identification',
      options: {
        list: [
          { title: 'Disponible', value: 'disponible' },
          { title: 'No disponible', value: 'no-disponible' },
        ],
        layout: 'radio',
      },
      initialValue: 'disponible',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      group: 'identification',
      rows: 6,
      description: 'Descripción libre del inmueble. Visible en la ficha.',
      validation: (Rule) =>
        Rule.required()
          .min(50)
          .max(2000)
          .error('La descripción debe tener entre 50 y 2000 caracteres'),
    }),

    defineField({
      name: 'amenities',
      title: 'Características adicionales',
      type: 'array',
      group: 'identification',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description:
        'Ej: Cocina integral, Cuarto de lavandería, Portería 24h, Ascensor',
    }),

    // ─── SPECS ────────────────────────────────────────────────────────────────

    defineField({
      name: 'builtArea',
      title: 'Área construida (m²)',
      type: 'number',
      group: 'specs',
      hidden: ({ document }) => document?.propertyType === 'lote',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const type = context.document?.propertyType
          if (type !== 'lote' && !value) return 'El área construida es obligatoria'
          return true
        }),
    }),

    defineField({
      name: 'landArea',
      title: 'Área de lote (m²)',
      type: 'number',
      group: 'specs',
      hidden: ({ document }) =>
        !['casa', 'lote', 'finca'].includes(document?.propertyType as string),
      description: 'Aplica para casas, lotes y fincas',
    }),

    defineField({
      name: 'hectares',
      title: 'Área en hectáreas',
      type: 'number',
      group: 'specs',
      hidden: ({ document }) =>
        !['lote', 'finca'].includes(document?.propertyType as string),
      description: 'Aplica para lotes y fincas',
    }),

    defineField({
      name: 'bedrooms',
      title: 'Habitaciones',
      type: 'number',
      group: 'specs',
      hidden: ({ document }) =>
        ['local-oficina', 'lote'].includes(document?.propertyType as string),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const type = context.document?.propertyType
          if (!['local-oficina', 'lote'].includes(type as string) && !value)
            return 'El número de habitaciones es obligatorio'
          return true
        }).min(0).integer(),
    }),

    defineField({
      name: 'bathrooms',
      title: 'Baños',
      type: 'number',
      group: 'specs',
      hidden: ({ document }) => document?.propertyType === 'lote',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const type = context.document?.propertyType
          if (type !== 'lote' && !value) return 'El número de baños es obligatorio'
          return true
        }).min(0).integer(),
    }),

    defineField({
      name: 'floor',
      title: 'Piso',
      type: 'number',
      group: 'specs',
      hidden: ({ document }) =>
        !['apartamento', 'local-oficina'].includes(
          document?.propertyType as string,
        ),
      description: 'Piso en el que se encuentra el inmueble',
      validation: (Rule) => Rule.min(1).integer(),
    }),

    defineField({
      name: 'stratum',
      title: 'Estrato',
      type: 'number',
      group: 'specs',
      hidden: ({ document }) =>
        ['lote', 'finca'].includes(document?.propertyType as string),
      options: {
        list: [1, 2, 3, 4, 5, 6].map((n) => ({ title: `Estrato ${n}`, value: n })),
      },
      validation: (Rule) => Rule.min(1).max(6).integer(),
    }),

    defineField({
      name: 'parking',
      title: 'Parqueadero',
      type: 'boolean',
      group: 'specs',
      hidden: ({ document }) => document?.propertyType === 'lote',
      initialValue: false,
    }),

    defineField({
      name: 'gatedCommunity',
      title: 'Conjunto cerrado',
      type: 'boolean',
      group: 'specs',
      hidden: ({ document }) =>
        !['apartamento', 'casa'].includes(document?.propertyType as string),
      initialValue: false,
    }),

    defineField({
      name: 'landUse',
      title: 'Uso de suelo',
      type: 'string',
      group: 'specs',
      hidden: ({ document }) =>
        !['lote', 'finca'].includes(document?.propertyType as string),
      options: {
        list: [
          { title: 'Residencial', value: 'residencial' },
          { title: 'Comercial', value: 'comercial' },
          { title: 'Industrial', value: 'industrial' },
          { title: 'Agropecuario', value: 'agropecuario' },
          { title: 'Mixto', value: 'mixto' },
        ],
      },
    }),

    // ─── LOCATION ─────────────────────────────────────────────────────────────

    defineField({
      name: 'zone',
      title: 'Zona / Municipio',
      type: 'string',
      group: 'location',
      options: {
        list: [
          { title: 'Duitama Centro', value: 'duitama-centro' },
          { title: 'Duitama Norte', value: 'duitama-norte' },
          { title: 'Duitama Sur', value: 'duitama-sur' },
          { title: 'Paipa', value: 'paipa' },
          { title: 'Sogamoso', value: 'sogamoso' },
          { title: 'Santa Rosa de Viterbo', value: 'santa-rosa' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required().error('Selecciona la zona'),
    }),

    defineField({
      name: 'neighborhood',
      title: 'Barrio / Sector',
      type: 'string',
      group: 'location',
      description: 'Nombre del barrio o sector. No incluir dirección exacta.',
      validation: (Rule) => Rule.required().error('El barrio es obligatorio'),
    }),

    defineField({
      name: 'coordinates',
      title: 'Coordenadas (aproximadas)',
      type: 'object',
      group: 'location',
      description:
        'Coordenadas del sector. Se aplicará un offset en el mapa para proteger la dirección exacta.',
      fields: [
        defineField({
          name: 'lat',
          title: 'Latitud',
          type: 'number',
          validation: (Rule) =>
            Rule.required()
              .min(-90)
              .max(90)
              .error('Latitud inválida'),
        }),
        defineField({
          name: 'lng',
          title: 'Longitud',
          type: 'number',
          validation: (Rule) =>
            Rule.required()
              .min(-180)
              .max(180)
              .error('Longitud inválida'),
        }),
      ],
    }),

    // ─── MEDIA ────────────────────────────────────────────────────────────────

    defineField({
      name: 'gallery',
      title: 'Galería de fotos',
      type: 'array',
      group: 'media',
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
                Rule.required().error(
                  'Agrega una descripción para accesibilidad',
                ),
            }),
            defineField({
              name: 'caption',
              title: 'Pie de foto (opcional)',
              type: 'string',
            }),
          ],
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .error('Agrega al menos 3 fotos del inmueble'),
      options: {
        layout: 'grid',
      },
    }),

    defineField({
      name: 'mainImage',
      title: 'Foto principal',
      type: 'image',
      group: 'media',
      description: 'Foto de portada. Aparece en las tarjetas del portafolio.',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Descripción de la imagen',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required().error('La foto principal es obligatoria'),
    }),

    // ─── CONTACT & PUBLICATION ────────────────────────────────────────────────

    defineField({
      name: 'advisor',
      title: 'Asesor a cargo',
      type: 'reference',
      group: 'contact',
      to: [{ type: 'advisor' }],
      validation: (Rule) =>
        Rule.required().error('Asigna un asesor a este inmueble'),
    }),

    defineField({
      name: 'featured',
      title: 'Destacar en Home',
      type: 'boolean',
      group: 'contact',
      description: 'Aparece en la sección de propiedades destacadas del inicio.',
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
      title: 'title',
      code: 'code',
      operation: 'operation',
      status: 'status',
      media: 'mainImage',
    },
    prepare({ title, code, operation, status, media }) {
      const operationLabel = operation === 'venta' ? 'Venta' : 'Arriendo'
      const statusLabel = status === 'disponible' ? '🟢' : '🔴'
      return {
        title: `${statusLabel} ${title}`,
        subtitle: `${code} · ${operationLabel}`,
        media,
      }
    },
  },
})
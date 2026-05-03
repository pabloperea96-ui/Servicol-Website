import { defineField, defineType } from 'sanity'
import { StarIcon } from '@sanity/icons'

export default defineType({
  name: 'testimonial',
  title: 'Testimonio',
  type: 'document',
  icon: StarIcon,

  fields: [
    defineField({
      name: 'quote',
      title: 'Testimonio',
      type: 'text',
      rows: 4,
      description: 'Texto del testimonio tal como lo expresó el cliente.',
      validation: (Rule) =>
        Rule.required()
          .min(20)
          .max(500)
          .error('El testimonio debe tener entre 20 y 500 caracteres'),
    }),

    defineField({
      name: 'clientName',
      title: 'Nombre del cliente',
      type: 'string',
      validation: (Rule) =>
        Rule.required().error('El nombre del cliente es obligatorio'),
    }),

    defineField({
      name: 'city',
      title: 'Ciudad',
      type: 'string',
      options: {
        list: [
          { title: 'Duitama', value: 'duitama' },
          { title: 'Tibasosa', value: 'tibasosa' },
          { title: 'Paipa', value: 'paipa' },
          { title: 'Santa Rosa', value: 'santa-rosa' },
          { title: 'Otro', value: 'otro' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required().error('Selecciona la ciudad del cliente'),
    }),

    defineField({
      name: 'rating',
      title: 'Calificación (estrellas)',
      type: 'number',
      description: 'Número de estrellas del 1 al 5.',
      options: {
        list: [
          { title: '⭐ 1 estrella', value: 1 },
          { title: '⭐⭐ 2 estrellas', value: 2 },
          { title: '⭐⭐⭐ 3 estrellas', value: 3 },
          { title: '⭐⭐⭐⭐ 4 estrellas', value: 4 },
          { title: '⭐⭐⭐⭐⭐ 5 estrellas', value: 5 },
        ],
        layout: 'radio',
      },
      initialValue: 5,
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(5)
          .integer()
          .error('La calificación debe ser entre 1 y 5'),
    }),

    defineField({
      name: 'featured',
      title: 'Destacar en Home',
      type: 'boolean',
      description: 'Aparece en la sección de testimonios del inicio.',
      initialValue: false,
    }),
  ],

  // ─── PREVIEW ──────────────────────────────────────────────────────────────

  preview: {
    select: {
      title: 'clientName',
      city: 'city',
      rating: 'rating',
      featured: 'featured',
    },
    prepare({ title, city, rating, featured }) {
      const stars = '★'.repeat(rating ?? 0)
      const featuredLabel = featured ? ' · ⭐ Destacado' : ''
      return {
        title,
        subtitle: `${city ?? ''} · ${stars}${featuredLabel}`,
      }
    },
  },
})
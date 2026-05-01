import { defineField, defineType } from 'sanity'
import { UserIcon } from '@sanity/icons'

export default defineType({
  name: 'advisor',
  title: 'Asesor',
  type: 'document',
  icon: UserIcon,

  fields: [
    defineField({
      name: 'name',
      title: 'Nombre completo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'role',
      title: 'Cargo',
      type: 'string',
      description: 'Ej: Asesora Comercial, Director de Ventas',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Descripción',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'whatsapp',
      title: 'Número de WhatsApp',
      type: 'string',
      description: 'Formato internacional sin espacios. Ej: 573001234567',
      validation: (Rule) =>
        Rule.required()
          .regex(/^57\d{10}$/, { name: 'Formato WhatsApp Colombia' })
          .error('Usa formato internacional: 573001234567'),
    }),

    defineField({
      name: 'email',
      title: 'Email (opcional)',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),

    defineField({
      name: 'active',
      title: 'Activo',
      type: 'boolean',
      initialValue: true,
    }),
  ],

  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
})
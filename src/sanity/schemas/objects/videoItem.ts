import { defineArrayMember, defineField } from 'sanity'

// Shared gallery video member — used by property.gallery and project.renders.
// Inline array member (not registered in schemaTypes): items keep _type 'videoItem'.
export const videoItemMember = defineArrayMember({
  name: 'videoItem',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'video',
      title: 'Archivo de video',
      type: 'file',
      options: { accept: 'video/*' },
      validation: (Rule) =>
        Rule.required().error('El archivo de video es obligatorio'),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Carátula (opcional)',
      type: 'image',
      options: { hotspot: true },
      description:
        'Imagen de portada del video. Si no se sube, se mostrará un fondo oscuro.',
    }),
    defineField({
      name: 'caption',
      title: 'Descripción (opcional)',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'caption', media: 'thumbnail' },
    prepare({ title, media }) {
      return { title: (title as string | undefined) ?? 'Video', media }
    },
  },
})

// src/components/organisms/TestimonialsSection.tsx
import TestimonialCard from '@/components/molecules/TestimonialCard'
import type { ComponentProps } from 'react'

type Testimonial = ComponentProps<typeof TestimonialCard>

type TestimonialsSectionProps = {
  title?:        string
  testimonials?: Testimonial[]
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote:  'Servicol nos acompañó en todo el proceso. Encontramos el apartamento de nuestros sueños en menos de un mes.',
    name:   'Mónica Rincón',
    role:   'Compradora',
    rating: 5,
  },
  {
    quote:  'Se nota que conocen muy bien el mercado de la región. Su asesoría fue clave para cerrar un buen precio.',
    name:   'Hernando Peña',
    role:   'Comprador',
    rating: 5,
  },
  {
    quote:  'El proceso de arriendo fue muy ágil. Recomiendo Servicol a cualquier persona que busque en Boyacá.',
    name:   'Claudia Vargas',
    role:   'Arrendataria',
    rating: 5,
  },
  {
    quote:  'Excelente atención y honestidad en todo momento. Muy satisfecha con la gestión de mi propiedad.',
    name:   'Patricia Morales',
    role:   'Propietaria',
    rating: 5,
  },
]

export default function TestimonialsSection({
  title = 'Quienes confiaron en nosotros',
  testimonials = DEFAULT_TESTIMONIALS,
}: TestimonialsSectionProps) {
  return (
    <section
      className="bg-bg-surface py-[var(--section-y)] px-[var(--section-x)]"
      aria-label="Testimonios"
    >
      <div className="mx-auto max-w-[1440px] flex flex-col gap-10">
        <h2 className="font-display text-display-lg font-bold text-text-primary">
          {title}
        </h2>
        <div className="flex items-stretch gap-4 overflow-x-auto pb-2 hide-scrollbar lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} className="shrink-0 lg:w-auto" />
          ))}
        </div>
      </div>
    </section>
  )
}

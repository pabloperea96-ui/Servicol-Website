// src/components/organisms/ServiceCardGrid.tsx
import ServiceCard from '@/components/molecules/ServiceCard'
import type { ComponentProps } from 'react'

type Service = ComponentProps<typeof ServiceCard>

type ServiceCardGridProps = {
  services: Service[]
  className?: string
}

const DEFAULT_SERVICES: Service[] = [
  {
    title: 'Venta de propiedades',
    description: 'Te acompañamos en todo el proceso de compra, desde la búsqueda hasta la escritura.',
    features: ['Asesoría personalizada', 'Trámites y documentación', 'Negociación de precio'],
    href: '/servicios#venta',
  },
  {
    title: 'Arriendo',
    description: 'Encontramos el inmueble que se adapta a tu presupuesto y necesidades.',
    features: ['Búsqueda filtrada', 'Visitas coordinadas', 'Contratos seguros'],
    href: '/servicios#arriendo',
  },
  {
    title: 'Proyectos nuevos',
    description: 'Accede a proyectos sobre planos con los mejores precios de preventa.',
    features: ['Renders y planos', 'Avance de obra', 'Financiación directa'],
    href: '/proyectos',
  },
]

export default function ServiceCardGrid({
  services = DEFAULT_SERVICES,
  className,
}: ServiceCardGridProps) {
  return (
    <div
      className={[
        'grid gap-4',
        'grid-cols-1 md:grid-cols-2',
        className,
      ].filter(Boolean).join(' ')}
    >
      {services.map((service) => (
        <ServiceCard key={service.title} {...service} />
      ))}
    </div>
  )
}
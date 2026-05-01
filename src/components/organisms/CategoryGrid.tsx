// src/components/organisms/CategoryGrid.tsx
import CategoryCard from '@/components/molecules/CategoryCard'
import type { ComponentProps } from 'react'

type Category = ComponentProps<typeof CategoryCard>

type CategoryGridProps = {
  categories?: Category[]
  className?: string
}

const DEFAULT_CATEGORIES: Category[] = [
  { title: 'Apartamentos', subtitle: 'Venta · Arriendo', icon: 'Apt',      href: '/portafolio?tipo=apartamento' },
  { title: 'Casas',        subtitle: 'Venta · Arriendo', icon: 'Home',     href: '/portafolio?tipo=casa'        },
  { title: 'Locales',      subtitle: 'Venta · Arriendo', icon: 'Business', href: '/portafolio?tipo=local'       },
  { title: 'Lotes',        subtitle: 'Venta',            icon: 'Area',     href: '/portafolio?tipo=lote'        },
  { title: 'Fincas',       subtitle: 'Venta · Arriendo', icon: 'Rural',    href: '/portafolio?tipo=finca'       },
]

export default function CategoryGrid({
  categories = DEFAULT_CATEGORIES,
  className,
}: CategoryGridProps) {
  return (
    <div
      className={[
        'grid gap-4',
        'grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4',
        className,
      ].filter(Boolean).join(' ')}
    >
      {categories.map((cat) => (
        <CategoryCard key={cat.title} {...cat} />
      ))}
    </div>
  )
}
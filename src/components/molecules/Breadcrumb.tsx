// src/components/molecules/Breadcrumb.tsx
import Link from 'next/link'

type BreadcrumbItem = { label: string; href?: string }

type BreadcrumbProps = {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={['hidden md:flex items-center gap-[6px] font-body text-[12px] leading-[12px]', className].filter(Boolean).join(' ')}
    >
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={i} className="flex items-center gap-[6px]">
            {i > 0 && <span className="text-border-default" aria-hidden>/</span>}
            {isLast || !item.href ? (
              <span className={isLast ? 'font-medium text-text-primary' : 'text-text-muted'}>
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="text-text-muted hover:text-text-primary transition-colors duration-base">
                {item.label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
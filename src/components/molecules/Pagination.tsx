// src/components/molecules/Pagination.tsx
'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

function getPages(current: number, total: number): (number | '…')[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 3) return [1, 2, 3, '…', total]
  if (current >= total - 2) return [1, '…', total - 2, total - 1, total]
  return [1, '…', current - 1, current, current + 1, '…', total]
}

export default function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  const pages = getPages(currentPage, totalPages)

  return (
    <nav
      aria-label="Paginación"
      className={['flex items-center gap-4', className].filter(Boolean).join(' ')}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 rounded-md border-[1.5px] border-action-primary px-4 py-2 font-body text-body-md font-medium text-text-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-bg-subtle transition-colors duration-base"
        aria-label="Página anterior"
      >
        <ArrowLeft size={16} aria-hidden /> Anterior
      </button>

      <div className="flex items-center gap-1">
        {pages.map((page, i) =>
          page === '…' ? (
            <span key={`ellipsis-${i}`} className="flex size-9 items-center justify-center font-body text-[13px] text-text-muted">
              ···
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              aria-current={page === currentPage ? 'page' : undefined}
              className={[
                'flex size-9 items-center justify-center rounded-md font-body text-[13px] transition-colors duration-base',
                page === currentPage
                  ? 'bg-action-cta text-text-inverse font-bold'
                  : 'text-text-secondary hover:bg-bg-subtle',
              ].join(' ')}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 rounded-md border-[1.5px] border-action-primary px-4 py-2 font-body text-body-md font-medium text-text-primary disabled:opacity-40 disabled:cursor-not-allowed hover:bg-bg-subtle transition-colors duration-base"
        aria-label="Página siguiente"
      >
        Siguiente <ArrowRight size={16} aria-hidden />
      </button>
    </nav>
  )
}
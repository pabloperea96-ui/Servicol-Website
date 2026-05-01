'use client'

// src/components/molecules/PaginationController.tsx
import { useSearchParams, useRouter } from 'next/navigation'
import Pagination from '@/components/molecules/Pagination'

type PaginationControllerProps = {
  totalPages:  number
  currentPage: number
  className?:  string
}

export default function PaginationController({
  totalPages,
  currentPage,
  className,
}: PaginationControllerProps) {
  const searchParams = useSearchParams()
  const router       = useRouter()

  function handlePageChange(page: number) {
    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) params.delete('pagina')
    else params.set('pagina', String(page))
    router.replace(`/portafolio?${params.toString()}`, { scroll: true })
  }

  if (totalPages <= 1) return null

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      className={className}
    />
  )
}

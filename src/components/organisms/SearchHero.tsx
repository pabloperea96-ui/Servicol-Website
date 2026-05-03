'use client'

import { useRouter } from 'next/navigation'
import Hero from '@/components/organisms/Hero'

export default function SearchHero() {
  const router = useRouter()

  function handleSearch(values: { tipo: string; operacion: string; zona: string }) {
    const params = new URLSearchParams()
    if (values.tipo)      params.set('tipo', values.tipo)
    if (values.operacion) params.set('operacion', values.operacion)
    if (values.zona)      params.set('zona', values.zona)
    router.push(`/portafolio?${params.toString()}`)
  }

  return <Hero imageSrc="/images/hero-bg.jpg" searchProps={{ onSearch: handleSearch }} />
}

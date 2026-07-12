'use client'

import { useEffect } from 'react'

// Disables the browser's automatic scroll restoration so route changes
// always start at the top. Replaces the inline <script> that React 19
// flags inside the root layout's <head>.
export default function ScrollRestoration() {
  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [])

  return null
}

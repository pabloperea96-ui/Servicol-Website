'use client'
import { useState } from 'react'
export default function TestTapPage() {
  const [count, setCount] = useState(0)
  return (
    <main className="min-h-screen bg-bg-canvas p-6">
      <h1 className="text-display-sm text-text-primary">Tap test</h1>
      <p className="mt-2 text-body-md text-text-secondary">
        Si este contador sube en iPhone, los eventos sí llegan.
      </p>
      <button
        type="button"
        onClick={() => setCount(prev => prev + 1)}
        className="mt-6 rounded-md bg-action-cta px-6 py-3 text-button-default text-text-inverse"
      >
        Tapped {count}
      </button>
    </main>
  )
}

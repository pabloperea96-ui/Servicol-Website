'use client'

import { useState, useEffect, useRef } from 'react'

const WORDS    = ['hogar', 'local', 'lote', 'finca', 'casa', 'proyecto'] as const
const FEMININE = new Set<Word>(['finca', 'casa'])
type Word  = typeof WORDS[number]
type Phase = 'visible' | 'exit' | 'enter'

type Props = {
  isDark?: boolean
}

export default function HeroHeadline({ isDark = false }: Props) {
  const [idx,     setIdx]     = useState(0)
  const [phase,   setPhase]   = useState<Phase>('visible')
  const [reduced, setReduced] = useState(false)
  const [widths,  setWidths]  = useState<Partial<Record<Word, number>>>({})
  const measureRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  // Measure each word's rendered width once on mount
  useEffect(() => {
    if (!measureRef.current) return
    const spans = measureRef.current.querySelectorAll<HTMLSpanElement>('[data-word]')
    const measured: Partial<Record<Word, number>> = {}
    spans.forEach(span => {
      measured[span.getAttribute('data-word') as Word] = span.offsetWidth
    })
    setWidths(measured)
  }, [])

  useEffect(() => {
    if (reduced || phase !== 'visible') return
    const t = setTimeout(() => setPhase('exit'), 1800)
    return () => clearTimeout(t)
  }, [phase, reduced])

  useEffect(() => {
    if (phase !== 'exit') return
    const t = setTimeout(() => {
      setIdx(i => (i + 1) % WORDS.length)
      setPhase('enter')
    }, 150)
    return () => clearTimeout(t)
  }, [phase])

  useEffect(() => {
    if (phase !== 'enter') return
    const t = setTimeout(() => setPhase('visible'), 150)
    return () => clearTimeout(t)
  }, [phase])

  const word: Word  = reduced ? WORDS[0] : WORDS[idx]
  const adj         = FEMININE.has(word) ? 'próxima' : 'próximo'
  const wordWidth   = widths[word]

  const animStyle: string | undefined =
    reduced           ? undefined :
    phase === 'exit'  ? 'hero-word-exit 150ms ease-in forwards' :
    phase === 'enter' ? 'hero-word-enter 150ms ease-out forwards' :
    undefined

  const textColor   = isDark ? 'text-text-inverse'    : 'text-text-primary'
  const citiesColor = isDark ? 'text-text-inverse/70' : 'text-text-secondary'

  return (
    <h1 className={[
      'font-display font-extrabold leading-[1.1] tracking-[-0.5px]',
      'text-display-xl md:text-display-2xl',
      textColor,
    ].join(' ')}>

      {/* Measurement container — invisible, inherits same font as h1 */}
      <span
        ref={measureRef}
        aria-hidden
        className="pointer-events-none absolute opacity-0"
      >
        {WORDS.map(w => (
          <span
            key={w}
            data-word={w}
            style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
          >
            {w}
          </span>
        ))}
      </span>

      {/* Línea 1 */}
      <span className="block md:whitespace-nowrap">
        Encuentra tu {adj}{' '}
        <span
          className="relative inline-block overflow-hidden"
          style={{
            verticalAlign: 'bottom',
            width:      wordWidth !== undefined ? `${wordWidth}px` : undefined,
            transition: 'width 150ms ease-in-out',
          }}
          aria-live="polite"
          aria-atomic="true"
        >
          <span
            className="block whitespace-nowrap"
            style={{
              animation: animStyle,
              color: isDark
                ? 'var(--color-action-cta-light)'
                : 'var(--color-action-cta)',
            }}
          >
            {word}
          </span>
        </span>
      </span>

      {/* Línea 2 */}
      <span className={`block ${citiesColor}`}>
        en Duitama · Paipa · Tibasosa
      </span>

    </h1>
  )
}

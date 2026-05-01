'use client'

import { useState, useEffect } from 'react'
import { createPortal }        from 'react-dom'
import Button                  from '@/components/atoms/Button'

type Props = {
  images: string[]
  title:  string
}

export default function ImageGallery({ images, title }: Props) {
  const [isOpen,  setIsOpen]  = useState(false)
  const [current, setCurrent] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const main          = images[0] ?? ''
  const total         = images.length
  const mobileThumbs  = images.slice(1, 5)
  const mobileExtra   = total - 4
  const desktopThumbs = images.slice(1, 4)

  function open(index: number) {
    setCurrent(index)
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }
  function close() {
    setIsOpen(false)
    document.body.style.overflow = ''
  }
  function next() { setCurrent(i => (i + 1) % images.length) }
  function prev() { setCurrent(i => (i - 1 + images.length) % images.length) }

  useEffect(() => {
    if (!isOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape')     close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft')  prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  const lightbox = (
    <div
      onClick={close}
      style={{
        position:        'fixed',
        inset:           0,
        zIndex:          99999,
        background:      'rgba(0,0,0,0.92)',
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
      }}
    >
      {/* Imagen */}
      <img
        src={images[current]}
        alt={`${title} ${current + 1}`}
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain' }}
      />

      {/* Cerrar — esquina superior derecha */}
      <button
        type="button"
        onClick={close}
        aria-label="Cerrar"
        style={{
          position:        'fixed',
          top:             16,
          right:           16,
          width:           44,
          height:          44,
          borderRadius:    '50%',
          background:      'rgba(0,0,0,0.6)',
          color:           'white',
          border:          'none',
          fontSize:        20,
          cursor:          'pointer',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
        }}
      >
        ✕
      </button>

      {/* Anterior — centro izquierdo */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={e => { e.stopPropagation(); prev() }}
          aria-label="Foto anterior"
          style={{
            position:        'fixed',
            left:            16,
            top:             '50%',
            transform:       'translateY(-50%)',
            width:           44,
            height:          44,
            borderRadius:    '50%',
            background:      'rgba(0,0,0,0.6)',
            color:           'white',
            border:          'none',
            fontSize:        20,
            cursor:          'pointer',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
          }}
        >
          ←
        </button>
      )}

      {/* Siguiente — centro derecho */}
      {images.length > 1 && (
        <button
          type="button"
          onClick={e => { e.stopPropagation(); next() }}
          aria-label="Siguiente foto"
          style={{
            position:        'fixed',
            right:           16,
            top:             '50%',
            transform:       'translateY(-50%)',
            width:           44,
            height:          44,
            borderRadius:    '50%',
            background:      'rgba(0,0,0,0.6)',
            color:           'white',
            border:          'none',
            fontSize:        20,
            cursor:          'pointer',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
          }}
        >
          →
        </button>
      )}

      {/* Contador — centro inferior */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position:     'fixed',
          bottom:       24,
          left:         '50%',
          transform:    'translateX(-50%)',
          background:   'rgba(0,0,0,0.6)',
          color:        'white',
          padding:      '4px 16px',
          borderRadius: 999,
          fontSize:     14,
          whiteSpace:   'nowrap',
        }}
      >
        {current + 1} / {images.length}
      </div>
    </div>
  )

  return (
    <>
      {/* ── Mobile ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-2 md:hidden">
        <div
          className="relative h-[253px] w-full overflow-hidden rounded-sm bg-bg-subtle cursor-pointer"
          onClick={() => open(0)}
        >
          {main && <img src={main} alt={title} className="size-full object-cover" />}
        </div>

        {mobileThumbs.length > 0 && (
          <div className="flex h-[58px] gap-2">
            {mobileThumbs.map((img, i) => {
              const isLast    = i === mobileThumbs.length - 1
              const showExtra = isLast && mobileExtra > 0
              return (
                <div
                  key={i}
                  className="relative flex-[1_0_0] min-w-0 overflow-hidden rounded-sm bg-bg-subtle cursor-pointer"
                  onClick={() => open(i + 1)}
                >
                  <img src={img} alt="" className="size-full object-cover" aria-hidden />
                  {showExtra && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <span className="font-display text-display-sm font-bold text-text-inverse">
                        +{mobileExtra}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Desktop ────────────────────────────────────────── */}
      <div className="hidden md:flex h-[588px] gap-2 overflow-hidden rounded-sm">
        <div
          className="relative flex flex-[1_0_0] flex-col items-end overflow-hidden rounded-sm bg-bg-subtle px-1 py-3 cursor-pointer"
          onClick={() => open(0)}
        >
          {main && <img src={main} alt={title} className="absolute inset-0 size-full object-cover" />}
          <div className="relative flex flex-[1_0_0] flex-col items-end justify-between min-h-0 w-full px-2">
            <div className="rounded-[4px] bg-black/[0.65] px-[10px] py-1">
              <span className="font-body text-[12px] font-medium leading-normal text-text-inverse whitespace-nowrap">
                1 / {total}
              </span>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={e => { e.stopPropagation(); open(0) }}
            >
              Ver todas las fotos
            </Button>
          </div>
        </div>

        <div className="flex w-[214px] shrink-0 flex-col gap-2">
          {desktopThumbs.map((img, i) => (
            <div
              key={i}
              className="relative flex-[1_0_0] min-h-0 overflow-hidden rounded-sm bg-bg-subtle cursor-pointer"
              onClick={() => open(i + 1)}
            >
              <img src={img} alt="" className="size-full object-cover" aria-hidden />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox via portal */}
      {mounted && isOpen && createPortal(lightbox, document.body)}
    </>
  )
}

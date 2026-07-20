'use client'

import { useState, useEffect, useSyncExternalStore } from 'react'
import { createPortal }        from 'react-dom'
import Button                  from '@/components/atoms/Button'
import type { MediaItem }      from '@/lib/sanity-mappers'

type Props = {
  media: MediaItem[]
  title: string
  autoPlayFirstVideo?: boolean
}

function PlayIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      aria-hidden
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function VideoOverlay({ small = false }: { small?: boolean }) {
  const ring = small ? 'w-6 h-6' : 'w-10 h-10'
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
      <div className={`flex items-center justify-center ${ring} rounded-full bg-white/90`}>
        <PlayIcon size={small ? 10 : 16} />
      </div>
    </div>
  )
}

function MediaThumbContent({
  item,
  alt,
  small = false,
}: {
  item: MediaItem
  alt: string
  small?: boolean
}) {
  if (item.mediaType === 'image') {
    return <img src={item.url} alt={alt} className="size-full object-cover" />
  }
  return (
    <>
      {item.thumbnailUrl ? (
        <img src={item.thumbnailUrl} alt={alt} className="size-full object-cover" />
      ) : (
        <div className="size-full bg-bg-dark" />
      )}
      <VideoOverlay small={small} />
    </>
  )
}

function AutoplayHeroVideo({
  item,
  className,
  onOrientation,
}: {
  item: Extract<MediaItem, { mediaType: 'video' }>
  className: string
  onOrientation?: (isPortrait: boolean) => void
}) {
  return (
    <video
      src={item.url}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={item.thumbnailUrl}
      aria-label={item.caption ?? 'Video'}
      className={className}
      onLoadedMetadata={e =>
        onOrientation?.(e.currentTarget.videoHeight > e.currentTarget.videoWidth)
      }
      // React doesn't serialize `muted` into SSR markup, which makes browsers
      // block autoplay on the hydrated element — force it and retry play()
      ref={el => {
        if (el) {
          el.muted = true
          el.play().catch(() => {})
          // metadata may already be loaded (e.g. cached video), so the
          // loadedmetadata event would never fire for this element
          if (el.readyState >= 1) {
            onOrientation?.(el.videoHeight > el.videoWidth)
          }
        }
      }}
    />
  )
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

function subscribeToReducedMotion(onStoreChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY)
  query.addEventListener('change', onStoreChange)
  return () => query.removeEventListener('change', onStoreChange)
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  )
}

export default function ImageGallery({ media, title, autoPlayFirstVideo = false }: Props) {
  const [isOpen,  setIsOpen]  = useState(false)
  const [current, setCurrent] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [heroIsPortrait, setHeroIsPortrait] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => { setMounted(true) }, [])

  const main          = media[0]
  const autoplayHero  = autoPlayFirstVideo && !reducedMotion && main?.mediaType === 'video'
  const total         = media.length
  const mobileThumbs  = media.slice(1, 5)
  const mobileExtra   = total - 4
  const desktopThumbs = media.slice(1, 4)

  function open(index: number) {
    setCurrent(index)
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }
  function close() {
    setIsOpen(false)
    document.body.style.overflow = ''
  }
  function next() { setCurrent(i => (i + 1) % media.length) }
  function prev() { setCurrent(i => (i - 1 + media.length) % media.length) }

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

  const item = media[current]

  const lightbox = (
    <div
      onClick={close}
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         99999,
        background:     'rgba(0,0,0,0.92)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
      }}
    >
      {/* Contenido */}
      {!item ? null : item.mediaType === 'video' ? (
        <video
          key={item.url}
          controls
          autoPlay
          src={item.url}
          onClick={e => e.stopPropagation()}
          style={{ maxHeight: '90vh', maxWidth: '90vw' }}
        />
      ) : (
        <img
          src={item.url}
          alt={item.alt}
          onClick={e => e.stopPropagation()}
          style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain' }}
        />
      )}

      {/* Cerrar — esquina superior derecha */}
      <button
        type="button"
        onClick={close}
        aria-label="Cerrar"
        style={{
          position:       'fixed',
          top:            16,
          right:          16,
          width:          44,
          height:         44,
          borderRadius:   '50%',
          background:     'rgba(0,0,0,0.6)',
          color:          'white',
          border:         'none',
          fontSize:       20,
          cursor:         'pointer',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
        }}
      >
        ✕
      </button>

      {/* Anterior — centro izquierdo */}
      {media.length > 1 && (
        <button
          type="button"
          onClick={e => { e.stopPropagation(); prev() }}
          aria-label="Anterior"
          style={{
            position:       'fixed',
            left:           16,
            top:            '50%',
            transform:      'translateY(-50%)',
            width:          44,
            height:         44,
            borderRadius:   '50%',
            background:     'rgba(0,0,0,0.6)',
            color:          'white',
            border:         'none',
            fontSize:       20,
            cursor:         'pointer',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
          }}
        >
          ←
        </button>
      )}

      {/* Siguiente — centro derecho */}
      {media.length > 1 && (
        <button
          type="button"
          onClick={e => { e.stopPropagation(); next() }}
          aria-label="Siguiente"
          style={{
            position:       'fixed',
            right:          16,
            top:            '50%',
            transform:      'translateY(-50%)',
            width:          44,
            height:         44,
            borderRadius:   '50%',
            background:     'rgba(0,0,0,0.6)',
            color:          'white',
            border:         'none',
            fontSize:       20,
            cursor:         'pointer',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
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
        {current + 1} / {media.length}
      </div>
    </div>
  )

  return (
    <>
      {/* ── Mobile ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-2 md:hidden">
        <div
          className={[
            'relative w-full overflow-hidden rounded-sm bg-bg-subtle cursor-pointer',
            autoplayHero && heroIsPortrait ? 'aspect-[4/5]' : 'h-[253px]',
          ].join(' ')}
          onClick={() => open(0)}
        >
          {main && (autoplayHero && main.mediaType === 'video' ? (
            <AutoplayHeroVideo
              item={main}
              onOrientation={setHeroIsPortrait}
              className="size-full object-cover pointer-events-none"
            />
          ) : (
            <MediaThumbContent item={main} alt={title} />
          ))}
        </div>

        {mobileThumbs.length > 0 && (
          <div className="flex h-[58px] gap-2">
            {mobileThumbs.map((item, i) => {
              const isLast    = i === mobileThumbs.length - 1
              const showExtra = isLast && mobileExtra > 0
              const thumbAlt  = item.mediaType === 'image' ? item.alt : (item.caption ?? '')
              return (
                <div
                  key={i}
                  className="relative flex-[1_0_0] min-w-0 overflow-hidden rounded-sm bg-bg-subtle cursor-pointer"
                  onClick={() => open(i + 1)}
                >
                  <MediaThumbContent item={item} alt={thumbAlt} small />
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
          {main?.mediaType === 'image' && (
            <img src={main.url} alt={main.alt} className="absolute inset-0 size-full object-cover" />
          )}
          {main?.mediaType === 'video' && (autoplayHero ? (
            <>
              {heroIsPortrait && (main.thumbnailUrl ? (
                <img
                  src={main.thumbnailUrl}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 size-full object-cover blur-2xl scale-110"
                />
              ) : (
                <div className="absolute inset-0 bg-bg-dark" />
              ))}
              <AutoplayHeroVideo
                item={main}
                onOrientation={setHeroIsPortrait}
                className={[
                  'absolute inset-0 size-full pointer-events-none',
                  heroIsPortrait ? 'object-contain' : 'object-cover',
                ].join(' ')}
              />
            </>
          ) : (
            <>
              {main.thumbnailUrl ? (
                <img src={main.thumbnailUrl} alt={main.caption ?? 'Video'} className="absolute inset-0 size-full object-cover" />
              ) : (
                <div className="absolute inset-0 bg-bg-dark" />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/90">
                  <PlayIcon size={22} />
                </div>
              </div>
            </>
          ))}
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
          {desktopThumbs.map((item, i) => {
            const thumbAlt = item.mediaType === 'image' ? item.alt : (item.caption ?? '')
            return (
              <div
                key={i}
                className="relative flex-[1_0_0] min-h-0 overflow-hidden rounded-sm bg-bg-subtle cursor-pointer"
                onClick={() => open(i + 1)}
              >
                <MediaThumbContent item={item} alt={thumbAlt} />
              </div>
            )
          })}
        </div>
      </div>

      {/* Lightbox via portal */}
      {mounted && isOpen && createPortal(lightbox, document.body)}
    </>
  )
}

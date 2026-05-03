// src/components/molecules/PropertyMap.tsx
import { parseMapSrc } from '@/lib/parseMapEmbed'

type Props = {
  embedHtml?: string | null
  className?: string
}

export default function PropertyMap({ embedHtml, className }: Props) {
  const mapSrc = parseMapSrc(embedHtml)

  return (
    <div className={['flex flex-col gap-3', className].filter(Boolean).join(' ')}>
      {mapSrc ? (
        <iframe
          src={mapSrc}
          width="100%"
          className="flex-1 min-h-[400px] w-full rounded-lg"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación de la propiedad"
        />
      ) : (
        <div className="flex-1 min-h-[222px] overflow-hidden rounded-lg bg-bg-subtle p-2">
          <div className="flex h-full items-center justify-center rounded-md">
            <span className="font-display text-display-lg font-bold text-text-muted">
              Ubicación Google Maps
            </span>
          </div>
        </div>
      )}
      <p className="font-body text-[12px] text-text-muted">
        Ubicación aproximada del sector.
      </p>
    </div>
  )
}

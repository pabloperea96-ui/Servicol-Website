// src/components/molecules/PropertyMap.tsx
type Props = {
  address?: string
}

export default function PropertyMap({ address: _ }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-lg bg-bg-subtle p-2">
        <div className="flex min-h-[222px] items-center justify-center rounded-md">
          <span className="font-display text-display-lg font-bold text-text-muted">
            Ubicación Google Maps
          </span>
        </div>
      </div>
      <p className="font-body text-[12px] text-text-muted">
        Ubicación aproximada del sector.
      </p>
    </div>
  )
}

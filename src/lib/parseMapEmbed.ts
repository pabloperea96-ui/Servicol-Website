export function parseMapSrc(embedHtml: string | undefined | null): string | null {
  if (!embedHtml) return null
  const match = embedHtml.match(/src="([^"]+)"/)
  const src = match?.[1] ?? null
  if (!src) return null

  // When API key is available, use Embed API v1 — always renders a pin
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY
  if (key) {
    const lat = src.match(/!3d(-?\d+\.\d+)/)?.[1]
    const lng = src.match(/!2d(-?\d+\.\d+)/) ?.[1]
              ?? src.match(/!4d(-?\d+\.\d+)/)?.[1]
    if (lat && lng) {
      return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${lat},${lng}&zoom=16`
    }
  }

  // Street View embed (pb starts with !4v) — convert to plain map without pin
  if (/\bpb=!4v/.test(src)) {
    const lat = src.match(/!3d(-?\d+\.\d+)/)?.[1]
    const lng = src.match(/!4d(-?\d+\.\d+)/)?.[1]
              ?? src.match(/!2d(-?\d+\.\d+)/)?.[1]
    if (lat && lng) {
      return `https://maps.google.com/maps?q=${lat},${lng}&output=embed&z=16`
    }
  }

  return src
}

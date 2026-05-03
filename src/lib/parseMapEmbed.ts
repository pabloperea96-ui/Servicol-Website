export function parseMapSrc(embedHtml: string | undefined | null): string | null {
  if (!embedHtml) return null
  const match = embedHtml.match(/src="([^"]+)"/)
  return match?.[1] ?? null
}

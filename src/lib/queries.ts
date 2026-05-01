import { groq } from 'next-sanity'

// ─── Fragmento ciudad desde zone ──────────────────────────────────────────────
const cityFromZone = groq`select(
  zone == "duitama-centro" || zone == "duitama-norte" || zone == "duitama-sur" => "Duitama, Boyacá",
  zone == "sogamoso"   => "Sogamoso, Boyacá",
  zone == "paipa"      => "Paipa, Boyacá",
  zone == "santa-rosa" => "Santa Rosa, Boyacá",
  "Boyacá"
)`

// ─── Campos comunes a todas las cards ────────────────────────────────────────
const PROPERTY_CARD_FIELDS = groq`
  _id,
  title,
  "slug":        slug.current,
  operation,
  propertyType,
  price,
  "area":        builtArea,
  bedrooms,
  bathrooms,
  parking,
  zone,
  neighborhood,
  "location":    neighborhood + ", " + ${cityFromZone},
  featured,
  status,
  "mainImageUrl": mainImage.asset->url,
  "mainImageAlt": mainImage.alt
`

// ─── Queries principales ──────────────────────────────────────────────────────

export const ALL_PROPERTIES_QUERY = groq`
  *[_type == "property" && status == "disponible"] | order(publishedAt desc) {
    ${PROPERTY_CARD_FIELDS}
  }
`

export const FEATURED_PROPERTIES_QUERY = groq`
  *[_type == "property" && status == "disponible" && featured == true]
  | order(publishedAt desc)[0...12] {
    ${PROPERTY_CARD_FIELDS}
  }
`

export const PROPERTY_BY_SLUG_QUERY = groq`
  *[_type == "property" && slug.current == $slug && status == "disponible"][0] {
    ${PROPERTY_CARD_FIELDS},
    code,
    description,
    amenities,
    floor,
    stratum,
    coordinates,
    "address": neighborhood + ", " + ${cityFromZone},
    "gallery": gallery[]{
      "url":     asset->url,
      "alt":     alt,
      caption
    },
    advisor-> {
      name,
      role,
      whatsapp,
      "photoUrl": photo.asset->url
    }
  }
`

export const SIMILAR_PROPERTIES_QUERY = groq`
  *[
    _type == "property"
    && status == "disponible"
    && propertyType == $propertyType
    && slug.current != $slug
  ] | order(publishedAt desc)[0...4] {
    ${PROPERTY_CARD_FIELDS}
  }
`

export const ALL_SLUGS_QUERY = groq`
  *[_type == "property" && defined(slug.current) && status == "disponible"]{ "slug": slug.current }
`

import { groq } from 'next-sanity'

// ─── Fragmento ciudad desde zone ──────────────────────────────────────────────
const cityFromZone = groq`select(
  zone == "duitama-centro" || zone == "duitama-norte" || zone == "duitama-sur" => "Duitama, Boyacá",
  zone == "tibasosa"   => "Tibasosa, Boyacá",
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
  *[_type == "property" && status == "disponible" && published == true] | order(publishedAt desc) {
    ${PROPERTY_CARD_FIELDS}
  }
`

export const FEATURED_PROPERTIES_QUERY = groq`
  *[_type == "property" && status == "disponible" && published == true && featured == true]
  | order(publishedAt desc)[0...12] {
    ${PROPERTY_CARD_FIELDS}
  }
`

export const PROPERTY_BY_SLUG_QUERY = groq`
  *[_type == "property" && slug.current == $slug && status == "disponible" && published == true][0] {
    ${PROPERTY_CARD_FIELDS},
    code,
    description,
    amenities,
    floor,
    stratum,
    "address": neighborhood + ", " + ${cityFromZone},
    googleMapsEmbed,
    "gallery": gallery[]{
      _type == "image" => {
        "mediaType": "image",
        "url":       asset->url,
        "alt":       alt,
        caption
      },
      _type == "videoItem" => {
        "mediaType":    "video",
        "url":          video.asset->url,
        "thumbnailUrl": thumbnail.asset->url,
        caption
      }
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
    && status == "disponible" && published == true
    && propertyType == $propertyType
    && slug.current != $slug
  ] | order(publishedAt desc)[0...4] {
    ${PROPERTY_CARD_FIELDS}
  }
`

export const ALL_SLUGS_QUERY = groq`
  *[_type == "property" && defined(slug.current) && status == "disponible" && published == true]{ "slug": slug.current }
`

export const PROPERTY_METADATA_QUERY = groq`
  *[_type == "property" && slug.current == $slug && defined(slug)][0] {
    title,
    propertyType,
    operation,
    price,
    "area": builtArea,
    zone,
    "slug": slug.current,
    "mainImageUrl": mainImage.asset->url
  }
`

export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial" && featured == true] | order(_createdAt desc) {
    _id,
    quote,
    "name": clientName,
    city,
    rating,
  }
`

export const ADVISORS_QUERY = groq`
  *[_type == "advisor"] | order(_createdAt asc) {
    _id,
    name,
    role,
    whatsapp,
    "photoUrl": photo.asset->url,
  }
`

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    whatsappMain,
    officeAddress,
    officeHours,
    email,
    instagram,
    facebook,
    googleMapsEmbed
  }
`

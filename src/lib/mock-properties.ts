// src/lib/mock-properties.ts

export type Advisor = {
  name:        string
  role:        string
  initials:    string
  whatsappUrl: string
}

export type Property = {
  slug:         string
  title:        string
  operation:    'venta' | 'arriendo'
  propertyType: 'apartamento' | 'casa' | 'local' | 'lote' | 'finca'
  zone:         'duitama' | 'tibasosa' | 'paipa'
  price:        number
  area:         number
  bedrooms:     number
  bathrooms:    number
  parking:      boolean
  location:     string
  imageSrc?:    string
  // Ficha de detalle
  address:      string
  description:  string
  amenities:    string[]
  floor?:       number
  stratum?:     number
  propertyCode: string
  images:       string[]
  advisor:      Advisor
}

// ── Shared defaults ────────────────────────────────────────────
const DEFAULT_ADVISOR: Advisor = {
  name:        'María Pérez',
  role:        'Asesora comercial',
  initials:    'MP',
  whatsappUrl: 'https://wa.me/573112345678?text=Hola%2C+me+interesa+una+propiedad+de+Servicol',
}

const DEFAULT_AMENITIES = [
  'Cocina integral',
  'Zona de lavado',
  'Portería 24h',
  'Zona verde',
  'Parqueadero cubierto',
]

const IMG = (seed: string) => `https://picsum.photos/seed/${seed}/800/600`

const DEFAULT_IMAGES = [
  IMG('srv-default-a'),
  IMG('srv-default-b'),
  IMG('srv-default-c'),
  IMG('srv-default-d'),
]

const DEFAULT_DESC =
  'Excelente inmueble ubicado en uno de los sectores más apetecidos del corredor Duitama–Tibasosa–Paipa. ' +
  'Cuenta con acabados de calidad, buena iluminación natural y distribución funcional que aprovecha al máximo cada espacio.\n\n' +
  'El sector ofrece fácil acceso a vías principales, comercio, colegios y centros de salud. ' +
  'Ideal para familias o como inversión en una zona de alta valorización en Boyacá.'

// ── Mock properties ────────────────────────────────────────────
export const MOCK_PROPERTIES: Property[] = [
  // ── Apartamentos ─────────────────────────────────────────────
  {
    slug:         'apartamento-el-lago-duitama',
    title:        'Apartamento El Lago',
    operation:    'venta',
    propertyType: 'apartamento',
    zone:         'duitama',
    price:        320_000_000,
    area:         85,
    bedrooms:     3,
    bathrooms:    2,
    parking:      true,
    location:     'Duitama, Boyacá',
    address:      'Calle 14 N° 13-69, Sector El Lago, Duitama · Boyacá',
    propertyCode: 'SVC-AP-25-001',
    floor:        4,
    stratum:      4,
    description:
      'Hermoso apartamento ubicado en el exclusivo sector El Lago de Duitama, con vista privilegiada al parque y acabados de alta calidad. La distribución incluye sala-comedor amplio, cocina integral equipada y balcón privado desde donde se aprecia el entorno verde del sector.\n\n' +
      'Los tres dormitorios son luminosos y ventilados; el principal cuenta con baño en suite y walk-in closet. El segundo baño completo sirve a las habitaciones restantes. El parqueadero cubierto se entrega con la escritura.\n\n' +
      'El conjunto residencial ofrece zonas comunes de primer nivel: piscina, gimnasio, salón comunal y vigilancia las 24 horas. A cinco minutos del centro comercial Puerta del Sol y de los principales colegios de la ciudad.',
    amenities: [
      'Cocina integral',
      'Balcón privado',
      'Walk-in closet',
      'Piscina comunal',
      'Gimnasio',
      'Salón comunal',
      'Portería 24h',
      'Parqueadero cubierto',
    ],
    images: [
      IMG('lago-a'),
      IMG('lago-b'),
      IMG('lago-c'),
      IMG('lago-d'),
      IMG('lago-e'),
      IMG('lago-f'),
    ],
    advisor: {
      name:        'María Pérez',
      role:        'Asesora comercial',
      initials:    'MP',
      whatsappUrl: 'https://wa.me/573112345678?text=Hola%2C+me+interesa+la+propiedad+SVC-AP-25-001+%E2%80%94+Apartamento+El+Lago',
    },
  },
  {
    slug:         'apartamento-centro-duitama',
    title:        'Apartamento Centro Histórico',
    operation:    'arriendo',
    propertyType: 'apartamento',
    zone:         'duitama',
    price:        1_200_000,
    area:         60,
    bedrooms:     2,
    bathrooms:    1,
    parking:      false,
    location:     'Duitama, Boyacá',
    address:      'Carrera 16 N° 18-42, Centro Histórico, Duitama · Boyacá',
    propertyCode: 'SVC-AP-25-002',
    floor:        2,
    stratum:      3,
    description:
      'Acogedor apartamento en el corazón del centro histórico de Duitama. La ubicación es inmejorable: a una cuadra del parque principal, rodeado de comercio, restaurantes y rutas de transporte urbano.\n\n' +
      'El inmueble cuenta con sala, comedor, cocina independiente, dos habitaciones y baño completo. Pisos en cerámica, ventanas amplias y buena ventilación natural. Ideal para profesionales o parejas.\n\n' +
      'Canon mensual incluye administración del edificio. Contrato mínimo de 12 meses. Disponible de inmediato.',
    amenities: [
      'Cocina independiente',
      'Ascensor',
      'Portería',
      'Zona de lavado',
      'Citófono',
    ],
    images: [
      IMG('centro-a'),
      IMG('centro-b'),
      IMG('centro-c'),
      IMG('centro-d'),
    ],
    advisor: {
      name:        'Carlos Ruiz',
      role:        'Asesor de arrendamientos',
      initials:    'CR',
      whatsappUrl: 'https://wa.me/573112345678?text=Hola%2C+me+interesa+la+propiedad+SVC-AP-25-002+%E2%80%94+Apartamento+Centro+Hist%C3%B3rico',
    },
  },
  {
    slug:         'apartamento-moderno-tibasosa',
    title:        'Apartamento Moderno',
    operation:    'venta',
    propertyType: 'apartamento',
    zone:         'tibasosa',
    price:        195_000_000,
    area:         65,
    bedrooms:     2,
    bathrooms:    1,
    parking:      false,
    location:     'Tibasosa, Boyacá',
    address:      'Calle 11 N° 14-23, Urbanización Los Pinos, Tibasosa · Boyacá',
    propertyCode: 'SVC-AP-25-003',
    floor:        3,
    stratum:      3,
    description:
      'Moderno apartamento en Tibasosa con acabados contemporáneos y excelente relación precio-calidad. El inmueble es ideal para primera vivienda o inversión, con dos habitaciones bien proporcionadas y sala-comedor integrada a la cocina.\n\n' +
      'La urbanización cuenta con zonas verdes y portería. El sector tiene fácil acceso a la Troncal Central del Norte y a los principales centros comerciales de la ciudad del Sol.',
    amenities: [
      'Cocina integral',
      'Zona de lavado',
      'Portería',
      'Zona verde',
      'Citófono',
    ],
    images: [
      IMG('moderno-a'),
      IMG('moderno-b'),
      IMG('moderno-c'),
      IMG('moderno-d'),
    ],
    advisor: DEFAULT_ADVISOR,
  },
  {
    slug:         'apartamento-la-fuente-tibasosa',
    title:        'Apartamento La Fuente',
    operation:    'arriendo',
    propertyType: 'apartamento',
    zone:         'tibasosa',
    price:        1_500_000,
    area:         75,
    bedrooms:     3,
    bathrooms:    2,
    parking:      true,
    location:     'Tibasosa, Boyacá',
    address:      'Carrera 12 N° 9-55, Conjunto La Fuente, Tibasosa · Boyacá',
    propertyCode: 'SVC-AP-25-004',
    floor:        5,
    stratum:      4,
    description:  DEFAULT_DESC,
    amenities:    DEFAULT_AMENITIES,
    images:       DEFAULT_IMAGES,
    advisor:      DEFAULT_ADVISOR,
  },
  {
    slug:         'apartamento-lago-sochagota-paipa',
    title:        'Apartamento Lago Sochagota',
    operation:    'venta',
    propertyType: 'apartamento',
    zone:         'paipa',
    price:        280_000_000,
    area:         72,
    bedrooms:     2,
    bathrooms:    2,
    parking:      true,
    location:     'Paipa, Boyacá',
    address:      'Vía al Lago Sochagota Km 2, Paipa · Boyacá',
    propertyCode: 'SVC-AP-25-005',
    stratum:      4,
    description:  DEFAULT_DESC,
    amenities:    [...DEFAULT_AMENITIES, 'Vista al lago', 'Sendero ecológico'],
    images:       DEFAULT_IMAGES,
    advisor:      DEFAULT_ADVISOR,
  },
  // ── Casas ────────────────────────────────────────────────────
  {
    slug:         'casa-barrio-boyaca-duitama',
    title:        'Casa Barrio Boyacá',
    operation:    'arriendo',
    propertyType: 'casa',
    zone:         'duitama',
    price:        2_200_000,
    area:         120,
    bedrooms:     3,
    bathrooms:    2,
    parking:      true,
    location:     'Duitama, Boyacá',
    address:      'Calle 22 N° 8-14, Barrio Boyacá, Duitama · Boyacá',
    propertyCode: 'SVC-CS-25-001',
    description:  DEFAULT_DESC,
    amenities:    [...DEFAULT_AMENITIES, 'Patio trasero', 'Cuarto de servicio'],
    images:       DEFAULT_IMAGES,
    advisor:      DEFAULT_ADVISOR,
  },
  {
    slug:         'casa-campestre-paipa',
    title:        'Casa Campestre',
    operation:    'venta',
    propertyType: 'casa',
    zone:         'paipa',
    price:        580_000_000,
    area:         210,
    bedrooms:     4,
    bathrooms:    3,
    parking:      true,
    location:     'Paipa, Boyacá',
    address:      'Vereda El Palmar, Sector Termas, Paipa · Boyacá',
    propertyCode: 'SVC-CS-25-002',
    description:  DEFAULT_DESC,
    amenities:    ['Piscina privada', 'Jardín amplio', 'BBQ', 'Cuarto de servicio', 'Parqueadero doble', 'Cocina integral', 'Chimenea'],
    images:       DEFAULT_IMAGES,
    advisor:      DEFAULT_ADVISOR,
  },
  {
    slug:         'casa-urbanizacion-tibasosa',
    title:        'Casa Urbanización El Nogal',
    operation:    'venta',
    propertyType: 'casa',
    zone:         'tibasosa',
    price:        420_000_000,
    area:         150,
    bedrooms:     4,
    bathrooms:    3,
    parking:      true,
    location:     'Tibasosa, Boyacá',
    address:      'Manzana 5 Casa 12, Urbanización El Nogal, Tibasosa · Boyacá',
    propertyCode: 'SVC-CS-25-003',
    description:  DEFAULT_DESC,
    amenities:    DEFAULT_AMENITIES,
    images:       DEFAULT_IMAGES,
    advisor:      DEFAULT_ADVISOR,
  },
  // ── Locales ──────────────────────────────────────────────────
  {
    slug:         'local-comercial-centro-duitama',
    title:        'Local Comercial Centro',
    operation:    'arriendo',
    propertyType: 'local',
    zone:         'duitama',
    price:        1_800_000,
    area:         45,
    bedrooms:     0,
    bathrooms:    1,
    parking:      false,
    location:     'Duitama, Boyacá',
    address:      'Carrera 15 N° 17-30, Piso 1, Centro Comercial Plaza, Duitama · Boyacá',
    propertyCode: 'SVC-LC-25-001',
    description:  DEFAULT_DESC,
    amenities:    ['Vitrina doble frente', 'Baño privado', 'Depósito', 'Acceso vehicular'],
    images:       DEFAULT_IMAGES,
    advisor:      DEFAULT_ADVISOR,
  },
  {
    slug:         'local-avenida-tibasosa',
    title:        'Local Comercial Avenida',
    operation:    'venta',
    propertyType: 'local',
    zone:         'tibasosa',
    price:        250_000_000,
    area:         80,
    bedrooms:     0,
    bathrooms:    1,
    parking:      false,
    location:     'Tibasosa, Boyacá',
    address:      'Avenida Central N° 14-60, Local 101, Tibasosa · Boyacá',
    propertyCode: 'SVC-LC-25-002',
    description:  DEFAULT_DESC,
    amenities:    ['Vitrina esquinera', 'Baño privado', 'Mezzanine', 'Alta visibilidad'],
    images:       DEFAULT_IMAGES,
    advisor:      DEFAULT_ADVISOR,
  },
  // ── Lotes ────────────────────────────────────────────────────
  {
    slug:         'lote-campestre-paipa',
    title:        'Lote Campestre',
    operation:    'venta',
    propertyType: 'lote',
    zone:         'paipa',
    price:        150_000_000,
    area:         1200,
    bedrooms:     0,
    bathrooms:    0,
    parking:      false,
    location:     'Paipa, Boyacá',
    address:      'Vereda Palermo, Kilómetro 3 vía Paipa–Duitama · Boyacá',
    propertyCode: 'SVC-LT-25-001',
    description:  DEFAULT_DESC,
    amenities:    ['Escritura disponible', 'Servicios públicos', 'Vía de acceso pavimentada'],
    images:       DEFAULT_IMAGES,
    advisor:      DEFAULT_ADVISOR,
  },
  {
    slug:         'lote-urbanizable-duitama',
    title:        'Lote Urbanizable',
    operation:    'venta',
    propertyType: 'lote',
    zone:         'duitama',
    price:        95_000_000,
    area:         350,
    bedrooms:     0,
    bathrooms:    0,
    parking:      false,
    location:     'Duitama, Boyacá',
    address:      'Sector La Alborada, Manzana 12, Duitama · Boyacá',
    propertyCode: 'SVC-LT-25-002',
    description:  DEFAULT_DESC,
    amenities:    ['Plano de loteo', 'Servicios públicos', 'Zona residencial consolidada'],
    images:       DEFAULT_IMAGES,
    advisor:      DEFAULT_ADVISOR,
  },
  {
    slug:         'lote-rural-tibasosa',
    title:        'Lote Rural con Vista',
    operation:    'venta',
    propertyType: 'lote',
    zone:         'tibasosa',
    price:        120_000_000,
    area:         800,
    bedrooms:     0,
    bathrooms:    0,
    parking:      false,
    location:     'Tibasosa, Boyacá',
    address:      'Vereda Morca, Sector Alto de la Cruz, Tibasosa · Boyacá',
    propertyCode: 'SVC-LT-25-003',
    description:  DEFAULT_DESC,
    amenities:    ['Vista panorámica', 'Agua de nacimiento', 'Acceso carreteable'],
    images:       DEFAULT_IMAGES,
    advisor:      DEFAULT_ADVISOR,
  },
  // ── Fincas ───────────────────────────────────────────────────
  {
    slug:         'finca-de-recreo-paipa',
    title:        'Finca de Recreo',
    operation:    'arriendo',
    propertyType: 'finca',
    zone:         'paipa',
    price:        3_500_000,
    area:         3000,
    bedrooms:     4,
    bathrooms:    2,
    parking:      true,
    location:     'Paipa, Boyacá',
    address:      'Vereda Casablanca, Finca Villa Elena, Paipa · Boyacá',
    propertyCode: 'SVC-FI-25-001',
    description:  DEFAULT_DESC,
    amenities:    ['Piscina', 'Cancha de fútbol', 'BBQ', 'Cocina comunal', 'Parqueadero para 6 vehículos', 'Zona de camping'],
    images:       DEFAULT_IMAGES,
    advisor:      DEFAULT_ADVISOR,
  },
  {
    slug:         'finca-productiva-duitama',
    title:        'Finca Productiva',
    operation:    'venta',
    propertyType: 'finca',
    zone:         'duitama',
    price:        750_000_000,
    area:         15_000,
    bedrooms:     3,
    bathrooms:    2,
    parking:      true,
    location:     'Duitama, Boyacá',
    address:      'Vereda San Lorenzo, Kilómetro 8 vía Duitama–Charalá · Boyacá',
    propertyCode: 'SVC-FI-25-002',
    description:  DEFAULT_DESC,
    amenities:    ['Casa principal', 'Galpones', 'Pozo de agua', 'Electricidad trifásica', 'Vía de acceso'],
    images:       DEFAULT_IMAGES,
    advisor:      DEFAULT_ADVISOR,
  },
  {
    slug:         'finca-descanso-tibasosa',
    title:        'Finca de Descanso',
    operation:    'arriendo',
    propertyType: 'finca',
    zone:         'tibasosa',
    price:        2_800_000,
    area:         2500,
    bedrooms:     3,
    bathrooms:    2,
    parking:      true,
    location:     'Tibasosa, Boyacá',
    address:      'Vereda Monquirá, Sector Los Cedros, Tibasosa · Boyacá',
    propertyCode: 'SVC-FI-25-003',
    description:  DEFAULT_DESC,
    amenities:    ['Piscina', 'Jardín', 'BBQ', 'Cocina equipada', 'Parqueadero'],
    images:       DEFAULT_IMAGES,
    advisor:      DEFAULT_ADVISOR,
  },
]

import {
  Search, BedDouble, Bath, Car, MapPin, Phone,
  Menu, X, ArrowRight, Share2, CheckCircle2,
  SlidersHorizontal, LayoutPanelLeft, Mail,
  Clock, Home,
} from 'lucide-react'

export type IconType =
  | 'Search' | 'Bed' | 'Bath' | 'Car' | 'Pin' | 'Phone'
  | 'WhatsApp' | 'Menu' | 'Close' | 'Arrow' | 'Share'
  | 'Check' | 'Filter' | 'Panel' | 'Mail' | 'Clock'
  | 'Instagram' | 'Rural' | 'Apt' | 'Business' | 'Home'
  | 'Area'

type IconProps = {
  type: IconType
  size?: number
  className?: string
  'aria-hidden'?: boolean
}

// Iconos de negocio sin equivalente en lucide — SVG inline
function WhatsAppIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.855L.057 23.077a.75.75 0 0 0 .92.92l5.222-1.475A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.64-.495-5.163-1.362l-.37-.217-3.827 1.082 1.082-3.827-.217-.37A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
    </svg>
  )
}

function AreaIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h4M4 4v4M20 4h-4M20 4v4M4 20h4M4 20v-4M20 20h-4M20 20v-4M9 9h6v6H9z" />
    </svg>
  )
}

function RuralIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M5 21V10l7-7 7 7v11M9 21v-5h6v5" />
      <circle cx="12" cy="9" r="1" fill="currentColor" />
    </svg>
  )
}

function AptIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path strokeLinecap="round" d="M3 9h18M3 15h18M9 3v18M15 3v18" />
    </svg>
  )
}

function InstagramIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function BusinessIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
      <rect x="2" y="7" width="20" height="15" rx="1" />
      <path strokeLinecap="round" d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="12.01" strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}

const ICON_MAP: Record<IconType, (size: number) => React.ReactNode> = {
  Search:    (s) => <Search size={s} />,
  Bed:       (s) => <BedDouble size={s} />,
  Bath:      (s) => <Bath size={s} />,
  Car:       (s) => <Car size={s} />,
  Pin:       (s) => <MapPin size={s} />,
  Phone:     (s) => <Phone size={s} />,
  WhatsApp:  (s) => <WhatsAppIcon size={s} />,
  Menu:      (s) => <Menu size={s} />,
  Close:     (s) => <X size={s} />,
  Arrow:     (s) => <ArrowRight size={s} />,
  Share:     (s) => <Share2 size={s} />,
  Check:     (s) => <CheckCircle2 size={s} />,
  Filter:    (s) => <SlidersHorizontal size={s} />,
  Panel:     (s) => <LayoutPanelLeft size={s} />,
  Mail:      (s) => <Mail size={s} />,
  Clock:     (s) => <Clock size={s} />,
  Instagram: (s) => <InstagramIcon size={s} />,
  Area:      (s) => <AreaIcon size={s} />,
  Rural:     (s) => <RuralIcon size={s} />,
  Apt:       (s) => <AptIcon size={s} />,
  Business:  (s) => <BusinessIcon size={s} />,
  Home:      (s) => <Home size={s} />,
}

export default function Icon({
  type,
  size = 24,
  className,
  'aria-hidden': ariaHidden = true,
}: IconProps) {
  return (
    <span
      className={['inline-flex items-center justify-center shrink-0', className].filter(Boolean).join(' ')}
      aria-hidden={ariaHidden}
      style={{ width: size, height: size }}
    >
      {ICON_MAP[type]?.(size)}
    </span>
  )
}

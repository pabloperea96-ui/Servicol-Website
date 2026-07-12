// Shared COP price and date formatting for cards, price bars and project info.

export function formatCOP(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style:                 'currency',
    currency:              'COP',
    maximumFractionDigits: 0,
  }).format(value)
}

const MONTHS_ES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

// "2026-12-01" → "Diciembre 2026". Parses the date parts directly to avoid
// UTC off-by-one shifts with date-only strings.
export function formatMonthYear(isoDate: string): string {
  const [year, month] = isoDate.split('-').map(Number)
  if (!year || !month || month < 1 || month > 12) return isoDate
  return `${MONTHS_ES[month - 1]} ${year}`
}

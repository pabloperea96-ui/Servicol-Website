// src/components/molecules/TestimonialCard.tsx
import Rating from '@/components/atoms/Rating'
import Divider from '@/components/atoms/Divider'

type TestimonialCardProps = {
  quote:     string
  name:      string
  role?:     string
  rating?:   number
  className?: string
}

export default function TestimonialCard({
  quote, name, role, rating = 5, className,
}: TestimonialCardProps) {
  return (
    <article
      className={[
        'flex flex-col gap-4 rounded-md border border-border-default bg-bg-surface p-6 w-[280px] h-full',
        className,
      ].filter(Boolean).join(' ')}
    >
      <Rating value={rating} />
      <div className="flex flex-col gap-4 flex-1">
        <p className="font-body text-body-md font-light italic leading-6 text-text-secondary min-h-[120px] overflow-hidden">
          {quote}
        </p>
        <Divider />
        <div className="flex flex-col gap-1">
          <p className="font-body text-body-md font-medium text-text-primary">{name}</p>
          {role && <p className="font-body text-[12px] font-medium text-text-muted">{role}</p>}
        </div>
      </div>
    </article>
  )
}

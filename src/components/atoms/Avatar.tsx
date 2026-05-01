type AvatarProps = {
  src?: string
  initials?: string
  size?: 'sm' | 'md'
  alt?: string
  className?: string
}

const sizeConfig = {
  sm: { container: 'size-8', text: 'text-label font-display font-medium' },
  md: { container: 'size-12', text: 'text-body-md font-body font-medium' },
}

export default function Avatar({ src, initials, size = 'md', alt = '', className }: AvatarProps) {
  const { container, text } = sizeConfig[size]

  return (
    <div
      className={[
        'relative rounded-full overflow-hidden shrink-0 bg-bg-subtle flex items-center justify-center',
        container,
        className,
      ].filter(Boolean).join(' ')}
    >
      {src ? (
        <img src={src} alt={alt} className="absolute inset-0 size-full object-cover" />
      ) : (
        <span className={['text-text-primary uppercase select-none', text].join(' ')}>
          {initials?.slice(0, 2) ?? '?'}
        </span>
      )}
    </div>
  )
}

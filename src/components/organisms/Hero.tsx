// src/components/organisms/Hero.tsx
import SearchBar    from '@/components/molecules/SearchBar'
import HeroHeadline from '@/components/atoms/HeroHeadline'

type HeroProps = {
  subtitle?:    string
  imageSrc?:    string
  variant?:     'light' | 'dark'
  searchProps?: React.ComponentProps<typeof SearchBar>
}

export default function Hero({
  subtitle,
  imageSrc,
  variant,
  searchProps,
}: HeroProps) {
  const isDark = variant === 'dark' || !!imageSrc

  return (
    <section className="relative flex min-h-[560px] md:min-h-[700px] items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {imageSrc ? (
          <div
            aria-hidden
            className="hero-bg absolute inset-0"
            style={{ backgroundImage: `url('${imageSrc}')` }}
          />
        ) : (
          <div className={`size-full ${isDark ? 'bg-bg-subtle' : 'hero-pattern'}`} />
        )}
        {imageSrc && (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.55)' }}
          />
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center gap-10 px-4 text-center md:gap-16 md:px-20 lg:px-40">
        <div className="w-full flex flex-col gap-6 md:max-w-[760px]">
          <HeroHeadline isDark={isDark} />
          {subtitle && (
            <p
              className={[
                'font-body text-body-lg font-light leading-relaxed',
                isDark ? 'text-text-inverse/90' : 'text-text-secondary',
              ].join(' ')}
            >
              {subtitle}
            </p>
          )}
        </div>
        <div className="w-full max-w-[720px]">
          <SearchBar {...searchProps} />
        </div>
      </div>
    </section>
  )
}

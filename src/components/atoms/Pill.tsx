// src/components/atoms/Pill.tsx

type PillProps = {
    label: string;
    active?: boolean;
    onClick?: () => void;
    className?: string;
  };
  
  export default function Pill({ label, active = false, onClick, className }: PillProps) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={[
          'inline-flex items-center justify-center px-[14px] py-[6px]',
          'rounded-pill font-body text-label font-regular leading-[11px] whitespace-nowrap',
          'border transition-colors duration-base ease-out',
          'cursor-pointer touch-target',
          active
            ? 'bg-action-cta border-action-cta text-text-inverse'
            : 'bg-transparent border-plata text-text-secondary hover:bg-bg-subtle hover:border-gris hover:text-text-primary',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action-primary',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {label}
      </button>
    );
  }
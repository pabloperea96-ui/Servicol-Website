// ─── Tipos ────────────────────────────────────────────────────────────────────

type BadgeType = 'venta' | 'arriendo' | 'nuevo' | 'comercial';

interface BadgeProps {
  type: BadgeType;
  className?: string;
}

// ─── Tokens de estilo ─────────────────────────────────────────────────────────

const styles: Record<BadgeType, { container: string; text: string; label: string }> = {
  venta:     { container: 'bg-action-cta-light',                        text: 'text-action-cta',       label: 'VENTA'     },
  arriendo:  { container: 'bg-action-primary',                          text: 'text-text-inverse',     label: 'ARRIENDO'  },
  nuevo:     { container: 'border-[0.5px] border-border-default',       text: 'text-action-primary',   label: 'NUEVO'     },
  comercial: { container: 'border-[0.5px] border-border-default',       text: 'text-text-secondary',   label: 'COMERCIAL' },
};

// ─── Componente ───────────────────────────────────────────────────────────────

function Badge({ type, className }: BadgeProps) {
  const { container, text, label } = styles[type];

  return (
    <span
      className={[
        'inline-flex items-center justify-center overflow-hidden px-[10px] py-[4px] rounded-sm',
        container,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className={`text-badge ${text}`}>
        {label}
      </span>
    </span>
  );
}

export { Badge }
export default Badge
export type { BadgeProps, BadgeType }
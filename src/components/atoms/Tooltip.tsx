'use client'

import { useState, useId } from 'react'

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

type TooltipProps = {
  content: string
  position?: TooltipPosition
  children: React.ReactNode
  className?: string
}

const positionClasses: Record<TooltipPosition, string> = {
  top:    'bottom-full left-1/2 -translate-x-1/2 mb-1.5',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-1.5',
  left:   'right-full top-1/2 -translate-y-1/2 mr-1.5',
  right:  'left-full top-1/2 -translate-y-1/2 ml-1.5',
}

export default function Tooltip({ content, position = 'top', children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false)
  const id = useId()

  return (
    <span
      className={['relative inline-flex', className].filter(Boolean).join(' ')}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <span aria-describedby={visible ? id : undefined}>
        {children}
      </span>
      {visible && (
        <span
          id={id}
          role="tooltip"
          className={[
            'absolute z-50 whitespace-nowrap rounded-sm bg-text-primary px-2 py-1',
            'font-body text-label text-text-inverse pointer-events-none',
            positionClasses[position],
          ].join(' ')}
        >
          {content}
        </span>
      )}
    </span>
  )
}

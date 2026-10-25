import type { SimpleIcon } from 'simple-icons'

interface BrandIconProps {
  icon: SimpleIcon
  size?: number
  className?: string
}

/** Renders a simple-icons brand mark in the current text color. */
export function BrandIcon({ icon, size = 14, className }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden
      focusable="false"
      className={className}
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  )
}

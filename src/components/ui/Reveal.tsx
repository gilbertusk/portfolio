import { m } from 'motion/react'
import type { ReactNode } from 'react'
import { EASE_OUT } from '../../lib/motion'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  /** Render as a list item when the reveal sits directly inside a list. */
  as?: 'div' | 'li'
}

/** Fades content up once as it scrolls into view. */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const Element = as === 'li' ? m.li : m.div
  return (
    <Element
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
    >
      {children}
    </Element>
  )
}

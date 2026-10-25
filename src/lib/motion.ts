import type { Transition, Variants } from 'motion/react'

export const EASE_OUT: Transition['ease'] = [0.16, 1, 0.3, 1]

/** Parent of a staggered entrance; pair with `fadeUpItem` on the children. */
export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
}

import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface SectionProps {
  id: string
  labelledBy: string
  className?: string
  children: ReactNode
}

export function Section({ id, labelledBy, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('py-20 md:py-28', className)}>
      <div className="mx-auto max-w-6xl px-5 md:px-8">{children}</div>
    </section>
  )
}

interface SectionHeadingProps {
  id: string
  title: string
  intro?: string
}

export function SectionHeading({ id, title, intro }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <h2 id={id} className="text-4xl font-medium tracking-[-0.07em] text-balance md:text-5xl md:leading-[1.02]">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  )
}

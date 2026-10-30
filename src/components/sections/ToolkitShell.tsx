import { WrenchIcon } from '@phosphor-icons/react'
import type { ReactNode } from 'react'
import { SectionTitle } from '../ui/SectionTitle'

interface ToolkitShellProps {
  children: ReactNode
  blurb?: string
}

/**
 * Same id and heading for the lazy toolkit and its placeholders, so anchors work while it loads.
 * Kept free of stack.ts imports: those pull the brand logos into the main bundle.
 */
export function ToolkitShell({ children, blurb = 'From the model to the tests around it.' }: ToolkitShellProps) {
  return (
    <section id="toolkit" aria-labelledby="toolkit-heading" className="px-3 pt-16 md:px-8 md:pt-20">
      <div className="mx-auto flex max-w-[71rem] flex-col gap-7">
        <SectionTitle id="toolkit-heading" before="Tools I" after="reach for" icon={WrenchIcon} tone="coral" blurb={blurb} />
        {children}
      </div>
    </section>
  )
}

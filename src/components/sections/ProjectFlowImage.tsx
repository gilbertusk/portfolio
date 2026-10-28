import type { ProjectFlow } from '../../data/types'
import { cn } from '../../lib/cn'

interface ProjectFlowImageProps {
  title: string
  flow: ProjectFlow
  className?: string
}

/** A small model diagram that supports the card instead of competing with its title. */
export function ProjectFlowImage({ title, flow, className }: ProjectFlowImageProps) {
  return (
    <figure
      aria-label={`${title} flow: ${flow.description}`}
      className={cn('project-flow relative grid grid-cols-[minmax(0,1fr)_0.75rem_minmax(0,1fr)_0.75rem_minmax(0,1fr)] items-center gap-1 overflow-hidden border border-line px-3', className)}
    >
      <span className="relative z-10 grid min-w-0 h-7 place-items-center border border-line bg-surface px-1 text-center font-mono text-[0.65rem] leading-none text-ink">
        {flow.input}
      </span>
      <span aria-hidden className="relative z-10 text-center text-xs text-subtle">→</span>
      <span className="relative z-10 grid min-w-0 h-8 place-items-center bg-ink px-1 text-center font-mono text-[0.65rem] leading-none text-surface">
        {flow.model}
      </span>
      <span aria-hidden className="relative z-10 text-center text-xs text-subtle">→</span>
      <span className="relative z-10 grid min-w-0 h-7 place-items-center border border-line bg-surface px-1 text-center font-mono text-[0.65rem] leading-none text-ink">
        {flow.output}
      </span>
    </figure>
  )
}

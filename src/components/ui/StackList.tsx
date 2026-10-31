import { cn } from '../../lib/cn'

interface StackListProps {
  title: string
  stack: string[]
  className?: string
}

/** Small mono chips naming the tools a project was built with. */
export function StackList({ title, stack, className }: StackListProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <p className="font-mono text-[0.68rem] font-bold tracking-[0.06em] text-muted uppercase">Tech stack</p>
      <ul aria-label={`${title} tech stack`} className="flex flex-wrap gap-1.5">
        {stack.map((tool) => (
          <li key={tool} className="rounded-md border border-line bg-bg px-2 py-0.5 font-mono text-[0.7rem] font-semibold">
            {tool}
          </li>
        ))}
      </ul>
    </div>
  )
}

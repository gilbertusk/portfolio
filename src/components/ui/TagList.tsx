import { cn } from '../../lib/cn'

interface TagListProps {
  tags: string[]
  label: string
  className?: string
}

export function TagList({ tags, label, className }: TagListProps) {
  return (
    <ul aria-label={label} className={cn('flex flex-wrap gap-1.5', className)}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="border border-line px-2.5 py-0.5 font-mono text-[0.75rem] leading-5 text-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}

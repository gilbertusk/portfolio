import type { ProjectLink } from '../../data/types'
import { cn } from '../../lib/cn'
import { LINK_META } from './linkMeta'

interface ProjectLinksProps {
  title: string
  links: ProjectLink[]
  className?: string
}

export function ProjectLinks({ title, links, className }: ProjectLinksProps) {
  if (links.length === 0) return null

  return (
    <ul className={cn('flex flex-wrap items-center gap-x-5 gap-y-2', className)}>
      {links.map(({ kind, href }) => {
        const { label, icon: LinkIcon } = LINK_META[kind]
        return (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title}: ${label} (opens in a new tab)`}
              className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-line decoration-1 underline-offset-4 transition-colors hover:decoration-accent"
            >
              {label}
              <LinkIcon
                aria-hidden
                size={15}
                className="text-muted transition-transform group-hover/link:-translate-y-px group-hover/link:translate-x-px"
              />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

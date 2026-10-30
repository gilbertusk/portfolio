import { ArrowUpRightIcon } from '@phosphor-icons/react'
import type { FeaturedEntry } from '../../data/showcase'
import type { Project } from '../../data/types'
import { LINK_META } from '../ui/linkMeta'
import { BrowserPreview } from './BrowserPreview'

interface ProjectCardProps {
  project: Project
  entry: FeaturedEntry
}

export function ProjectCard({ project, entry }: ProjectCardProps) {
  const meta = `${project.category} · ${project.status ?? project.year}`

  return (
    <article className="group bento-card lift flex h-full flex-col p-3">
      <BrowserPreview tone={entry.tone} address={entry.address} image={project.image} />
      <div className="flex flex-1 flex-col gap-4 px-4 pt-5 pb-2">
        <div className="flex flex-col gap-2.5">
          <p className="text-[0.8rem] font-medium text-muted">{meta}</p>
          <h3 className="text-2xl font-semibold tracking-[-0.02em]">{project.title}</h3>
          <p className="text-pretty text-muted md:line-clamp-2">{entry.blurb}</p>
          <ul aria-label={`${project.title} highlights`} className="flex flex-wrap gap-1.5 pt-1">
            {entry.pills.map((pill) => (
              <li key={pill} className="rounded-md border border-blue/30 bg-blue-soft px-2 py-1 font-mono text-[0.72rem] font-semibold text-blue">
                {pill}
              </li>
            ))}
          </ul>
        </div>
        <ul className="mt-auto flex flex-wrap gap-5 border-t border-line pt-4">
          {project.links.map(({ kind, href }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title}: ${LINK_META[kind].label} (opens in a new tab)`}
                className="inline-flex items-center gap-1 text-[0.95rem] font-semibold transition-opacity hover:opacity-60"
              >
                {LINK_META[kind].label}
                <ArrowUpRightIcon aria-hidden weight="bold" size={16} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

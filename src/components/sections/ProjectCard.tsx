import { ArrowUpRightIcon } from '@phosphor-icons/react'
import type { FeaturedEntry } from '../../data/showcase'
import type { Project } from '../../data/types'
import { LINK_META } from '../ui/linkMeta'
import { StackList } from '../ui/StackList'
import { BrowserPreview } from './BrowserPreview'

interface ProjectCardProps {
  project: Project
  entry: FeaturedEntry
}

export function ProjectCard({ project, entry }: ProjectCardProps) {
  const meta = `${project.category} · ${project.status ?? project.year}`

  return (
    <article className="group bento-card lift flex h-full flex-col p-2.5">
      <BrowserPreview tone={entry.tone} address={entry.address} image={project.image} />
      <div className="flex flex-1 flex-col gap-3.5 px-2.5 pt-4 pb-2">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[0.66rem] font-semibold tracking-[0.04em] text-muted uppercase">{meta}</p>
          <h3 className="text-xl font-semibold tracking-[-0.02em]">{project.title}</h3>
          <p className="text-[0.86rem] leading-5.5 text-pretty text-muted">{project.summary}</p>
        </div>

        {project.metrics && (
          <div className="flex flex-col gap-1.5">
            <p className="font-mono text-[0.64rem] font-bold tracking-[0.06em] text-muted uppercase">Measured results</p>
            <ul aria-label={`${project.title} measured results`} className="grid grid-cols-2 gap-1.5">
              {project.metrics.map((metric) => (
                <li key={`${metric.value}-${metric.label}`} className="flex min-w-0 flex-col rounded-lg border border-blue/20 bg-blue-soft px-2.5 py-2">
                  <strong className="font-mono text-[0.78rem] text-blue">{metric.value}</strong>
                  <span className="text-[0.65rem] leading-4 text-muted">{metric.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.flow && (
          <div className="flex flex-col gap-2 rounded-lg border border-line bg-bg p-2.5">
            <p className="font-mono text-[0.64rem] font-bold tracking-[0.06em] text-muted uppercase">How it works</p>
            <ol aria-label={`${project.title} delivery flow`} className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1">
              {[
                ['Input', project.flow.input],
                ['Core', project.flow.model],
                ['Output', project.flow.output],
              ].map(([label, value], index) => (
                <li key={label} className="contents">
                  <span className="flex min-w-0 flex-col">
                    <span className="font-mono text-[0.55rem] font-bold tracking-[0.05em] text-muted uppercase">{label}</span>
                    <span className="truncate text-[0.68rem] font-semibold" title={value}>{value}</span>
                  </span>
                  {index < 2 && <span aria-hidden className="text-[0.7rem] font-bold text-blue">→</span>}
                </li>
              ))}
            </ol>
            <p className="text-[0.68rem] leading-4 text-muted">{project.flow.description}</p>
          </div>
        )}

        <StackList title={project.title} stack={project.stack} />
        <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-3">
          {project.links.map(({ kind, href }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title}: ${LINK_META[kind].label} (opens in a new tab)`}
                className="inline-flex items-center gap-1 text-sm font-semibold transition-opacity hover:opacity-60"
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

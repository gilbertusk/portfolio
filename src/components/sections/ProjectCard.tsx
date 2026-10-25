import { ArrowUpRightIcon, BookOpenIcon, GithubLogoIcon, LockSimpleIcon } from '@phosphor-icons/react'
import type { Project, ProjectFlow, ProjectLink } from '../../data/types'
import { cn } from '../../lib/cn'
import { LINK_META } from '../ui/linkMeta'
import { ProjectFlowImage } from './ProjectFlowImage'

const VISIBLE_STACK_COUNT = 3
const VISIBLE_METRIC_COUNT = 2

function isLiveLink({ kind }: ProjectLink) {
  return kind === 'demo' || kind === 'site'
}

/** The live link leads when there is one; otherwise the first link (source, docs) does. */
function splitLinks(links: ProjectLink[]) {
  const primary = links.find(isLiveLink) ?? links[0]
  return { primary, secondary: links.filter((link) => link !== primary) }
}

function getStatusLabel(project: Project) {
  if (project.status) return project.status
  if (project.links.some(isLiveLink)) return 'Live'
  return project.isPrivate ? 'Private' : undefined
}

function StatusChip({ label }: { label: string }) {
  return (
    <span className="absolute top-5 right-5 z-10 inline-flex items-center gap-1.5 border border-ink bg-surface px-2 py-1 font-mono text-[0.6rem] leading-none tracking-wide text-ink uppercase shadow-[2px_2px_0_var(--ink)]">
      {label === 'Live' && <span aria-hidden className="project-live-dot" />}
      {label === 'Private' && <LockSimpleIcon aria-hidden size={10} />}
      {label}
    </span>
  )
}

/** Stands in for a screenshot: a terminal session that "opens" the project. */
function TerminalVisual({ project }: { project: Project }) {
  const status = getStatusLabel(project) ?? 'Public'

  return (
    <div aria-hidden className="project-terminal flex h-full flex-col font-mono text-[0.62rem] leading-relaxed">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
        <span className="size-1.5 bg-white/30" />
        <span className="size-1.5 bg-white/30" />
        <span className="size-1.5 bg-white/30" />
        <span className="ml-2 truncate text-white/45">~/{project.id}</span>
      </div>
      <div className="flex-1 px-3 py-2.5 text-white/60">
        <p>
          <span className="text-white/35">$</span> <span className="text-white">open {project.id}</span>
        </p>
        <p><span className="text-white/35">›</span> type&nbsp;&nbsp;&nbsp;{project.category}</p>
        <p><span className="text-white/35">›</span> stack&nbsp;&nbsp;{project.stack.length} tools</p>
        <p>
          <span className="text-white/35">›</span> state&nbsp;&nbsp;<span className="text-white">{status.toLowerCase()}</span>
          <span className="project-terminal-cursor" />
        </p>
      </div>
    </div>
  )
}

function ProjectVisual({ project }: { project: Project }) {
  const statusLabel = getStatusLabel(project)
  let media

  if (project.image) {
    media = (
      <img
        src={project.image.src}
        alt={project.image.alt}
        width={project.image.width}
        height={project.image.height}
        loading="lazy"
        decoding="async"
        className="project-card-image h-full w-full object-cover object-top"
      />
    )
  } else if (project.flow) {
    media = (
      <div className="project-flow grid h-full place-items-center px-5">
        <ProjectFlowImage title={project.title} flow={project.flow} className="h-14 w-full bg-surface" />
      </div>
    )
  } else {
    media = <TerminalVisual project={project} />
  }

  return (
    <div className="project-visual-mat relative aspect-[16/11] border-b border-line">
      <div className="project-visual-frame absolute inset-3 overflow-hidden border border-ink bg-surface-2">
        {media}
      </div>
      {statusLabel && <StatusChip label={statusLabel} />}
    </div>
  )
}

function PipelineLine({ flow }: { flow: ProjectFlow }) {
  const steps = [flow.input, flow.model, flow.output]

  return (
    <p aria-label={`Pipeline: ${flow.description}`} className="mt-4 flex items-center gap-1.5 font-mono text-[0.6rem] uppercase">
      {steps.map((step, index) => (
        <span key={step} className="inline-flex items-center gap-1.5">
          {index > 0 && <span aria-hidden className="text-subtle">→</span>}
          <span className={index === 1 ? 'bg-ink px-1.5 py-1 leading-none text-surface' : 'border border-line px-1.5 py-1 leading-none text-ink'}>
            {step}
          </span>
        </span>
      ))}
    </p>
  )
}

function MetricStrip({ project }: { project: Project }) {
  const metrics = project.metrics?.slice(0, VISIBLE_METRIC_COUNT) ?? []
  if (metrics.length === 0) return null

  return (
    <dl className="mt-4 grid grid-cols-2 divide-x divide-line border-y border-line">
      {metrics.map(({ value, label }) => (
        <div key={label} className="flex flex-col-reverse gap-1 py-2.5 pr-3 not-first:pl-3">
          <dt className="text-[0.65rem] leading-snug text-subtle">{label}</dt>
          <dd className="text-xl leading-none font-medium tracking-[-0.04em]">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

function StackLine({ project }: { project: Project }) {
  const visibleStack = project.stack.slice(0, VISIBLE_STACK_COUNT)
  const hiddenStackCount = project.stack.length - visibleStack.length

  return (
    <ul
      aria-label={`${project.title} tech stack`}
      className="mt-4 mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.65rem] text-subtle"
    >
      {visibleStack.map((technology, index) => (
        <li key={technology} className="inline-flex items-center gap-2">
          {index > 0 && <span aria-hidden className="text-line">/</span>}
          {technology}
        </li>
      ))}
      {hiddenStackCount > 0 && (
        <li className="ml-0.5 bg-surface-2 px-1.5 py-0.5 leading-none">+{hiddenStackCount}</li>
      )}
    </ul>
  )
}

function ProjectFooter({ project }: { project: Project }) {
  const { primary, secondary } = splitLinks(project.links)

  return (
    <div className="mt-auto flex items-center justify-between gap-3 border-t border-dashed border-line pt-4">
      {primary ? (
        <a
          href={primary.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title}: ${LINK_META[primary.kind].label} (opens in a new tab)`}
          className={
            isLiveLink(primary)
              ? 'group/primary inline-flex items-center gap-2 bg-ink px-3.5 py-2 text-xs font-medium text-surface transition-colors hover:bg-ink/85'
              : 'group/primary inline-flex items-center gap-2 border border-ink px-3.5 py-2 text-xs font-medium text-ink transition-colors hover:bg-tint'
          }
        >
          {LINK_META[primary.kind].label}
          <ArrowUpRightIcon
            aria-hidden
            size={13}
            className="transition-transform group-hover/primary:-translate-y-px group-hover/primary:translate-x-px"
          />
        </a>
      ) : (
        <span className="inline-flex items-center gap-1.5 font-mono text-[0.6rem] tracking-wide text-subtle uppercase">
          {project.isPrivate && <LockSimpleIcon aria-hidden size={12} />}
          {project.isPrivate ? 'Private repo' : 'No public link'}
        </span>
      )}

      {secondary.length > 0 && (
        <div className="flex items-center gap-2">
          {secondary.map(({ kind, href }) => {
            const LinkIcon = kind === 'source' ? GithubLogoIcon : BookOpenIcon
            const { label } = LINK_META[kind]

            return (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title}: ${label} (opens in a new tab)`}
                title={label}
                className="grid size-9 place-items-center border border-line text-ink transition-colors hover:border-ink hover:bg-tint"
              >
                <LinkIcon aria-hidden size={16} />
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function ProjectCard({ project, number }: { project: Project; number: number }) {
  return (
    <li className="project-card group/card flex w-[min(84vw,19rem)] flex-none snap-start flex-col overflow-hidden">
      <ProjectVisual project={project} />
      <div className="relative flex flex-1 flex-col p-5">
        <span aria-hidden className="project-card-number absolute top-3 right-4">
          {String(number).padStart(2, '0')}
        </span>
        <p className="font-mono text-[0.6rem] tracking-widest text-subtle uppercase">
          {project.category} <span aria-hidden>·</span> {project.year}
        </p>
        <h3 className="mt-2 pr-14 text-[1.4rem] leading-tight font-medium tracking-[-0.045em]">{project.title}</h3>
        <p className={cn('mt-2 text-sm leading-relaxed text-muted', project.metrics ? 'line-clamp-3' : 'line-clamp-4')}>
          {project.teaser ?? project.summary}
        </p>
        <MetricStrip project={project} />
        {project.image && project.flow && <PipelineLine flow={project.flow} />}
        <StackLine project={project} />
        <ProjectFooter project={project} />
      </div>
    </li>
  )
}

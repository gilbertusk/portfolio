import { ArrowUpRightIcon, BookOpenIcon, GithubLogoIcon, LockSimpleIcon } from '@phosphor-icons/react'
import type { Project, ProjectFlow, ProjectLink } from '../../data/types'
import { LINK_META } from '../ui/linkMeta'
import { ProjectFlowImage } from './ProjectFlowImage'

const VISIBLE_STACK_COUNT = 3

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

/** What the preview's address bar shows: the live host, else the repo or docs path. */
function getPreviewAddress(project: Project) {
  const link = project.links.find(isLiveLink) ?? project.links[0]
  if (!link) return `~/${project.id}`

  const { host, pathname } = new URL(link.href)
  return `${host}${pathname}`.replace(/\/$/, '')
}

function BrowserBar({ address }: { address: string }) {
  return (
    <div aria-hidden className="flex h-7 flex-none items-center border-b border-line bg-surface px-2.5">
      <span className="min-w-0 truncate font-mono text-[0.55rem] leading-none text-subtle">
        {address}
      </span>
    </div>
  )
}

function MetricBadge({ project }: { project: Project }) {
  const metric = project.metrics?.[0]
  if (!metric) return null

  return (
    <p className="absolute bottom-5 left-5 z-10 flex max-w-[70%] items-baseline gap-2 border border-ink bg-surface px-2.5 py-1.5 text-ink">
      <span className="text-lg leading-none font-medium tracking-[-0.04em]">{metric.value}</span>
      <span className="truncate font-mono text-[0.55rem] leading-none text-muted uppercase">{metric.label}</span>
    </p>
  )
}

function StatusChip({ label }: { label: string }) {
  return (
    <span className="absolute top-10 right-5 z-10 inline-flex items-center gap-1.5 border border-ink bg-surface px-2 py-1 font-mono text-[0.6rem] leading-none tracking-wide text-ink uppercase">
      {label === 'Live' && <span aria-hidden className="project-live-dot" />}
      {label === 'Private' && <LockSimpleIcon aria-hidden size={10} />}
      {label}
    </span>
  )
}

/** A quiet project note for work without a screenshot, instead of a fake product UI. */
function ProjectNote({ project }: { project: Project }) {
  const status = getStatusLabel(project) ?? 'Public work'

  return (
    <div aria-hidden className="flex h-full flex-col justify-between bg-tint p-5">
      <p className="font-mono text-[0.62rem] tracking-[0.16em] text-accent uppercase">Project note</p>
      <div>
        <p className="max-w-[12ch] text-3xl font-medium leading-[0.95] tracking-[-0.07em]">{project.category}</p>
        <div className="mt-5 flex items-center justify-between border-t border-line pt-3 font-mono text-[0.62rem] text-subtle">
          <span>{status}</span>
          <span>{project.year}</span>
        </div>
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
    media = <ProjectNote project={project} />
  }

  const hasTerminal = !project.image && !project.flow

  return (
    <div className="project-visual-mat relative aspect-[4/3] border-b border-line">
      <div className="project-visual-frame absolute inset-3 flex flex-col overflow-hidden border border-ink bg-surface-2">
        {!hasTerminal && <BrowserBar address={getPreviewAddress(project)} />}
        <div className="min-h-0 flex-1">{media}</div>
      </div>
      {statusLabel && <StatusChip label={statusLabel} />}
      <MetricBadge project={project} />
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
        <p className="mt-2 line-clamp-3 min-h-[4.25rem] text-sm leading-relaxed text-muted">
          {project.teaser ?? project.summary}
        </p>
        {project.image && project.flow && <PipelineLine flow={project.flow} />}
        <StackLine project={project} />
        <ProjectFooter project={project} />
      </div>
    </li>
  )
}

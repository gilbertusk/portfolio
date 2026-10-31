import {
  ArrowUpRightIcon,
  ClipboardTextIcon,
  CompassIcon,
  GameControllerIcon,
  HeartbeatIcon,
  PlugsConnectedIcon,
  ShoppingCartIcon,
  StackIcon,
  type Icon,
} from '@phosphor-icons/react'
import { getProject } from '../../data/projects'
import { alsoBuilt, type AlsoBuiltEntry, type AlsoBuiltIcon } from '../../data/showcase'
import { cn } from '../../lib/cn'
import { TONE } from '../../lib/tone'
import { LINK_META } from '../ui/linkMeta'
import { StackList } from '../ui/StackList'

const ICONS: Record<AlsoBuiltIcon, Icon> = {
  clipboard: ClipboardTextIcon,
  cart: ShoppingCartIcon,
  game: GameControllerIcon,
  compass: CompassIcon,
  heartbeat: HeartbeatIcon,
  plug: PlugsConnectedIcon,
}

function AlsoBuiltTile({ entry }: { entry: AlsoBuiltEntry }) {
  const project = getProject(entry.id)
  const TileIcon = ICONS[entry.icon]
  const [primaryLink] = project.links
  const tag = project.isPrivate ? 'Private repo' : project.year

  return (
    <li className="bento-card lift flex flex-col justify-between gap-5 p-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className={cn('grid size-12 place-items-center rounded-lg border-[1.5px] border-ink', TONE[entry.tone].bg, TONE[entry.tone].fg)}>
            <TileIcon aria-hidden weight="bold" size={22} />
          </span>
          <span className="rounded-md border border-line bg-bg px-2 py-0.5 font-mono text-[0.7rem] font-semibold text-muted">{tag}</span>
        </div>
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="text-sm text-pretty text-muted">{project.summary}</p>
        <StackList title={project.title} stack={project.stack} className="pt-1" />
      </div>
      {primaryLink ? (
        <a
          href={primaryLink.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title}: ${LINK_META[primaryLink.kind].label} (opens in a new tab)`}
          className="inline-flex w-fit items-center gap-1 font-semibold text-blue transition-opacity hover:opacity-70"
        >
          {LINK_META[primaryLink.kind].label}
          <ArrowUpRightIcon aria-hidden weight="bold" size={16} />
        </a>
      ) : (
        <p className="text-sm text-muted">{project.isPrivate ? 'Code is private' : 'No public link'}</p>
      )}
    </li>
  )
}

export function AlsoBuilt() {
  return (
    <ul aria-label="Also built" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Spans the full row so the six tiles below fill even rows at every breakpoint. */}
      <li className="flex flex-col justify-between gap-6 hard bg-navy p-7 text-white md:col-span-2 md:flex-row md:items-end lg:col-span-3">
        <div className="flex flex-col gap-3.5">
          <span aria-hidden className="grid h-8.5 w-14 place-items-center rounded-lg border-[1.5px] border-white/30 bg-coral">
            <StackIcon weight="bold" size={18} />
          </span>
          <p className="text-sm font-medium text-white/60">Also built</p>
          <p className="text-2xl font-semibold tracking-[-0.02em] text-balance">Smaller builds and experiments</p>
        </div>
        <p className="max-w-sm text-sm text-pretty text-white/70">
          Client tools, side projects, and early ML work that shaped how I build today.
        </p>
      </li>
      {alsoBuilt.map((entry) => (
        <AlsoBuiltTile key={entry.id} entry={entry} />
      ))}
    </ul>
  )
}

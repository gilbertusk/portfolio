import { DatabaseIcon, HardDrivesIcon, MonitorIcon, RobotIcon, type Icon } from '@phosphor-icons/react'
import { toolGroups, type ToolGroup } from '../../data/stack'
import { cn } from '../../lib/cn'
import { BrandIcon } from '../ui/BrandIcon'
import { Reveal } from '../ui/Reveal'
import { ToolkitShell } from './ToolkitShell'

interface GroupStyle {
  icon: Icon
  card: string
  badge: string
  chip: string
  /** The wide group spans the full row on desktop. */
  isWide: boolean
  /** Dark cards switch chip and badge text to light. */
  isDark: boolean
}

// Backend leads across the full row; the other three groups share the row below.
const GROUP_STYLE: Record<string, GroupStyle> = {
  backend: { icon: HardDrivesIcon, card: 'bg-blue text-white', badge: 'bg-coral text-white', chip: 'bg-white/12', isWide: true, isDark: true },
  ai: { icon: RobotIcon, card: 'bg-coral-soft', badge: 'bg-coral text-white', chip: 'bg-white', isWide: false, isDark: false },
  frontend: { icon: MonitorIcon, card: 'bg-lavender', badge: 'bg-blue text-white', chip: 'bg-white', isWide: false, isDark: false },
  infra: { icon: DatabaseIcon, card: 'bg-sky', badge: 'bg-navy text-white', chip: 'bg-white', isWide: false, isDark: false },
}

const GROUP_ORDER = ['backend', 'ai', 'infra', 'frontend']

function ToolGroupCard({ group }: { group: ToolGroup }) {
  const style = GROUP_STYLE[group.id]
  const GroupIcon = style.icon
  const { isDark } = style

  return (
    <div className={cn('hard lift flex h-full flex-col gap-5 p-6 md:p-7', style.card)}>
      <div className="flex items-center gap-3">
        <span className={cn('grid size-11 shrink-0 place-items-center rounded-lg border-[1.5px] border-ink', style.badge)}>
          <GroupIcon aria-hidden weight="bold" size={21} />
        </span>
        <h3 className="flex-1 text-lg font-semibold">{group.title}</h3>
        <span className={cn('rounded-md px-2 py-0.5 font-mono text-[0.7rem] font-semibold', isDark ? 'bg-white/14' : 'bg-white/70')}>
          {group.tools.length} tools
        </span>
      </div>
      <ul aria-label={group.title} className="flex flex-wrap gap-2">
        {group.tools.map(({ name, icon }) => (
          <li
            key={name}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-md border border-ink/15 px-2.5 py-1.5 font-mono text-[0.75rem] font-medium transition-transform motion-safe:hover:-translate-y-0.5',
              style.chip,
            )}
          >
            {icon && <BrandIcon icon={icon} size={13} className={isDark ? 'text-white/80' : 'text-muted'} />}
            {name}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Default export so LazyStack can code-split it with React.lazy.
export default function Stack() {
  const groups = GROUP_ORDER.map((id) => toolGroups.find((group) => group.id === id)).filter(
    (group): group is ToolGroup => group !== undefined,
  )

  const toolCount = groups.reduce((total, group) => total + group.tools.length, 0)

  return (
    <ToolkitShell blurb={`${toolCount} tools across the stack, from the API to the tests around it.`}>
      <div className="grid gap-4 lg:grid-cols-3">
        {groups.map((group, index) => (
          <Reveal
            key={group.id}
            delay={(index % 2) * 0.08}
            className={GROUP_STYLE[group.id].isWide ? 'lg:col-span-3' : undefined}
          >
            <ToolGroupCard group={group} />
          </Reveal>
        ))}
      </div>
    </ToolkitShell>
  )
}

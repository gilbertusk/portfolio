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
  /** Wide groups span two of three columns on desktop. */
  isWide: boolean
}

// Wide cards alternate sides row by row, like brickwork.
const GROUP_STYLE: Record<string, GroupStyle> = {
  ai: { icon: RobotIcon, card: 'bg-blue text-white', badge: 'bg-coral text-white', chip: 'bg-white/12', isWide: true },
  backend: { icon: HardDrivesIcon, card: 'bg-coral-soft', badge: 'bg-coral text-white', chip: 'bg-white', isWide: false },
  frontend: { icon: MonitorIcon, card: 'bg-lavender', badge: 'bg-blue text-white', chip: 'bg-white', isWide: false },
  infra: { icon: DatabaseIcon, card: 'bg-sky', badge: 'bg-navy text-white', chip: 'bg-white', isWide: true },
}

const GROUP_ORDER = ['ai', 'backend', 'frontend', 'infra']

function ToolGroupCard({ group }: { group: ToolGroup }) {
  const style = GROUP_STYLE[group.id]
  const GroupIcon = style.icon
  const isDark = group.id === 'ai'

  return (
    <div className={cn('lift flex h-full flex-col gap-5 rounded-3xl p-6 md:p-7', style.card)}>
      <div className="flex items-center gap-3">
        <span className={cn('grid size-11 shrink-0 place-items-center rounded-2xl', style.badge)}>
          <GroupIcon aria-hidden weight="bold" size={21} />
        </span>
        <h3 className="flex-1 text-lg font-semibold">{group.title}</h3>
        <span className={cn('rounded-full px-2.5 py-1 text-[0.8rem] font-medium', isDark ? 'bg-white/14' : 'bg-white/70')}>
          {group.tools.length} tools
        </span>
      </div>
      <ul aria-label={group.title} className="flex flex-wrap gap-2">
        {group.tools.map(({ name, icon }) => (
          <li
            key={name}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[0.8rem] font-medium transition-transform motion-safe:hover:scale-105',
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
    <ToolkitShell blurb={`${toolCount} tools across the stack, from the model to the tests around it.`}>
      <div className="grid gap-4 lg:grid-cols-3">
        {groups.map((group, index) => (
          <Reveal
            key={group.id}
            delay={(index % 2) * 0.08}
            className={GROUP_STYLE[group.id].isWide ? 'lg:col-span-2' : undefined}
          >
            <ToolGroupCard group={group} />
          </Reveal>
        ))}
      </div>
    </ToolkitShell>
  )
}

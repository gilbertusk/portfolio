import { toolGroups, type ToolGroup } from '../../data/stack'
import { cn } from '../../lib/cn'
import { BrandIcon } from '../ui/BrandIcon'
import { Reveal } from '../ui/Reveal'
import { Section, SectionHeading } from '../ui/Section'

function ToolGroupCard({ group, isPrimary }: { group: ToolGroup; isPrimary: boolean }) {
  return (
    <div
      className={cn(
        'h-full border-t p-6 md:p-8',
        isPrimary ? 'border-accent border-t-2 bg-tint' : 'border-line bg-transparent',
      )}
    >
      <h3 className={cn('font-medium tracking-tight', isPrimary ? 'text-2xl' : 'text-lg')}>{group.title}</h3>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{group.description}</p>
      <ul aria-label={group.title} className="mt-6 flex flex-wrap gap-2">
        {group.tools.map(({ name, icon }) => (
           <li
             key={name}
             className="inline-flex items-center gap-2 border-b border-line px-1 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            {icon && <BrandIcon icon={icon} className="text-muted" />}
            {name}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Default export so LazyStack can code-split it with React.lazy.
export default function Stack() {
  return (
    <Section id="stack" labelledBy="stack-heading">
      {/* No Reveal here: the loading placeholder already showed this heading. */}
      <SectionHeading id="stack-heading" title="Tools I work with" />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {toolGroups.map((group, index) => (
          <Reveal key={group.id} className={index === 0 ? 'md:col-span-3' : undefined} delay={index * 0.06}>
            <ToolGroupCard group={group} isPrimary={index === 0} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

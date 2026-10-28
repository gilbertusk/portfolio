import { toolGroups, type ToolGroup } from '../../data/stack'
import { BrandIcon } from '../ui/BrandIcon'
import { Reveal } from '../ui/Reveal'
import { Section, SectionHeading } from '../ui/Section'

function ToolGroupRow({ group, index }: { group: ToolGroup; index: number }) {
  return (
    <article className="stack-group">
      <div className="stack-group-index">0{index + 1}</div>
      <div className="stack-group-copy">
        <h3>{group.title}</h3>
        <p>{group.description}</p>
      </div>
      <ul aria-label={group.title} className="stack-tools">
        {group.tools.map(({ name, icon }) => (
          <li key={name}>
            {icon && <BrandIcon icon={icon} className="text-muted" />}
            {name}
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function Stack() {
  return (
    <Section id="stack" labelledBy="stack-heading" className="stack-section">
      <div className="stack-heading-row">
        <SectionHeading id="stack-heading" title="Tools I work with" />
        <p className="stack-heading-note">A practical stack, chosen for the work rather than the trend.</p>
      </div>
      <div className="stack-list">
        {toolGroups.map((group, index) => (
          <Reveal key={group.id} delay={index * 0.06}>
            <ToolGroupRow group={group} index={index} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

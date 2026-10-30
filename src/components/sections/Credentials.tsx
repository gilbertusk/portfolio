import { CloudIcon, GraduationCapIcon, ShieldCheckIcon, type Icon } from '@phosphor-icons/react'
import { timeline } from '../../data/about'
import { specialization } from '../../data/showcase'
import { cn } from '../../lib/cn'
import { Reveal } from '../ui/Reveal'

interface Credential {
  icon: Icon
  iconClass: string
  label: string
  title: string
  detail: string
}

function buildCredentials(): Credential[] {
  const [university, bangkit] = timeline
  return [
    {
      icon: GraduationCapIcon,
      iconClass: 'bg-blue-soft text-blue',
      label: university.period,
      title: 'Informatics Engineering',
      detail: `${university.org} (UNNES)`,
    },
    {
      icon: CloudIcon,
      iconClass: 'bg-coral-soft text-coral',
      label: bangkit.period,
      title: `${bangkit.org} graduate`,
      detail: 'Led by Google, GoTo, and Traveloka (cloud cohort)',
    },
    {
      icon: ShieldCheckIcon,
      iconClass: 'bg-lavender text-[#5b21b6]',
      label: specialization.label,
      title: specialization.title,
      detail: specialization.detail,
    },
  ]
}

/** The row of credentials under the ticker: school, bootcamp, and focus. */
export function Credentials() {
  return (
    <section aria-label="Education and focus" className="px-3 md:px-8">
      <Reveal className="mx-auto max-w-[71rem]">
        <ul className="grid gap-4 md:grid-cols-3">
          {buildCredentials().map(({ icon: CredentialIcon, iconClass, label, title, detail }) => (
            <li key={title} className="bento-card lift flex items-start gap-3.5 p-4">
              <span className={cn('grid size-10 shrink-0 place-items-center rounded-lg border-[1.5px] border-ink', iconClass)}>
                <CredentialIcon aria-hidden weight="bold" size={19} />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.68rem] font-semibold tracking-[0.06em] text-muted uppercase">{label}</span>
                <span className="font-display font-bold">{title}</span>
                <span className="text-[0.8rem] text-muted">{detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}

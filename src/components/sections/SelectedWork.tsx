import { SparkleIcon } from '@phosphor-icons/react'
import { getProject } from '../../data/projects'
import { featured } from '../../data/showcase'
import { Reveal } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'
import { AlsoBuilt } from './AlsoBuilt'
import { ProjectCard } from './ProjectCard'

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-heading" className="px-3 pb-6 md:px-8">
      <div className="mx-auto flex max-w-[71rem] flex-col gap-7">
        <SectionTitle
          id="work-heading"
          before="Selected"
          after="work"
          icon={SparkleIcon}
          tone="coral"
          blurb="Models trained, evaluated, and shipped, plus the backend systems that hold them up."
        />
        <div className="flex flex-col gap-4">
          <ul aria-label="Selected projects" className="grid gap-4 md:grid-cols-2">
            {featured.map((entry, index) => (
              <Reveal as="li" key={entry.id} className="h-full" delay={(index % 2) * 0.08}>
                <ProjectCard project={getProject(entry.id)} entry={entry} />
              </Reveal>
            ))}
          </ul>
          <Reveal>
            <AlsoBuilt />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

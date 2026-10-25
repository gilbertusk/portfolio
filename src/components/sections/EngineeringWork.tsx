import { LockSimpleIcon } from '@phosphor-icons/react'
import jaegerImage from '../../assets/projects/travel-jaeger.webp'
import { engineeringProjects } from '../../data/projects'
import type { Project } from '../../data/types'
import { ProjectLinks } from '../ui/ProjectLinks'
import { Reveal } from '../ui/Reveal'
import { Section, SectionHeading } from '../ui/Section'
import { TagList } from '../ui/TagList'

function EngineeringItem({ project }: { project: Project }) {
  const { title, year, category, status, summary, stack, links, isPrivate } = project

  return (
    <li className="py-8 first:pt-0 last:pb-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-xl font-medium tracking-tight">{title}</h3>
        <p className="text-sm text-subtle">
          {status ? <span className="font-medium text-accent">{status}</span> : year} · {category}
        </p>
      </div>
      <p className="mt-2.5 leading-relaxed text-muted">{summary}</p>
      <TagList tags={stack} label={`${title} tech stack`} className="mt-4" />
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <ProjectLinks title={title} links={links} />
        {isPrivate && (
          <span className="inline-flex items-center gap-1.5 text-sm text-subtle">
            <LockSimpleIcon aria-hidden size={14} />
            Private repository
          </span>
        )}
      </div>
    </li>
  )
}

export function EngineeringWork() {
  return (
    <Section id="engineering" labelledBy="engineering-heading" className="border-y border-ink bg-surface">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <SectionHeading
                id="engineering-heading"
                title="Backend and systems work"
                intro="Distributed services, event pipelines, and internal tools: the groundwork that keeps an AI feature reliable once people depend on it."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <figure className="mt-10">
                <img
                  src={jaegerImage}
                  alt="Jaeger trace of a booking request spanning the payment, booking, and supplier services, 126 spans in total"
                  width={1400}
                  height={963}
                  loading="lazy"
                  decoding="async"
                  className="w-full border border-line"
                />
                <figcaption className="mt-3 text-sm leading-relaxed text-subtle">
                  A booking saga in the Travel Booking Engine, traced across three services in Jaeger.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        <Reveal className="lg:col-span-7">
          <ol className="divide-y divide-line">
            {engineeringProjects.map((project) => (
              <EngineeringItem key={project.id} project={project} />
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  )
}

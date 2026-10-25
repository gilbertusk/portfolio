import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react'
import { useRef, useState } from 'react'
import { allProjects } from '../../data/projects'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { ProjectCard } from './ProjectCard'

export function SelectedWork() {
  const trackRef = useRef<HTMLOListElement>(null)
  const [currentProject, setCurrentProject] = useState(0)
  const [canScrollBack, setCanScrollBack] = useState(false)
  const [canScrollForward, setCanScrollForward] = useState(true)

  const moveCarousel = (direction: -1 | 1) => {
    const track = trackRef.current
    const firstCard = track?.querySelector<HTMLElement>('.project-card')
    if (!track || !firstCard) return

    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 24
    track.scrollBy({ left: direction * (firstCard.offsetWidth + gap), behavior: 'smooth' })
  }

  const updateCurrentProject = () => {
    const track = trackRef.current
    const firstCard = track?.querySelector<HTMLElement>('.project-card')
    if (!track || !firstCard) return

    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 24
    const nextIndex = Math.round(track.scrollLeft / (firstCard.offsetWidth + gap))
    setCurrentProject(Math.min(allProjects.length - 1, Math.max(0, nextIndex)))
    setCanScrollBack(track.scrollLeft > 1)
    setCanScrollForward(track.scrollLeft < track.scrollWidth - track.clientWidth - 1)
  }

  return (
    <Section id="work" labelledBy="work-heading" className="work-pattern border-t border-ink">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="flex flex-col justify-between gap-4 border-b border-ink pb-5 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-xs tracking-widest text-subtle uppercase">01 / Selected work</p>
              <h2 id="work-heading" className="mt-2 text-3xl font-medium tracking-[-0.06em]">Projects.</h2>
            </div>
            <p className="max-w-sm text-sm leading-snug text-muted">
              AI, automation, and backend systems in one collection. Swipe or use the arrows to explore.
            </p>
          </div>
        </Reveal>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p aria-live="polite" className="font-mono text-xs text-subtle">
            {String(currentProject + 1).padStart(2, '0')} / {String(allProjects.length).padStart(2, '0')}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Show previous projects"
              onClick={() => moveCarousel(-1)}
              className="grid size-10 place-items-center border border-line bg-surface transition-colors hover:border-ink hover:bg-tint disabled:cursor-not-allowed disabled:opacity-35"
              disabled={!canScrollBack}
            >
              <ArrowLeftIcon aria-hidden size={17} />
            </button>
            <button
              type="button"
              aria-label="Show next projects"
              onClick={() => moveCarousel(1)}
              className="grid size-10 place-items-center bg-ink text-surface transition-transform hover:translate-x-0.5 disabled:cursor-not-allowed disabled:opacity-35"
              disabled={!canScrollForward}
            >
              <ArrowRightIcon aria-hidden size={17} />
            </button>
          </div>
        </div>

        <div className="project-carousel-shell mt-4">
          <ol
            ref={trackRef}
            aria-label="Project carousel"
            onScroll={updateCurrentProject}
            className="project-carousel flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pt-1 pb-5"
          >
            {allProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} number={index + 1} />
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}

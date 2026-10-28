import { allProjects } from '../../data/projects'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { ProjectCard } from './ProjectCard'

export function SelectedWork() {
  return (
    <Section id="work" labelledBy="work-heading" className="work-pattern border-t border-ink">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="work-intro">
            <div>
              <p className="section-index">Selected work</p>
              <h2 id="work-heading">A few things I have built.</h2>
            </div>
            <p>
              Computer vision experiments, OCR automation, and backend systems built from the model to the workflow around it.
            </p>
          </div>
        </Reveal>

        <ol aria-label="Project carousel" className="project-carousel project-grid">
          {allProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} number={index + 1} />
          ))}
        </ol>
      </div>
    </Section>
  )
}

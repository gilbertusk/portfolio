import { ArrowUpRightIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { VISIBLE_CERTIFICATIONS, bio, certifications, timeline, type Certification } from '../../data/about'
import { Reveal } from '../ui/Reveal'
import { Section, SectionHeading } from '../ui/Section'

function CertificationItem({ cert }: { cert: Certification }) {
  return (
    <li className="border-t border-line pt-4">
      {cert.href ? (
        <a
          href={cert.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${cert.title}: verify on ${cert.issuer} (opens in a new tab)`}
          className="group/cert font-medium leading-snug hover:text-accent"
        >
          {cert.title}
          <ArrowUpRightIcon
            aria-hidden
            size={14}
            className="ml-1 inline align-[-1px] text-subtle transition-transform group-hover/cert:-translate-y-px group-hover/cert:translate-x-px"
          />
        </a>
      ) : (
        <p className="font-medium leading-snug">{cert.title}</p>
      )}
      <p className="mt-1 text-sm text-subtle">
        {cert.issuer} · {cert.date}
      </p>
    </li>
  )
}

export function About() {
  const [showAllCerts, setShowAllCerts] = useState(false)
  const visibleCerts = showAllCerts ? certifications : certifications.slice(0, VISIBLE_CERTIFICATIONS)
  const hiddenCount = certifications.length - VISIBLE_CERTIFICATIONS

  return (
    <Section id="about" labelledBy="about-heading">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionHeading id="about-heading" title="About" />
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
            {bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <div className="space-y-16 lg:col-span-7">
          <Reveal>
            <h3 className="text-lg font-medium tracking-tight">Experience and education</h3>
            <ol className="mt-6 space-y-7">
              {timeline.map((entry) => (
                <li key={entry.role} className="grid gap-1 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
                  <p className="pt-0.5 font-mono text-sm text-subtle">{entry.period}</p>
                  <div>
                    <p className="font-medium">
                      {entry.role}
                      <span className="text-muted">, {entry.org}</span>
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{entry.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal>
            <h3 className="text-lg font-medium tracking-tight">Certifications</h3>
            <ul id="certification-list" className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {visibleCerts.map((cert) => (
                <CertificationItem key={cert.title} cert={cert} />
              ))}
            </ul>
            {hiddenCount > 0 && (
              <button
                type="button"
                onClick={() => setShowAllCerts((isShown) => !isShown)}
                aria-expanded={showAllCerts}
                aria-controls="certification-list"
                className="mt-6 border border-ink bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface-2 active:scale-[0.98]"
              >
                {showAllCerts ? 'Show fewer' : `Show all ${certifications.length} certifications`}
              </button>
            )}
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

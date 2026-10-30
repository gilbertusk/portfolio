import { ArrowUpRightIcon, CertificateIcon, MedalIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { VISIBLE_CERTIFICATIONS, certifications, type Certification } from '../../data/about'
import type { Tone } from '../../data/showcase'
import { cn } from '../../lib/cn'
import { TONE } from '../../lib/tone'
import { Reveal } from '../ui/Reveal'

const BADGE_TONES: Tone[] = ['blue', 'coral', 'sky', 'lavender']

function CertificationBadge({ cert, tone }: { cert: Certification; tone: Tone }) {
  return (
    <li className="lift flex flex-col overflow-hidden rounded-[1.1rem] border border-line bg-card">
      <div className={cn('flex h-[4.5rem] items-center justify-between px-4', TONE[tone].bg, TONE[tone].fg)}>
        <span aria-hidden className="grid size-10 place-items-center rounded-full bg-white/25">
          <MedalIcon weight="bold" size={19} />
        </span>
        <span className="text-[0.8rem] font-semibold">{cert.date}</span>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4 p-4">
        <p className="flex flex-col gap-1">
          <span className="text-[0.8rem] font-medium text-muted">{cert.issuer}</span>
          <span className="font-semibold text-balance">{cert.title}</span>
        </p>
        {cert.href ? (
          <a
            href={cert.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Verify ${cert.title} (opens in a new tab)`}
            className="inline-flex w-fit items-center gap-1 text-[0.95rem] font-semibold text-blue transition-opacity hover:opacity-70"
          >
            Verify
            <ArrowUpRightIcon aria-hidden weight="bold" size={15} />
          </a>
        ) : (
          <span className="text-sm text-muted">No public link</span>
        )}
      </div>
    </li>
  )
}

export function Certifications() {
  const [isExpanded, setIsExpanded] = useState(false)
  const visible = isExpanded ? certifications : certifications.slice(0, VISIBLE_CERTIFICATIONS)

  return (
    <section aria-labelledby="certifications-heading" className="px-3 pt-4 md:px-8">
      <Reveal className="bento-card mx-auto flex max-w-[71rem] flex-col gap-6 p-6 md:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-blue-soft text-blue">
              <CertificateIcon aria-hidden weight="bold" size={22} />
            </span>
            <div>
              <h2 id="certifications-heading" className="text-lg font-semibold">
                Certifications
              </h2>
              <p className="text-sm text-muted">Selected courses from Dicoding and HiColleagues.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsExpanded((open) => !open)}
            aria-expanded={isExpanded}
            aria-controls="certification-list"
            className="w-fit rounded-full border border-line px-4 py-2 text-sm font-semibold transition-colors hover:bg-bg"
          >
            {isExpanded ? 'Show fewer' : `Show all ${certifications.length} certifications`}
          </button>
        </div>
        <ul id="certification-list" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((cert, index) => (
            <CertificationBadge key={cert.title} cert={cert} tone={BADGE_TONES[index % BADGE_TONES.length]} />
          ))}
        </ul>
      </Reveal>
    </section>
  )
}

import {
  ArrowRightIcon,
  AsteriskIcon,
  CloudIcon,
  GraduationCapIcon,
  HandshakeIcon,
  MapPinIcon,
  QuotesIcon,
  SmileyIcon,
  UsersIcon,
  type Icon,
} from '@phosphor-icons/react'
import { bio, timeline } from '../../data/about'
import { profile } from '../../data/profile'
import { aboutFacts, type Tone } from '../../data/showcase'
import { cn } from '../../lib/cn'
import { TONE } from '../../lib/tone'
import { Reveal } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'

const FACT_STYLE: { icon: Icon; className: string }[] = [
  { icon: MapPinIcon, className: 'bg-blue-soft [&>svg]:text-blue' },
  { icon: GraduationCapIcon, className: 'bg-lavender' },
  { icon: CloudIcon, className: 'bg-sky' },
]

const TIMELINE_STYLE: { icon: Icon; tone: Tone }[] = [
  { icon: GraduationCapIcon, tone: 'blue' },
  { icon: CloudIcon, tone: 'sky' },
  { icon: UsersIcon, tone: 'coral' },
  { icon: HandshakeIcon, tone: 'lavender' },
]

function BioCard() {
  return (
    <div className="bento-card relative flex flex-col gap-7 overflow-hidden p-6 md:p-9 lg:col-span-2">
      <span
        aria-hidden
        className="absolute -top-10 -right-10 grid size-28 place-items-center rounded-full bg-blue-soft pt-5 pr-5 md:size-40 md:pt-8 md:pr-8"
      >
        <AsteriskIcon weight="bold" className="size-7 text-blue motion-safe:animate-spin-slow md:size-10" />
      </span>
      <div className="relative flex flex-col gap-4.5">
        <span aria-hidden className="grid h-8 w-13 place-items-center rounded-full bg-coral text-white">
          <QuotesIcon weight="fill" size={16} />
        </span>
        <h3 className="max-w-xl text-[1.9rem] leading-[1.1] font-semibold tracking-[-0.03em] text-balance md:text-[2.5rem]">
          A backend developer who moved <span className="text-blue">closer to the model.</span>
        </h3>
        {bio.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="text-pretty text-muted">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="flex flex-col gap-4 border-t border-line pt-5 md:flex-row md:items-center md:justify-between">
        <ul aria-label="Quick facts" className="flex flex-1 flex-wrap gap-2">
          {aboutFacts.map((fact, index) => {
            const { icon: FactIcon, className } = FACT_STYLE[index]
            return (
              <li
                key={fact}
                className={cn('inline-flex items-center gap-1 rounded-full py-1.5 pr-2.5 pl-2 text-xs font-medium', className)}
              >
                <FactIcon aria-hidden weight="bold" size={14} />
                {fact}
              </li>
            )
          })}
        </ul>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full bg-blue px-3.5 py-2 text-[0.95rem] font-semibold text-white transition-transform motion-safe:hover:-translate-y-0.5"
        >
          Email me
          <ArrowRightIcon aria-hidden weight="bold" size={15} />
        </a>
      </div>
    </div>
  )
}

function ExperienceCard() {
  return (
    <div className="flex flex-col gap-5 rounded-3xl bg-navy p-7 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Experience</h3>
        <span className="rounded-full bg-white/12 px-2.5 py-1 text-[0.8rem] font-medium">{timeline.length} roles</span>
      </div>
      <ol aria-label="Experience timeline" className="flex flex-col gap-1">
        {timeline.map((entry, index) => {
          const { icon: EntryIcon, tone } = TIMELINE_STYLE[index % TIMELINE_STYLE.length]
          const isLast = index === timeline.length - 1
          return (
            <li key={entry.role} className="flex gap-3.5">
              <span className="flex flex-col items-center">
                <span className={cn('grid size-9 shrink-0 place-items-center rounded-xl', TONE[tone].bg, TONE[tone].fg)}>
                  <EntryIcon aria-hidden weight="bold" size={17} />
                </span>
                {!isLast && <span aria-hidden className="w-0.5 flex-1 bg-white/18" />}
              </span>
              <span className="flex flex-col gap-0.5 pb-4">
                <span className="text-[0.8rem] font-medium text-white/55">{entry.period}</span>
                <span className="font-semibold">{entry.role}</span>
                <span className="text-sm text-white/70">{entry.org}</span>
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="px-3 pt-16 md:px-8 md:pt-20">
      <div className="mx-auto flex max-w-[71rem] flex-col gap-7">
        <SectionTitle id="about-heading" before="About" after="me" icon={SmileyIcon} tone="sky" />
        <Reveal className="grid gap-4 lg:grid-cols-3">
          <BioCard />
          <ExperienceCard />
        </Reveal>
      </div>
    </section>
  )
}

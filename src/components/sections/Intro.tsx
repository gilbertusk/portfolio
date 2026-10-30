import {
  ArrowDownIcon,
  BrainIcon,
  CameraIcon,
  CloudIcon,
  DatabaseIcon,
  EyeIcon,
  FlowArrowIcon,
  GithubLogoIcon,
  GraduationCapIcon,
  HardDrivesIcon,
  LinkedinLogoIcon,
  PulseIcon,
  RocketIcon,
  TargetIcon,
  type Icon,
} from '@phosphor-icons/react'
import { m } from 'motion/react'
import { timeline } from '../../data/about'
import { intro, profile } from '../../data/profile'
import { focusAreas, highlightStats, workflowSteps, type Tone } from '../../data/showcase'
import { cn } from '../../lib/cn'
import { EASE_OUT } from '../../lib/motion'
import { TONE } from '../../lib/tone'
import { Reveal } from '../ui/Reveal'

const ICONS: Record<string, Icon> = {
  eye: EyeIcon,
  flow: FlowArrowIcon,
  server: HardDrivesIcon,
  database: DatabaseIcon,
  brain: BrainIcon,
}

const HEADLINE: { lead: string; chip: Icon; tone: Tone; tail: string }[] = [
  { lead: 'I turn', chip: CameraIcon, tone: 'coral', tail: 'data' },
  { lead: 'into', chip: BrainIcon, tone: 'blue', tail: 'models' },
  { lead: 'that', chip: RocketIcon, tone: 'sky', tail: 'ship.' },
]

const FOCUS_TONES = ['bg-blue-soft text-blue', 'bg-coral-soft text-coral', 'bg-sky/40 text-blue'] as const

function Headline() {
  return (
    <h1
      aria-label={HEADLINE.map(({ lead, tail }) => `${lead} ${tail}`).join(' ')}
      className="flex flex-col gap-1 text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.035em] md:text-[3.5rem]"
    >
      {HEADLINE.map(({ lead, chip: Chip, tone, tail }, index) => (
        <m.span
          key={lead}
          className="flex items-center gap-2.5 md:gap-3.5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 + index * 0.1, ease: EASE_OUT }}
        >
          {lead}{' '}
          <span
            aria-hidden
            className={cn(
              'inline-grid h-10 w-16 shrink-0 place-items-center rounded-full md:h-14 md:w-24',
              TONE[tone].bg,
              TONE[tone].fg,
              index !== 1 && 'motion-safe:animate-[wiggle_1.4s_ease-in-out_infinite_alternate]',
            )}
          >
            <Chip weight="bold" className="size-5 md:size-7" />
          </span>{' '}
          <span className={index === 2 ? 'text-blue' : undefined}>{tail}</span>
        </m.span>
      ))}
    </h1>
  )
}

function HelloCard() {
  return (
    <div className="bento-card flex flex-col justify-between gap-8 p-6 md:col-span-2 md:p-9">
      <div className="flex flex-col gap-5">
        <p className="inline-flex w-fit items-center gap-2 rounded-full bg-bg px-3 py-1.5 text-[0.8rem] font-medium">
          <span aria-hidden className="size-2 rounded-full bg-[#22a55b] motion-safe:animate-blink" />
          {profile.availability}
        </p>
        <p className="text-sm font-medium">
          {profile.name} · {profile.role}
        </p>
        <Headline />
        <p className="max-w-lg text-[1.1rem] leading-relaxed text-pretty text-muted">{intro.summary}</p>
      </div>
      <div className="flex flex-wrap gap-2.5 pt-2">
        <a
          href="#work"
          className="inline-flex items-center gap-2 rounded-full bg-blue px-5 py-3 text-[0.95rem] font-semibold text-white transition-transform motion-safe:hover:-translate-y-0.5"
        >
          <ArrowDownIcon aria-hidden weight="bold" size={17} />
          See my work
        </a>
        {[
          { label: 'GitHub', href: profile.links.github, icon: GithubLogoIcon },
          { label: 'LinkedIn', href: profile.links.linkedin, icon: LinkedinLogoIcon },
        ].map(({ label, href, icon: LinkIcon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (opens in a new tab)`}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-5 py-3 text-[0.95rem] font-semibold transition-transform motion-safe:hover:-translate-y-0.5"
          >
            <LinkIcon aria-hidden weight="bold" size={17} />
            {label}
          </a>
        ))}
      </div>
    </div>
  )
}

function WorkflowCard() {
  return (
    <div className="flex flex-col justify-between gap-6 rounded-3xl bg-sky p-7">
      <p className="text-sm font-medium">How I work</p>
      <ol aria-label="Workflow steps" className="flex flex-col items-center">
        {workflowSteps.map(({ icon, title, detail }, index) => {
          const StepIcon = ICONS[icon]
          const isModel = index === 1
          return (
            <li key={title} className="flex w-full flex-col items-center">
              <div
                className={cn(
                  'flex w-full items-center gap-3 rounded-2xl p-2.5 pr-3',
                  isModel ? 'bg-navy text-white' : 'bg-white/70',
                )}
              >
                <span
                  className={cn('grid size-9 place-items-center rounded-xl', isModel ? 'bg-coral' : 'bg-card')}
                >
                  <StepIcon aria-hidden weight="bold" size={18} />
                </span>
                <span className="flex flex-col">
                  <span className="font-semibold">{title}</span>
                  <span className={cn('text-[0.8rem]', isModel ? 'text-white/70' : 'text-muted')}>{detail}</span>
                </span>
              </div>
              {index < workflowSteps.length - 1 && <span aria-hidden className="h-4 w-0.5 bg-ink/50" />}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function StatCard({ value, label, tone, icon: StatIcon }: { value: string; label: string; tone: Tone; icon: Icon }) {
  return (
    <div className={cn('flex flex-1 flex-col justify-between gap-6 rounded-3xl p-7', TONE[tone].bg, TONE[tone].fg)}>
      <StatIcon aria-hidden weight="bold" size={22} />
      <p className="flex flex-col gap-2">
        <span className="text-[3.25rem] leading-none font-semibold tracking-[-0.04em] tabular-nums">{value}</span>
        <span className="text-sm opacity-80">{label}</span>
      </p>
    </div>
  )
}

function FocusCard() {
  return (
    <div className="bento-card flex flex-col gap-4 p-7 md:col-span-2">
      <h2 className="text-sm font-medium text-muted">What I work on</h2>
      <ul className="flex flex-col gap-3">
        {focusAreas.map(({ icon, title, detail }, index) => {
          const FocusIcon = ICONS[icon]
          return (
            <li key={title} className="flex items-center gap-3.5">
              <span className={cn('grid size-10 shrink-0 place-items-center rounded-xl', FOCUS_TONES[index])}>
                <FocusIcon aria-hidden weight="bold" size={19} />
              </span>
              <span className="flex flex-col">
                <span className="font-semibold">{title}</span>
                <span className="text-sm text-muted">{detail}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function SchoolCard({ icon: SchoolIcon, period, title, detail }: { icon: Icon; period: string; title: string; detail: string }) {
  return (
    <div className="bento-card flex flex-col justify-between gap-8 p-7">
      <span className="grid size-10 place-items-center rounded-xl bg-bg">
        <SchoolIcon aria-hidden weight="bold" size={19} />
      </span>
      <p className="flex flex-col gap-1">
        <span className="text-[0.8rem] font-medium text-muted">{period}</span>
        <span className="font-semibold">{title}</span>
        <span className="text-sm text-muted">{detail}</span>
      </p>
    </div>
  )
}

export function Intro() {
  const [university, bangkit] = timeline
  const [f1, reps] = highlightStats

  return (
    <section id="home" aria-label="Introduction" className="px-3 pt-6 md:px-8 md:pt-10">
      <div className="mx-auto flex max-w-[71rem] flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <HelloCard />
          <Reveal className="grid" delay={0.05}>
            <WorkflowCard />
          </Reveal>
          <Reveal className="flex flex-col gap-4" delay={0.1}>
            <StatCard value={f1.value} label={f1.label} tone={f1.tone} icon={TargetIcon} />
            <StatCard value={reps.value} label={reps.label} tone={reps.tone} icon={PulseIcon} />
          </Reveal>
        </div>
        <Reveal className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <FocusCard />
          <SchoolCard icon={GraduationCapIcon} period={university.period} title="Informatics Engineering" detail={university.org} />
          <SchoolCard icon={CloudIcon} period={bangkit.period} title={bangkit.org} detail="Cloud computing cohort" />
        </Reveal>
      </div>
    </section>
  )
}

import {
  ArrowDownIcon,
  CloudIcon,
  EyeIcon,
  FlowArrowIcon,
  GithubLogoIcon,
  GraduationCapIcon,
  HandWavingIcon,
  HardDrivesIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  PulseIcon,
  TargetIcon,
  type Icon,
} from '@phosphor-icons/react'
import { m } from 'motion/react'
import profilePhoto from '../../assets/profile.webp'
import { timeline } from '../../data/about'
import { intro, profile } from '../../data/profile'
import { focusAreas, highlightStats, type Tone } from '../../data/showcase'
import { cn } from '../../lib/cn'
import { EASE_OUT } from '../../lib/motion'
import { TONE } from '../../lib/tone'
import { Reveal } from '../ui/Reveal'

const FOCUS_ICONS: Record<(typeof focusAreas)[number]['icon'], Icon> = {
  eye: EyeIcon,
  flow: FlowArrowIcon,
  server: HardDrivesIcon,
}

const FOCUS_TONES = ['bg-blue-soft text-blue', 'bg-coral-soft text-coral', 'bg-lavender text-ink'] as const

const SOCIALS = [
  { label: 'GitHub', href: profile.links.github, icon: GithubLogoIcon },
  { label: 'LinkedIn', href: profile.links.linkedin, icon: LinkedinLogoIcon },
]

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: EASE_OUT },
})

/** The last name gets a hand-drawn coral underline that draws itself in. */
function Name() {
  const [first, ...rest] = profile.name.split(' ')
  return (
    <h1 className="text-[clamp(3.1rem,8vw,5.25rem)] leading-[0.95] font-semibold tracking-[-0.045em]">
      {first}{' '}
      <span className="relative inline-block whitespace-nowrap">
        {rest.join(' ')}
        <svg
          aria-hidden
          viewBox="0 0 300 20"
          preserveAspectRatio="none"
          className="absolute -bottom-2 left-0 h-3 w-full text-coral md:-bottom-3 md:h-4"
        >
          <m.path
            d="M4 14 C 60 4, 120 4, 170 10 S 260 16, 296 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 0.45, ease: EASE_OUT }}
          />
        </svg>
      </span>
    </h1>
  )
}

function HelloCard() {
  return (
    <div className="bento-card relative flex flex-col justify-between gap-10 overflow-hidden p-6 md:p-10 lg:col-span-2 lg:row-span-2">
      {/* Dotted texture fading out from the top-right corner. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-2/3 bg-[radial-gradient(circle,#d3dcf0_1.3px,transparent_1.4px)] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)] bg-[size:20px_20px]"
      />
      <m.div className="relative flex flex-col gap-6" {...enter(0)}>
        <p className="inline-flex w-fit items-center gap-2 rounded-full bg-bg px-3 py-1.5 text-[0.8rem] font-medium">
          <span aria-hidden className="size-2 rounded-full bg-[#22a55b] motion-safe:animate-blink" />
          {profile.availability}
        </p>
        <div className="flex flex-col gap-3">
          <p className="flex items-center gap-3 text-2xl font-semibold tracking-[-0.02em] text-muted md:text-[1.9rem]">
            {intro.greeting}
            <span
              aria-hidden
              className="inline-grid h-9 w-14 origin-bottom place-items-center rounded-full bg-coral text-white motion-safe:animate-[wiggle_1.2s_ease-in-out_infinite_alternate] md:h-11 md:w-16"
            >
              <HandWavingIcon weight="fill" className="size-5 md:size-6" />
            </span>
          </p>
          <Name />
        </div>
        <p className="max-w-xl pt-2 text-[1.35rem] leading-snug font-medium tracking-[-0.015em] text-balance md:text-[1.6rem]">
          {intro.tagline}
        </p>
        <p className="max-w-xl text-[1.05rem] leading-relaxed text-pretty text-muted">{intro.summary}</p>
      </m.div>

      <m.div className="relative flex flex-wrap items-center gap-2.5" {...enter(0.15)}>
        <a
          href="#work"
          className="inline-flex items-center gap-2 rounded-full bg-blue px-5 py-3 font-semibold text-white transition-transform motion-safe:hover:-translate-y-0.5"
        >
          <ArrowDownIcon aria-hidden weight="bold" size={17} />
          See my work
        </a>
        <a
          href="#contact"
          className="inline-flex items-center rounded-full border border-line bg-card px-5 py-3 font-semibold transition-transform motion-safe:hover:-translate-y-0.5"
        >
          Get in touch
        </a>
        {SOCIALS.map(({ label, href, icon: SocialIcon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (opens in a new tab)`}
            className="grid size-12 place-items-center rounded-full border border-line bg-card transition-transform motion-safe:hover:-translate-y-0.5"
          >
            <SocialIcon aria-hidden weight="bold" size={19} />
          </a>
        ))}
      </m.div>
    </div>
  )
}

function PhotoCard() {
  return (
    <m.figure
      className="relative h-[23rem] overflow-hidden rounded-3xl bg-sky lg:h-auto lg:min-h-[21rem]"
      {...enter(0.1)}
    >
      <img
        src={profilePhoto}
        alt={intro.photoAlt}
        width={853}
        height={893}
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover object-[50%_18%]"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/45 to-transparent" />
      <a
        href="#contact"
        className="absolute top-4 left-4 inline-flex -rotate-6 items-center gap-1.5 rounded-full bg-coral px-3.5 py-2 text-sm font-semibold text-white shadow-lg transition-transform motion-safe:hover:rotate-0"
      >
        <HandWavingIcon aria-hidden weight="fill" size={16} />
        Say hello
      </a>
      <figcaption className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-2 text-[0.8rem] font-semibold backdrop-blur">
        <MapPinIcon aria-hidden weight="fill" size={15} className="text-coral" />
        {profile.location}
      </figcaption>
    </m.figure>
  )
}

function StatCard({ value, label, tone, icon: StatIcon }: { value: string; label: string; tone: Tone; icon: Icon }) {
  return (
    <div className={cn('flex flex-col justify-between gap-5 rounded-3xl p-5', TONE[tone].bg, TONE[tone].fg)}>
      <StatIcon aria-hidden weight="bold" size={20} />
      <p className="flex flex-col gap-1.5">
        <span className="text-[2.4rem] leading-none font-semibold tracking-[-0.04em] tabular-nums">{value}</span>
        <span className="text-[0.8rem] leading-snug opacity-85">{label}</span>
      </p>
    </div>
  )
}

function FocusCard() {
  return (
    <div className="bento-card flex flex-col gap-5 p-6 md:p-7 lg:col-span-2">
      <h2 className="text-sm font-medium text-muted">What I work on</h2>
      <ul className="grid gap-5 sm:grid-cols-3">
        {focusAreas.map(({ icon, title, detail }, index) => {
          const FocusIcon = FOCUS_ICONS[icon]
          return (
            <li key={title} className="flex gap-3.5 sm:flex-col sm:gap-3">
              <span className={cn('grid size-11 shrink-0 place-items-center rounded-2xl', FOCUS_TONES[index])}>
                <FocusIcon aria-hidden weight="bold" size={20} />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="font-semibold">{title}</span>
                <span className="text-sm text-pretty text-muted">{detail}</span>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function EducationCard() {
  const [university, bangkit] = timeline
  const entries = [
    { icon: GraduationCapIcon, period: university.period, title: 'Informatics Engineering', detail: university.org },
    { icon: CloudIcon, period: bangkit.period, title: bangkit.org, detail: 'Cloud computing cohort' },
  ]

  return (
    <div className="bento-card flex flex-col gap-5 p-6 md:p-7">
      <h2 className="text-sm font-medium text-muted">Education</h2>
      <ul className="flex flex-col gap-4">
        {entries.map(({ icon: EntryIcon, period, title, detail }) => (
          <li key={title} className="flex gap-3.5">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-bg">
              <EntryIcon aria-hidden weight="bold" size={20} />
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-[0.8rem] font-medium text-muted">{period}</span>
              <span className="font-semibold">{title}</span>
              <span className="text-sm text-muted">{detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Intro() {
  const [f1, reps] = highlightStats

  return (
    <section id="home" aria-label="Introduction" className="px-3 pt-6 md:px-8 md:pt-10">
      <div className="mx-auto flex max-w-[71rem] flex-col gap-4">
        <div className="grid gap-4 lg:grid-cols-3">
          <HelloCard />
          <PhotoCard />
          <m.div className="grid grid-cols-2 gap-4" {...enter(0.2)}>
            <StatCard value={f1.value} label={f1.label} tone={f1.tone} icon={TargetIcon} />
            <StatCard value={reps.value} label={reps.label} tone={reps.tone} icon={PulseIcon} />
          </m.div>
        </div>
        <Reveal className="grid gap-4 lg:grid-cols-3">
          <FocusCard />
          <EducationCard />
        </Reveal>
      </div>
    </section>
  )
}

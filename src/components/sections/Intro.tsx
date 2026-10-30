import {
  ArrowDownIcon,
  ArrowRightIcon,
  CameraIcon,
  CaretDownIcon,
  CheckIcon,
  DownloadSimpleIcon,
  GithubLogoIcon,
  LightningIcon,
  LinkedinLogoIcon,
  type Icon,
} from '@phosphor-icons/react'
import { m } from 'motion/react'
import { intro, profile } from '../../data/profile'
import { headline, highlightStats, pipelineSteps, terminalLines } from '../../data/showcase'
import { cn } from '../../lib/cn'
import { EASE_OUT } from '../../lib/motion'

const CHIP_ICONS: Record<'camera' | 'lightning' | 'arrow', Icon> = {
  camera: CameraIcon,
  lightning: LightningIcon,
  arrow: ArrowDownIcon,
}

const CHIP_STYLE: Record<'coral' | 'blue' | 'navy', string> = {
  coral: 'bg-coral-soft text-coral',
  blue: 'bg-blue-soft text-blue',
  navy: 'bg-navy text-white',
}

const TERMINAL_TONE: Record<(typeof terminalLines)[number]['tone'], string> = {
  prompt: 'text-white/70',
  info: 'text-sky',
  pose: 'text-[#c4b5fd]',
  model: 'text-[#ffb08a]',
  ok: 'text-mint',
}

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE_OUT },
})

const SOCIALS = [
  { label: 'GitHub', href: profile.links.github, icon: GithubLogoIcon },
  { label: 'LinkedIn', href: profile.links.linkedin, icon: LinkedinLogoIcon },
]

function Headline() {
  const sentence = headline.parts.map(({ text }) => text).join(' ')
  return (
    <h1
      aria-label={sentence}
      className="flex flex-wrap items-center gap-x-3 gap-y-2.5 text-[clamp(2.4rem,5.4vw,4.1rem)] leading-[1.1] font-bold tracking-[-0.035em]"
    >
      {headline.parts.map(({ text, chip }) => {
        if (!chip) return <span key={text}>{text}</span>
        const ChipIcon = CHIP_ICONS[chip.icon]
        return (
          <span
            key={text}
            aria-hidden
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg border-[1.5px] border-ink px-2.5 py-1 font-mono text-[0.5em] font-bold tracking-[-0.03em] shadow-hard',
              CHIP_STYLE[chip.tone],
            )}
          >
            <ChipIcon aria-hidden weight="bold" className="size-[0.85em]" />
            {text}
          </span>
        )
      })}
    </h1>
  )
}

function StatBox({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="bento-card flex flex-col gap-1 p-3.5">
      <span className={cn('font-display text-[1.7rem] leading-none font-bold tracking-[-0.03em] tabular-nums', color)}>
        {value}
      </span>
      <span className="font-mono text-[0.68rem] leading-snug text-muted">{label}</span>
    </div>
  )
}

function PipelineCard() {
  return (
    <div className="bento-card p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-mono text-[0.75rem] font-bold tracking-[0.06em] uppercase">
          <span aria-hidden className="size-2 rounded-full bg-blue" />
          Production AI pipeline
        </h2>
        <span className="rounded-md border border-[#16a34a]/40 bg-[#dcfce7] px-2 py-0.5 font-mono text-[0.68rem] font-semibold text-[#15803d]">
          Active engine
        </span>
      </div>
      <ol aria-label="Pipeline steps" className="mt-4 flex flex-col gap-2.5">
        {pipelineSteps.map(({ title, detail }, index) => {
          const isActive = index === 1
          const isLast = index === pipelineSteps.length - 1
          return (
            <li
              key={title}
              className={cn(
                'flex items-center gap-3 rounded-lg border p-3',
                isActive ? 'border-blue/50 bg-blue-soft' : 'border-line bg-card',
              )}
            >
              <span
                className={cn(
                  'grid size-8 shrink-0 place-items-center rounded-md font-mono text-xs font-bold',
                  isActive ? 'bg-blue text-white' : index === 0 ? 'bg-blue-soft text-blue' : 'bg-coral-soft text-coral',
                )}
              >
                0{index + 1}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="font-mono text-[0.8rem] font-bold">{title}</span>
                <span className="text-[0.75rem] text-muted">{detail}</span>
              </span>
              {isLast ? (
                <CheckIcon aria-hidden weight="bold" size={15} className="text-[#16a34a]" />
              ) : (
                <ArrowRightIcon aria-hidden weight="bold" size={14} className="text-muted" />
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function TerminalCard() {
  return (
    <figure
      aria-label="Rep Counter terminal output"
      className="overflow-hidden rounded-[14px] border-[1.5px] border-ink bg-terminal font-mono text-[0.75rem] shadow-hard"
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="flex items-center gap-3">
          <span aria-hidden className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="text-white/70">rep_counter.py</span>
        </span>
        <span className="text-[0.68rem] font-semibold text-mint">LIVE // in-browser</span>
      </div>
      <div className="flex flex-col gap-1.5 px-4 py-4 leading-relaxed">
        {terminalLines.map(({ tone, text }) => (
          <p key={text} className={TERMINAL_TONE[tone]}>
            {text}
          </p>
        ))}
        <span aria-hidden className="h-3.5 w-2 bg-white/80 motion-safe:animate-blink" />
      </div>
    </figure>
  )
}

export function Intro() {
  return (
    <section id="home" aria-label="Introduction" className="px-3 pt-8 md:px-8 md:pt-14">
      <div className="mx-auto grid max-w-[71rem] items-start gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-10">
        <m.div className="flex flex-col gap-6" {...enter(0)}>
          <p className="inline-flex w-fit items-center gap-2 rounded-md border-[1.5px] border-ink bg-card px-3 py-1.5 font-mono text-[0.72rem] font-semibold shadow-hard-sm">
            <span aria-hidden className="size-2 rounded-full bg-coral" />
            {intro.label}
          </p>
          <Headline />
          <p className="max-w-xl text-[1.05rem] leading-relaxed text-pretty text-muted">{intro.summary}</p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="press inline-flex items-center gap-2 rounded-lg bg-blue px-5 py-3 font-mono text-sm font-bold text-white"
            >
              See my work
              <CaretDownIcon aria-hidden weight="bold" size={15} />
            </a>
            <a
              href={profile.cv.href}
              download={profile.cv.fileName}
              className="press inline-flex items-center gap-2 rounded-lg bg-navy px-4 py-3 font-mono text-sm font-bold text-white"
            >
              <DownloadSimpleIcon aria-hidden weight="bold" size={16} />
              Download CV
            </a>
            {SOCIALS.map(({ label, href, icon: SocialIcon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in a new tab)`}
                className="press inline-flex items-center gap-2 rounded-lg bg-card px-4 py-3 font-mono text-sm font-bold"
              >
                <SocialIcon aria-hidden weight="bold" size={16} />
                {label}
              </a>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
            {highlightStats.map((stat) => (
              <StatBox key={stat.value} {...stat} />
            ))}
          </div>
        </m.div>

        <m.div className="flex flex-col gap-5 lg:pt-4" {...enter(0.15)}>
          <PipelineCard />
          <TerminalCard />
        </m.div>
      </div>
    </section>
  )
}

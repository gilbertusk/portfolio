import type { Icon } from '@phosphor-icons/react'
import type { Tone } from '../../data/showcase'
import { cn } from '../../lib/cn'
import { TONE } from '../../lib/tone'

interface SectionTitleProps {
  id: string
  before: string
  after: string
  icon: Icon
  tone: Tone
  blurb?: string
}

/** "Selected [chip] work": a heading with a decorative icon chip in the middle. */
export function SectionTitle({ id, before, after, icon: ChipIcon, tone, blurb }: SectionTitleProps) {
  return (
    <div className="flex flex-col gap-3 px-1 md:flex-row md:items-end md:justify-between">
      <h2
        id={id}
        aria-label={`${before} ${after}`}
        className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[1.9rem] font-semibold tracking-[-0.03em] md:text-[2.5rem]"
      >
        {before}{' '}
        <span
          aria-hidden
          className={cn(
            'inline-grid h-8 w-13 place-items-center rounded-full md:h-10 md:w-17',
            TONE[tone].bg,
            TONE[tone].fg,
          )}
        >
          <ChipIcon weight="bold" className="size-4 md:size-5" />
        </span>{' '}
        {after}
      </h2>
      {blurb && <p className="max-w-sm text-pretty text-muted md:text-right">{blurb}</p>}
    </div>
  )
}

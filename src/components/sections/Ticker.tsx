import { PauseIcon, PlayIcon, SparkleIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { skillTicker } from '../../data/showcase'
import { cn } from '../../lib/cn'

function TickerRow({ isClone }: { isClone?: boolean }) {
  return (
    <ul aria-hidden={isClone || undefined} className="flex shrink-0 items-center gap-6 pr-6">
      {skillTicker.map((skill) => (
        <li key={skill} className="flex items-center gap-6">
          <span className="font-mono text-[0.85rem] font-bold tracking-[0.04em] whitespace-nowrap uppercase md:text-[0.95rem]">
            {skill}
          </span>
          <SparkleIcon aria-hidden weight="fill" className="size-4" />
        </li>
      ))}
    </ul>
  )
}

/**
 * An orange band of skills that scrolls sideways. It pauses on hover, via its
 * button (keyboard and touch), and stays static for reduced-motion users.
 */
export function Ticker() {
  const [isPaused, setIsPaused] = useState(false)
  const ToggleIcon = isPaused ? PlayIcon : PauseIcon

  return (
    <section aria-label="Skills" className="overflow-hidden py-10 md:py-14">
      <div className="relative border-y-[1.5px] border-ink bg-coral py-3.5 text-white">
        <div
          className={cn(
            'ticker-track motion-safe-only flex w-max animate-ticker',
            isPaused && '[animation-play-state:paused]',
          )}
        >
          <TickerRow />
          <TickerRow isClone />
        </div>
        <button
          type="button"
          onClick={() => setIsPaused((paused) => !paused)}
          aria-pressed={isPaused}
          aria-label={isPaused ? 'Play skills ticker' : 'Pause skills ticker'}
          className="absolute top-1/2 right-4 grid size-8 -translate-y-1/2 place-items-center rounded-md border-[1.5px] border-ink bg-white text-ink motion-reduce:hidden md:right-8"
        >
          <ToggleIcon aria-hidden weight="fill" size={15} />
        </button>
      </div>
    </section>
  )
}

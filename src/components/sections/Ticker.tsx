import { AsteriskIcon, PauseIcon, PlayIcon } from '@phosphor-icons/react'
import { useState } from 'react'
import { skillTicker } from '../../data/showcase'
import { cn } from '../../lib/cn'

function TickerRow({ isClone }: { isClone?: boolean }) {
  return (
    <ul aria-hidden={isClone || undefined} className="flex shrink-0 items-center gap-7 pr-7">
      {skillTicker.map((skill) => (
        <li key={skill} className="flex items-center gap-7">
          <span className="text-[1.35rem] font-semibold tracking-[-0.02em] whitespace-nowrap md:text-[1.9rem]">
            {skill}
          </span>
          <AsteriskIcon aria-hidden weight="bold" className="size-5 md:size-7" />
        </li>
      ))}
    </ul>
  )
}

/**
 * A tilted coral band of skills that scrolls sideways. It pauses on hover, via
 * its button (keyboard and touch), and stays static for reduced-motion users.
 */
export function Ticker() {
  const [isPaused, setIsPaused] = useState(false)
  const ToggleIcon = isPaused ? PlayIcon : PauseIcon

  return (
    <section aria-label="Skills" className="overflow-hidden py-9 md:py-12">
      <div className="relative -mx-4 -rotate-[1.5deg] bg-coral py-4 text-ink md:py-5">
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
          className="absolute top-1/2 right-6 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-ink shadow-sm motion-reduce:hidden md:right-10"
        >
          <ToggleIcon aria-hidden weight="fill" size={15} />
        </button>
      </div>
    </section>
  )
}

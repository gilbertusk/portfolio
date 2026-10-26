import { ArrowUpRightIcon } from '@phosphor-icons/react'
import profileImage from '../../assets/profile.webp'
import { profile } from '../../data/profile'

const PHOTO_ALT = 'Portrait of Gilbertus Kristo with arms crossed, in front of a grey concrete wall'

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="hero-pattern">
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-5 pt-16 pb-20 md:grid-cols-12 md:px-8 md:pt-24 md:pb-24">
        <div className="md:col-span-7">
          <p className="flex items-center gap-3 font-mono text-[0.7rem] tracking-wide text-muted uppercase">
            <span aria-hidden className="h-px w-7 bg-ink" />
            {profile.role}
          </p>
          <h1
            id="hero-heading"
            className="mt-9 text-[clamp(3.2rem,12vw,7rem)] leading-[0.9] font-medium tracking-[-0.09em]"
          >
            Gilbertus
            <br />
            Kristo.
          </h1>
          <p className="mt-9 max-w-[27rem] border-l-2 border-ink pl-4 text-base leading-relaxed text-muted md:text-lg">
            I build computer vision, OCR, and backend tools that make everyday work easier.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-subtle">
            <span>{profile.location}</span>
            <span>{profile.availability}</span>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href="#work"
              className="inline-flex min-w-44 items-center justify-between gap-6 bg-ink px-5 py-3.5 text-sm font-semibold text-surface transition-colors hover:bg-muted"
            >
              View my work
              <ArrowUpRightIcon aria-hidden size={17} />
            </a>
            <a href="#about" className="border-b border-ink pb-1 text-sm font-medium hover:text-muted">
              About me <ArrowUpRightIcon aria-hidden className="inline" size={14} />
            </a>
          </div>
        </div>

        <div className="relative flex min-h-[22rem] items-center justify-center md:col-span-5 md:min-h-[28rem]">
          <div aria-hidden className="photo-hatch absolute top-1 right-0 h-[62%] w-[38%]" />
          <figure className="relative mr-7 w-[80%] max-w-[21rem] border border-ink bg-surface md:mr-8 md:w-[86%]">
            <img
              src={profileImage}
              alt={PHOTO_ALT}
              width={853}
              height={893}
              fetchPriority="high"
              className="aspect-[4/5] w-full object-cover object-top"
            />
            <figcaption className="absolute bottom-0 left-0 border-t border-r border-ink bg-canvas px-3 py-2 font-mono text-[0.62rem] tracking-wide uppercase">
              Person behind the work / 01
            </figcaption>
          </figure>
          <span aria-hidden className="absolute top-4 right-0 font-mono text-[0.62rem] tracking-wide text-subtle [writing-mode:vertical-rl]">
            VISION · OCR · SYSTEMS
          </span>
        </div>
      </div>
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 border-t border-line px-5 pb-8 sm:grid-cols-3 md:px-8">
        <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-3 border-b border-line py-4 sm:border-r sm:border-b-0 sm:pr-6">
          <span className="font-mono text-2xl font-medium tracking-tight tabular-nums md:text-3xl">22</span>
          <span className="text-sm text-muted">exercises recognized<br /><span className="text-xs text-subtle">Rep Counter</span></span>
        </div>
        <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-3 border-b border-line py-4 sm:border-r sm:border-b-0 sm:px-6">
          <span className="font-mono text-2xl font-medium tracking-tight tabular-nums md:text-3xl">0.939</span>
          <span className="text-sm text-muted">macro-F1 score<br /><span className="text-xs text-subtle">Pilah · 1,836 test images</span></span>
        </div>
        <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-3 py-4 sm:pl-6">
          <span className="font-mono text-2xl font-medium tracking-tight tabular-nums md:text-3xl">0</span>
          <span className="text-sm text-muted">video frames sent to server<br /><span className="text-xs text-subtle">Rep Counter runs in browser</span></span>
        </div>
      </div>
    </section>
  )
}

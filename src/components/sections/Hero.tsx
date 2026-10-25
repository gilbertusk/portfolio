import { ArrowUpRightIcon } from '@phosphor-icons/react'
import profileImage from '../../assets/profile.webp'

const PHOTO_ALT = 'Portrait of Gilbertus Kristo with arms crossed, in front of a grey concrete wall'

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="hero-pattern">
      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-5 pt-16 pb-20 md:grid-cols-12 md:px-8 md:pt-24 md:pb-24">
        <div className="md:col-span-7">
          <p className="flex items-center gap-3 font-mono text-[0.7rem] tracking-wide text-muted uppercase">
            <span aria-hidden className="h-px w-7 bg-ink" />
            AI engineer / builder
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
    </section>
  )
}

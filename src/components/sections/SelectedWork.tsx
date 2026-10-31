import { ArrowLeftIcon, ArrowRightIcon } from '@phosphor-icons/react'
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { getProject } from '../../data/projects'
import { featured } from '../../data/showcase'
import { Reveal } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'
import { AlsoBuilt } from './AlsoBuilt'
import { ProjectCard } from './ProjectCard'

export function SelectedWork() {
  const trackRef = useRef<HTMLUListElement>(null)
  const slideRefs = useRef<(HTMLLIElement | null)[]>([])
  const frameRef = useRef<number | null>(null)
  const dragRef = useRef({ active: false, moved: false, pointerId: -1, startX: 0, startScrollLeft: 0 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollBack, setCanScrollBack] = useState(false)
  const [canScrollForward, setCanScrollForward] = useState(false)

  const updateCarousel = useCallback(() => {
    const track = trackRef.current
    if (!track) return

    const trackCenter = track.scrollLeft + track.clientWidth / 2
    let nearestIndex = 0
    let nearestDistance = Number.POSITIVE_INFINITY

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2
      const distanceInSlides = (slideCenter - trackCenter) / Math.max(slide.offsetWidth, 1)
      const clampedDistance = Math.max(-1.25, Math.min(1.25, distanceInSlides))
      const absoluteDistance = Math.abs(clampedDistance)
      const distanceFromCenter = Math.abs(slideCenter - trackCenter)

      if (distanceFromCenter < nearestDistance) {
        nearestDistance = distanceFromCenter
        nearestIndex = index
      }

      slide.style.setProperty('--slide-rotate', `${clampedDistance * -11}deg`)
      slide.style.setProperty('--slide-scale', `${1 - Math.min(absoluteDistance, 1) * 0.07}`)
      slide.style.setProperty('--slide-depth', `${Math.min(absoluteDistance, 1) * -72}px`)
      slide.style.setProperty('--slide-rise', `${Math.min(absoluteDistance, 1) * 10}px`)
      slide.style.setProperty('--slide-opacity', `${1 - Math.min(absoluteDistance, 1) * 0.2}`)
    })

    setActiveIndex(nearestIndex)
    setCanScrollBack(track.scrollLeft > 2)
    setCanScrollForward(track.scrollLeft < track.scrollWidth - track.clientWidth - 2)
  }, [])

  const scheduleCarouselUpdate = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      updateCarousel()
      frameRef.current = null
    })
  }, [updateCarousel])

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const track = trackRef.current
    const slide = slideRefs.current[index]
    if (!track || !slide) return

    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2,
      behavior,
    })
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    updateCarousel()
    track.addEventListener('scroll', scheduleCarouselUpdate, { passive: true })
    const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(scheduleCarouselUpdate)
    resizeObserver?.observe(track)
    window.addEventListener('resize', scheduleCarouselUpdate)

    return () => {
      track.removeEventListener('scroll', scheduleCarouselUpdate)
      resizeObserver?.disconnect()
      window.removeEventListener('resize', scheduleCarouselUpdate)
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [scheduleCarouselUpdate, updateCarousel])

  function handlePointerDown(event: ReactPointerEvent<HTMLUListElement>) {
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    if ((event.target as Element).closest('a, button')) return
    const track = trackRef.current
    if (!track) return

    dragRef.current = {
      active: true,
      moved: false,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: track.scrollLeft,
    }
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLUListElement>) {
    const track = trackRef.current
    const drag = dragRef.current
    if (!track || !drag.active || drag.pointerId !== event.pointerId) return

    const delta = event.clientX - drag.startX
    if (Math.abs(delta) <= 5) return
    if (!drag.moved) {
      drag.moved = true
      track.dataset.dragging = 'true'
      track.setPointerCapture(event.pointerId)
    }
    track.scrollLeft = drag.startScrollLeft - delta
  }

  function finishPointerDrag(event: ReactPointerEvent<HTMLUListElement>) {
    const track = trackRef.current
    const drag = dragRef.current
    if (!track || !drag.active || drag.pointerId !== event.pointerId) return

    drag.active = false
    delete track.dataset.dragging
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId)
    if (drag.moved) updateCarousel()
  }

  return (
    <section id="work" aria-labelledby="work-heading" className="px-3 pt-16 pb-6 md:px-8 md:pt-24">
      <div className="mx-auto flex max-w-[71rem] flex-col gap-7">
        <SectionTitle
          id="work-heading"
          label="Production showcases"
          before="Selected"
          highlight="Work"
          blurb="Swipe through each build: interface, delivery flow, measured results, and stack included."
        />
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4 px-1">
            <div className="flex items-center gap-3">
              <p aria-live="polite" className="font-mono text-xs font-bold text-ink tabular-nums">
                {String(activeIndex + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}
              </p>
              <span className="hidden text-xs text-muted sm:inline">Drag, swipe, or use the arrows</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Previous project"
                disabled={!canScrollBack}
                onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
                className="press grid size-10 place-items-center rounded-lg bg-card transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ArrowLeftIcon aria-hidden weight="bold" size={18} />
              </button>
              <button
                type="button"
                aria-label="Next project"
                disabled={!canScrollForward}
                onClick={() => scrollToIndex(Math.min(featured.length - 1, activeIndex + 1))}
                className="press grid size-10 place-items-center rounded-lg bg-blue text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ArrowRightIcon aria-hidden weight="bold" size={18} />
              </button>
            </div>
          </div>

          <div className="relative -mx-3 overflow-hidden py-1 md:-mx-8">
            <ul
              ref={trackRef}
              aria-label="Selected projects"
              className="project-carousel-track flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto py-6 md:gap-5"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={finishPointerDrag}
              onPointerCancel={finishPointerDrag}
              onClickCapture={(event) => {
                if (dragRef.current.moved) {
                  event.preventDefault()
                  event.stopPropagation()
                  dragRef.current.moved = false
                  return
                }
                if ((event.target as Element).closest('a')) return
                const slide = (event.target as Element).closest<HTMLElement>('[data-slide-index]')
                if (slide) scrollToIndex(Number(slide.dataset.slideIndex))
              }}
            >
            {featured.map((entry, index) => (
              <li
                ref={(node) => { slideRefs.current[index] = node }}
                key={entry.id}
                data-slide-index={index}
                aria-current={index === activeIndex ? 'true' : undefined}
                className="project-carousel-slide shrink-0 snap-center"
              >
                <Reveal className="h-full" delay={(index % 3) * 0.06}>
                  <div className="project-carousel-card h-full">
                    <ProjectCard project={getProject(entry.id)} entry={entry} />
                  </div>
                </Reveal>
              </li>
            ))}
            </ul>
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 hidden w-8 bg-linear-to-r from-bg to-transparent sm:block md:w-16" />
            <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-8 bg-linear-to-l from-bg to-transparent sm:block md:w-16" />
          </div>
          <Reveal>
            <AlsoBuilt />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

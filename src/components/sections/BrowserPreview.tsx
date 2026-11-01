import type { ProjectImage } from '../../data/types'
import type { Tone } from '../../data/showcase'
import { cn } from '../../lib/cn'
import { TONE } from '../../lib/tone'

interface BrowserPreviewProps {
  tone: Tone
  address: string
  image?: ProjectImage
}

/** A browser window peeking up from a tinted stage, showing the project's screenshot. */
export function BrowserPreview({ tone, address, image }: BrowserPreviewProps) {
  return (
    <div className={cn('flex h-44 items-end overflow-hidden rounded-[10px] border-[1.5px] border-ink px-4 pt-4 xl:h-40', TONE[tone].bg)}>
      <div className="flex h-full w-full flex-col overflow-hidden rounded-t-[0.5rem] border-[1.5px] border-b-0 border-ink bg-white transition-transform duration-500 ease-out motion-safe:group-hover:-translate-y-1.5">
        <div aria-hidden className="flex h-[1.875rem] shrink-0 items-center gap-2.5 bg-toolbar px-3">
          <span className="flex gap-1.5">
            <span className="size-2 rounded-full bg-coral" />
            <span className="size-2 rounded-full bg-lavender" />
            <span className="size-2 rounded-full bg-sky" />
          </span>
          <span className="truncate rounded-md bg-white px-2 py-0.5 text-[0.7rem] font-medium text-muted">{address}</span>
        </div>
        {image && (
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
            className="min-h-0 w-full flex-1 object-cover object-top"
          />
        )}
      </div>
    </div>
  )
}

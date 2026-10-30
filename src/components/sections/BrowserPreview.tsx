import { CameraIcon, CheckCircleIcon, FileMagnifyingGlassIcon, ScanIcon, type Icon } from '@phosphor-icons/react'
import type { ProjectImage } from '../../data/types'
import { labelGuardSteps, type Tone } from '../../data/showcase'
import { cn } from '../../lib/cn'
import { TONE } from '../../lib/tone'

const STEP_ICONS: Icon[] = [CameraIcon, ScanIcon, FileMagnifyingGlassIcon, CheckCircleIcon]

function InspectionFlow() {
  return (
    <ol aria-label="LabelGuard inspection flow" className="flex flex-col px-4 pt-3 md:px-5">
      {labelGuardSteps.map((step, index) => {
        const StepIcon = STEP_ICONS[index]
        const isLast = index === labelGuardSteps.length - 1
        return (
          <li key={step} className={cn('flex items-center gap-3 py-2.5', index > 0 && 'border-t border-line')}>
            <span
              className={cn('grid size-8 shrink-0 place-items-center rounded-lg', isLast ? 'bg-blue text-white' : 'bg-bg')}
            >
              <StepIcon aria-hidden weight="bold" size={16} />
            </span>
            <span className="flex-1 text-sm font-medium">{step}</span>
            <span className="text-xs font-medium text-muted tabular-nums">0{index + 1}</span>
          </li>
        )
      })}
    </ol>
  )
}

interface BrowserPreviewProps {
  tone: Tone
  address: string
  image?: ProjectImage
}

/** A browser window peeking up from a tinted stage. Images get a flow diagram fallback. */
export function BrowserPreview({ tone, address, image }: BrowserPreviewProps) {
  return (
    <div className={cn('flex h-56 items-end overflow-hidden rounded-[10px] border-[1.5px] border-ink px-6 pt-6 md:h-[18.75rem] md:px-9 md:pt-7', TONE[tone].bg)}>
      <div className="flex h-full w-full flex-col overflow-hidden rounded-t-[0.5rem] border-[1.5px] border-b-0 border-ink bg-white transition-transform duration-500 ease-out motion-safe:group-hover:-translate-y-1.5">
        <div aria-hidden className="flex h-[1.875rem] shrink-0 items-center gap-2.5 bg-toolbar px-3">
          <span className="flex gap-1.5">
            <span className="size-2 rounded-full bg-coral" />
            <span className="size-2 rounded-full bg-lavender" />
            <span className="size-2 rounded-full bg-sky" />
          </span>
          <span className="truncate rounded-md bg-white px-2 py-0.5 text-[0.7rem] font-medium text-muted">{address}</span>
        </div>
        {image ? (
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            decoding="async"
            className="min-h-0 w-full flex-1 object-cover object-top"
          />
        ) : (
          <InspectionFlow />
        )}
      </div>
    </div>
  )
}

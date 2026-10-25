import {
  CameraIcon,
  ListChecksIcon,
  SealCheckIcon,
  SlidersHorizontalIcon,
  TextAaIcon,
  type Icon,
} from '@phosphor-icons/react'
import { m } from 'motion/react'
import { EASE_OUT } from '../../lib/motion'

const STEPS: Array<{ icon: Icon; label: string }> = [
  { icon: CameraIcon, label: 'Operator photographs the label' },
  { icon: SlidersHorizontalIcon, label: 'Sharp cleans up the image' },
  { icon: TextAaIcon, label: 'Tesseract.js reads the text' },
  { icon: ListChecksIcon, label: 'Each field is matched to the PO' },
  { icon: SealCheckIcon, label: 'Verified, failed, or sent to review' },
]

/** The LabelGuard flow, revealed step by step in the order it actually runs. */
export function LabelGuardPipeline() {
  return (
    <div className="border-b border-line bg-tint px-6 py-7 md:px-8">
      <p className="sr-only">How LabelGuard checks a label:</p>
      <div className="relative">
        <span aria-hidden className="absolute top-4 bottom-4 left-[17.5px] w-px bg-line" />
        <ol className="relative space-y-3.5">
        {STEPS.map(({ icon: StepIcon, label }, index) => (
          <m.li
            key={label}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: index * 0.12, ease: EASE_OUT }}
            className="relative flex items-center gap-3.5"
          >
            <span className="grid size-9 shrink-0 place-items-center border border-line bg-surface text-ink">
              <StepIcon aria-hidden size={18} />
            </span>
            <span className="text-sm font-medium">{label}</span>
          </m.li>
        ))}
        </ol>
      </div>
    </div>
  )
}

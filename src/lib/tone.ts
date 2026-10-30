import type { Tone } from '../data/showcase'

interface ToneClasses {
  /** Background of the tinted surface. */
  bg: string
  /** Text and icon color that reads on that background. */
  fg: string
}

export const TONE: Record<Tone, ToneClasses> = {
  blue: { bg: 'bg-blue', fg: 'text-white' },
  coral: { bg: 'bg-coral', fg: 'text-white' },
  navy: { bg: 'bg-navy', fg: 'text-white' },
  sky: { bg: 'bg-sky', fg: 'text-ink' },
  lavender: { bg: 'bg-lavender', fg: 'text-ink' },
  'blue-soft': { bg: 'bg-blue-soft', fg: 'text-blue' },
  'coral-soft': { bg: 'bg-coral-soft', fg: 'text-coral' },
}

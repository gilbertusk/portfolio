import { ArrowUpIcon } from '@phosphor-icons/react'
import { profile } from '../../data/profile'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="px-3 md:px-8">
      <div className="mx-auto flex max-w-[71rem] items-center justify-between gap-4 px-2 py-8 text-sm font-medium text-muted">
        <p>
          © {CURRENT_YEAR} {profile.name}
        </p>
        <a href="#home" className="inline-flex items-center gap-1.5 transition-colors hover:text-ink">
          Back to top
          <ArrowUpIcon aria-hidden weight="bold" size={15} />
        </a>
      </div>
    </footer>
  )
}

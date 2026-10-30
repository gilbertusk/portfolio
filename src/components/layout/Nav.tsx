import { ArrowRightIcon, DownloadSimpleIcon, GithubLogoIcon, ListIcon, XIcon } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { navItems, profile } from '../../data/profile'

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuToggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setIsMenuOpen(false)
      // The focused menu link is about to unmount; keep keyboard users in place.
      menuToggleRef.current?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    // z-40: the only sticky layer on the page; the skip link sits above it at z-50.
    <header className="sticky top-0 z-40 px-3 pt-3 md:px-8 md:pt-4">
      <nav aria-label="Main" className="mx-auto max-w-[71rem]">
        <div className="flex items-center justify-between rounded-xl border-[1.5px] border-ink bg-white/95 py-2 pr-2 pl-2 shadow-hard backdrop-blur-md">
          <a href="#home" className="flex items-center gap-2.5 rounded-lg">
            <span
              aria-hidden
              className="grid size-10 place-items-center rounded-lg border-[1.5px] border-ink bg-blue font-display text-sm font-bold text-white"
            >
              {profile.initials}
            </span>
            <span className="flex flex-col">
              <span className="flex items-center gap-2">
                <span className="font-display font-bold tracking-tight">{profile.name}</span>
                <span className="hidden rounded border border-blue/30 bg-blue-soft px-1.5 py-0.5 font-mono text-[0.65rem] font-semibold text-blue sm:inline">
                  AI / CV Eng
                </span>
              </span>
              <span className="hidden items-center gap-1.5 font-mono text-[0.68rem] text-muted sm:flex">
                <span aria-hidden className="size-1.5 rounded-full bg-[#22a55b] motion-safe:animate-blink" />
                Available for freelance & roles
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {navItems
              .filter(({ href }) => href !== '#contact')
              .map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="font-mono text-[0.8rem] font-medium text-muted transition-colors hover:text-blue">
                    {label}
                  </a>
                </li>
              ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={profile.cv.href}
              download={profile.cv.fileName}
              className="press hidden h-10 items-center gap-1.5 rounded-lg bg-card px-3 font-mono text-[0.8rem] font-bold lg:inline-flex"
            >
              <DownloadSimpleIcon aria-hidden weight="bold" size={15} />
              CV
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub (opens in a new tab)"
              className="press hidden size-10 place-items-center rounded-lg bg-card sm:grid"
            >
              <GithubLogoIcon aria-hidden weight="bold" size={18} />
            </a>
            <a
              href="#contact"
              className="press hidden items-center gap-1.5 rounded-lg bg-blue px-4 py-2.5 font-mono text-[0.8rem] font-bold text-white sm:inline-flex"
            >
              Get in touch
              <ArrowRightIcon aria-hidden weight="bold" size={14} />
            </a>
            <button
              ref={menuToggleRef}
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="press grid size-10 place-items-center rounded-lg bg-card text-ink md:hidden"
            >
              {isMenuOpen ? <XIcon aria-hidden size={20} /> : <ListIcon aria-hidden size={20} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div id="mobile-menu" className="bento-card mt-2 p-2 md:hidden">
            <ul>
              {navItems.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={closeMenu}
                    className="block rounded-lg px-4 py-3 font-mono text-sm font-semibold hover:bg-blue-soft"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={profile.cv.href}
                  download={profile.cv.fileName}
                  onClick={closeMenu}
                  className="flex items-center gap-2 rounded-lg px-4 py-3 font-mono text-sm font-semibold hover:bg-blue-soft"
                >
                  <DownloadSimpleIcon aria-hidden weight="bold" size={15} />
                  Download CV
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}

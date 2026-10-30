import { EnvelopeSimpleIcon, ListIcon, XIcon } from '@phosphor-icons/react'
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
        <div className="flex items-center justify-between rounded-full border border-line bg-white/85 py-2 pr-2 pl-2.5 backdrop-blur-md">
          <a href="#home" className="flex items-center gap-2.5 rounded-full">
            <span
              aria-hidden
              className="grid size-9 place-items-center rounded-full bg-blue text-sm font-semibold text-white"
            >
              {profile.initials}
            </span>
            <span className="font-semibold tracking-tight">{profile.name}</span>
          </a>

          <ul className="hidden items-center gap-7 md:flex">
            {navItems
              .filter(({ href }) => href !== '#contact')
              .map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="text-sm font-medium text-muted transition-colors hover:text-ink">
                    {label}
                  </a>
                </li>
              ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <a
              href="#contact"
              className="hidden items-center gap-2 rounded-full bg-blue px-4 py-2.5 text-sm font-semibold text-white transition-transform motion-safe:hover:-translate-y-0.5 active:translate-y-0 sm:inline-flex"
            >
              <EnvelopeSimpleIcon aria-hidden weight="bold" size={16} />
              Get in touch
            </a>
            <button
              ref={menuToggleRef}
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="grid size-10 place-items-center rounded-full text-ink hover:bg-bg md:hidden"
            >
              {isMenuOpen ? <XIcon aria-hidden size={20} /> : <ListIcon aria-hidden size={20} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div id="mobile-menu" className="mt-2 rounded-3xl border border-line bg-white p-2 shadow-lg md:hidden">
            <ul>
              {navItems.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={closeMenu}
                    className="block rounded-2xl px-4 py-3 font-medium hover:bg-bg"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}

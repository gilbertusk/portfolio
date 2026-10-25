import { ArrowUpRightIcon, ListIcon, XIcon } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { navItems, profile } from '../../data/profile'
const LINK_CLASS =
  'px-2 py-2 text-sm text-muted underline-offset-4 transition-colors hover:text-ink hover:underline'

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
    <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-md">
      <nav aria-label="Main">
        <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between border-b border-ink px-5 md:px-8">
          <a href="#top" className="inline-flex items-center gap-3 font-semibold tracking-tight">
            <span aria-hidden className="grid size-8 place-items-center bg-ink text-[0.7rem] font-bold tracking-[-0.12em] text-surface">GK</span>
            <span>{profile.name}</span>
          </a>

          <div className="flex items-center gap-3 md:gap-6">
            <ul className="hidden items-center gap-4 md:flex">
              {navItems.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className={LINK_CLASS}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#contact" className="hidden items-center gap-1 border-b border-ink pb-1 text-sm font-medium md:inline-flex">
              Let&apos;s talk <ArrowUpRightIcon aria-hidden size={14} />
            </a>
            <button
              ref={menuToggleRef}
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="grid size-10 place-items-center text-ink md:hidden"
            >
              {isMenuOpen ? <XIcon aria-hidden size={20} /> : <ListIcon aria-hidden size={20} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div id="mobile-menu" className="border-b border-ink bg-canvas md:hidden">
            <ul className="mx-auto flex max-w-6xl flex-col px-3 py-3">
              {navItems.map(({ label, href }) => (
                <li key={href} className="border-b border-line last:border-0">
                  <a href={href} onClick={closeMenu} className={`${LINK_CLASS} block py-3 text-base`}>
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

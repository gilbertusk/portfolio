import { ArrowUpRightIcon, ListIcon, XIcon } from '@phosphor-icons/react'
import { useEffect, useRef, useState } from 'react'
import { navItems, profile } from '../../data/profile'
import { ThemeToggle } from '../ui/ThemeToggle'
const LINK_CLASS = 'site-nav-link'

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
      <header className="site-header">
        <nav aria-label="Main">
        <div className="site-nav-shell">
          <a href="#top" className="site-brand">
            <span aria-hidden>GK</span>
            <span>{profile.name}</span>
          </a>

          <div className="flex items-center gap-2 md:gap-5">
            <ul className="hidden items-center gap-4 md:flex">
              {navItems.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className={LINK_CLASS}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#contact" className="site-nav-cta hidden md:inline-flex">
              Let&apos;s talk <ArrowUpRightIcon aria-hidden size={14} />
            </a>
            <ThemeToggle />
            <button
              ref={menuToggleRef}
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="site-menu-toggle md:hidden"
            >
              {isMenuOpen ? <XIcon aria-hidden size={20} /> : <ListIcon aria-hidden size={20} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div id="mobile-menu" className="site-mobile-menu md:hidden">
            <ul>
              {navItems.map(({ label, href }) => (
                <li key={href} className="border-b border-line last:border-0">
                  <a href={href} onClick={closeMenu} className={`${LINK_CLASS} site-mobile-link`}>
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

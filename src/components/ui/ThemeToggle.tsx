import { MoonIcon, SunIcon } from '@phosphor-icons/react'
import { useState } from 'react'

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  let savedTheme: string | null = null
  try {
    savedTheme = localStorage.getItem('portfolio-theme')
  } catch {
    // Storage can be unavailable in privacy-restricted browsing contexts.
  }

  const theme: Theme = savedTheme === 'dark' || savedTheme === 'light'
    ? savedTheme
    : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

  document.documentElement.dataset.theme = theme
  return theme
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  const toggleTheme = () => {
    document.documentElement.dataset.theme = nextTheme
    setTheme(nextTheme)
    try {
      localStorage.setItem('portfolio-theme', nextTheme)
    } catch {
      // The current page still switches themes when storage is unavailable.
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
      className="grid size-10 place-items-center border border-line bg-surface text-ink transition-colors hover:bg-tint active:scale-[0.96]"
    >
      {theme === 'dark' ? <SunIcon aria-hidden size={18} /> : <MoonIcon aria-hidden size={18} />}
    </button>
  )
}

import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { ThemeToggle } from './ThemeToggle'

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-theme')
  })

  it('switches to dark mode and remembers the choice', () => {
    render(<ThemeToggle />)

    fireEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }))

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
    expect(localStorage.getItem('portfolio-theme')).toBe('dark')
    expect(screen.getByRole('button', { name: 'Switch to light mode' })).toBeInTheDocument()
  })

  it('switches back to light mode', () => {
    document.documentElement.dataset.theme = 'dark'
    localStorage.setItem('portfolio-theme', 'dark')
    render(<ThemeToggle />)

    fireEvent.click(screen.getByRole('button', { name: 'Switch to light mode' }))

    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
    expect(localStorage.getItem('portfolio-theme')).toBe('light')
  })
})

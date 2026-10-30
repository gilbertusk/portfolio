import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'
import { navItems } from './data/profile'

describe('App', () => {
  // The lazy chunk can take several seconds under a parallel, cold, coverage-instrumented run.
  it('swaps the lazy toolkit placeholder for the real section', { timeout: 20000 }, async () => {
    render(<App />)

    expect(await screen.findByRole('heading', { name: 'AI & automation' }, { timeout: 15000 })).toBeInTheDocument()
    expect(document.querySelectorAll('#toolkit')).toHaveLength(1)
  })

  it('has exactly one h1', () => {
    render(<App />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('gives every nav link a section to land on', () => {
    render(<App />)

    for (const { href } of navItems) {
      expect(document.querySelector(href), `missing target for ${href}`).not.toBeNull()
    }
  })

  it('opens every external link safely in a new tab', () => {
    render(<App />)
    const external = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="http"]'))

    expect(external.length).toBeGreaterThan(10)
    for (const link of external) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link.rel).toContain('noopener')
    }
  })

  it('gives every image alt text', () => {
    render(<App />)

    for (const image of Array.from(document.querySelectorAll('img'))) {
      expect(image.getAttribute('alt'), image.src).toBeTruthy()
    }
  })

  it('keeps copy free of em and en dashes', () => {
    render(<App />)

    expect(document.body.textContent).not.toMatch(/[–—]/)
  })
})

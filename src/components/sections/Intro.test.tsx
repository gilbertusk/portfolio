import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { highlightStats } from '../../data/showcase'
import { Intro } from './Intro'

describe('Intro', () => {
  it('introduces Gilbertus by name as the page heading', () => {
    render(<Intro />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveAccessibleName('Gilbertus Kristo')
    expect(screen.getByText('Hi, I’m')).toBeInTheDocument()
    expect(screen.getByText(/computer vision and LLM automation/)).toBeInTheDocument()
  })

  it('shows a portrait with location and an invitation to say hello', () => {
    render(<Intro />)

    const portrait = screen.getByRole('img', { name: /portrait of gilbertus kristo/i })
    expect(portrait).toHaveAttribute('fetchpriority', 'high')
    const figure = portrait.closest('figure') as HTMLElement
    expect(within(figure).getByText('Semarang, Indonesia')).toBeInTheDocument()
    expect(within(figure).getByRole('link', { name: /say hello/i })).toHaveAttribute('href', '#contact')
  })

  it('shows availability, highlight numbers, and both education entries', () => {
    render(<Intro />)

    expect(screen.getByText(/open to internships/i)).toBeInTheDocument()
    for (const { value } of highlightStats) {
      expect(screen.getByText(value)).toBeInTheDocument()
    }
    expect(screen.getByText('Universitas Negeri Semarang')).toBeInTheDocument()
    expect(screen.getByText('Bangkit Academy')).toBeInTheDocument()
  })

  it('opens social profiles safely in a new tab', () => {
    render(<Intro />)

    for (const name of ['GitHub (opens in a new tab)', 'LinkedIn (opens in a new tab)']) {
      const link = screen.getByRole('link', { name })
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })
})

import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { VISIBLE_CERTIFICATIONS, certifications } from '../../data/about'
import { About } from './About'

function certificationItems(): HTMLElement[] {
  return within(document.getElementById('certification-list') as HTMLElement).getAllByRole('listitem')
}

describe('About', () => {
  it('shows a visual summary beside the bio and labels the experience timeline', () => {
    render(<About />)

    expect(screen.getByRole('figure', { name: /ai build principles: measure, wire, and ship/i })).toBeInTheDocument()
    expect(screen.getByRole('list', { name: 'Experience timeline' })).toBeInTheDocument()
  })

  it('shows a short certification list that expands and collapses', () => {
    render(<About />)
    expect(certificationItems()).toHaveLength(VISIBLE_CERTIFICATIONS)

    const toggle = screen.getByRole('button', { name: `Show all ${certifications.length} certifications` })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(toggle)
    expect(certificationItems()).toHaveLength(certifications.length)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(screen.getByRole('button', { name: 'Show fewer' }))
    expect(certificationItems()).toHaveLength(VISIBLE_CERTIFICATIONS)
  })
})

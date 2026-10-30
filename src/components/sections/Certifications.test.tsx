import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { VISIBLE_CERTIFICATIONS, certifications } from '../../data/about'
import { Certifications } from './Certifications'

function badges(): HTMLElement[] {
  return within(document.getElementById('certification-list') as HTMLElement).getAllByRole('listitem')
}

describe('Certifications', () => {
  it('shows a short list that expands and collapses', () => {
    render(<Certifications />)
    expect(badges()).toHaveLength(VISIBLE_CERTIFICATIONS)

    const toggle = screen.getByRole('button', { name: `Show all ${certifications.length} certifications` })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(toggle)
    expect(badges()).toHaveLength(certifications.length)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    fireEvent.click(screen.getByRole('button', { name: 'Show fewer' }))
    expect(badges()).toHaveLength(VISIBLE_CERTIFICATIONS)
  })

  it('only offers a verify link when the issuer provides one', () => {
    render(<Certifications />)
    fireEvent.click(screen.getByRole('button', { name: /show all/i }))

    const verifiable = certifications.filter((cert) => cert.href)
    expect(screen.getAllByRole('link', { name: /^Verify / })).toHaveLength(verifiable.length)
    expect(screen.getAllByText('No public link')).toHaveLength(certifications.length - verifiable.length)
  })
})

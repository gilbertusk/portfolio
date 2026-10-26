import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Contact } from './Contact'

describe('Contact', () => {
  it('presents direct contact details alongside the visual contact panel', () => {
    render(<Contact />)

    expect(screen.getByRole('heading', { name: /have a process that should run itself/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /gilbertuskristo@gmail.com/i })).toHaveAttribute(
      'href',
      'mailto:gilbertuskristo@gmail.com',
    )
    expect(screen.getByText('Semarang, Indonesia')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'LinkedIn (opens in a new tab)' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'GitHub (opens in a new tab)' })).toBeInTheDocument()
  })
})

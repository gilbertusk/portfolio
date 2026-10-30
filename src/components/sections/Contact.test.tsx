import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Contact } from './Contact'

describe('Contact', () => {
  it('offers email, GitHub, and LinkedIn as direct contact cards', () => {
    render(<Contact />)

    expect(screen.getByRole('heading', { name: /have a workflow that should run on its own/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /gilbertuskristo@gmail.com/i })).toHaveAttribute(
      'href',
      'mailto:gilbertuskristo@gmail.com',
    )
    expect(screen.getByRole('link', { name: 'GitHub (opens in a new tab)' })).toHaveAttribute('target', '_blank')
    expect(screen.getByRole('link', { name: 'LinkedIn (opens in a new tab)' })).toHaveAttribute('target', '_blank')
    expect(screen.getByRole('button', { name: 'Copy email' })).toBeInTheDocument()
    expect(screen.getByText('Semarang, Indonesia')).toBeInTheDocument()
  })
})

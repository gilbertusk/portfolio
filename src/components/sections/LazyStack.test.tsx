import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { LazyStack } from './LazyStack'

// Simulates the lazy chunk failing (network error, or a stale deploy).
vi.mock('./Stack', () => ({
  default: () => {
    throw new Error('Failed to fetch dynamically imported module')
  },
}))

describe('LazyStack', () => {
  it('shows a contained notice instead of blanking the page when the section fails', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(<LazyStack />)

    expect(await screen.findByText(/This section didn’t load/)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Tools I reach for' })).toBeInTheDocument()
    expect(document.getElementById('toolkit')).not.toBeNull()
    consoleError.mockRestore()
  })
})

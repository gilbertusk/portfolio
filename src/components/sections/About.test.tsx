import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { timeline } from '../../data/about'
import { aboutFacts } from '../../data/showcase'
import { About } from './About'

describe('About', () => {
  it('pairs the bio with quick facts and an email action', () => {
    render(<About />)

    expect(screen.getByRole('heading', { level: 3, name: /closer to the model/ })).toBeInTheDocument()
    expect(within(screen.getByRole('list', { name: 'Quick facts' })).getAllByRole('listitem')).toHaveLength(
      aboutFacts.length,
    )
    expect(screen.getByRole('link', { name: /email me/i })).toHaveAttribute('href', 'mailto:gilbertuskristo@gmail.com')
  })

  it('shows every role on the experience timeline', () => {
    render(<About />)

    const list = screen.getByRole('list', { name: 'Experience timeline' })
    expect(within(list).getAllByRole('listitem')).toHaveLength(timeline.length)
    expect(screen.getByText(`${timeline.length} roles`)).toBeInTheDocument()
  })
})

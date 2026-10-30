import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Intro } from './Intro'

describe('Intro', () => {
  it('reads the icon headline as one sentence to assistive tech', () => {
    render(<Intro />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveAccessibleName(/^I turn data into models that ship\.$/)
  })

  it('shows role, location, and availability to recruiters', () => {
    render(<Intro />)

    expect(screen.getByText(/gilbertus kristo · ai engineer/i)).toBeInTheDocument()
    expect(screen.getByText(/semarang, indonesia/i)).toBeInTheDocument()
    expect(screen.getByText(/open to internships/i)).toBeInTheDocument()
  })

  it('lists the three workflow steps in order', () => {
    render(<Intro />)

    const steps = within(screen.getByRole('list', { name: 'Workflow steps' })).getAllByRole('listitem')
    expect(steps).toHaveLength(3)
    expect(steps[0]).toHaveTextContent(/^Data/)
    expect(steps[1]).toHaveTextContent(/^Model/)
    expect(steps[2]).toHaveTextContent(/^Workflow/)
  })
})

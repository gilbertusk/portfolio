import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { profile } from '../../data/profile'
import { highlightStats, pipelineSteps, terminalLines } from '../../data/showcase'
import { Intro } from './Intro'

describe('Intro', () => {
  it('reads the chip headline as one sentence and names Gilbertus up front', () => {
    render(<Intro />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveAccessibleName('I turn raw data into models that ship.')
    expect(screen.getByText(/Gilbertus Kristo \/\/ AI Engineer based in Semarang/)).toBeInTheDocument()
  })

  it('shows only real, sourced highlight numbers', () => {
    render(<Intro />)

    for (const { value, label } of highlightStats) {
      expect(screen.getByText(value)).toBeInTheDocument()
      expect(screen.getByText(label)).toBeInTheDocument()
    }
  })

  it('walks through the three pipeline steps in order', () => {
    render(<Intro />)

    const steps = within(screen.getByRole('list', { name: 'Pipeline steps' })).getAllByRole('listitem')
    expect(steps).toHaveLength(pipelineSteps.length)
    steps.forEach((step, index) => expect(step).toHaveTextContent(pipelineSteps[index].title))
  })

  it('prints every terminal line', () => {
    render(<Intro />)

    const terminal = screen.getByRole('figure', { name: 'Rep Counter terminal output' })
    for (const { text } of terminalLines) {
      expect(within(terminal).getByText(text)).toBeInTheDocument()
    }
  })

  it('offers the CV as a named download', () => {
    render(<Intro />)

    const cv = screen.getByRole('link', { name: 'Download CV' })
    expect(cv).toHaveAttribute('href', profile.cv.href)
    expect(cv).toHaveAttribute('download', profile.cv.fileName)
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

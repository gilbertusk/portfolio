import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { skillTicker } from '../../data/showcase'
import { Ticker } from './Ticker'

describe('Ticker', () => {
  it('exposes each skill once even though the loop duplicates the row', () => {
    render(<Ticker />)
    const region = screen.getByRole('region', { name: 'Skills' })

    expect(within(region).getAllByRole('listitem')).toHaveLength(skillTicker.length)
    expect(region.querySelectorAll('ul')).toHaveLength(2)
  })

  it('lets keyboard and touch users pause and resume the motion', () => {
    render(<Ticker />)

    const pause = screen.getByRole('button', { name: 'Pause skills ticker' })
    expect(pause).toHaveAttribute('aria-pressed', 'false')

    fireEvent.click(pause)
    const play = screen.getByRole('button', { name: 'Play skills ticker' })
    expect(play).toHaveAttribute('aria-pressed', 'true')

    fireEvent.click(play)
    expect(screen.getByRole('button', { name: 'Pause skills ticker' })).toBeInTheDocument()
  })
})

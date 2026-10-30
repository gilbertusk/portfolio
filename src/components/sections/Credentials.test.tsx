import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { specialization } from '../../data/showcase'
import { Credentials } from './Credentials'

describe('Credentials', () => {
  it('lists school, bootcamp, and focus as three cards', () => {
    render(<Credentials />)

    const items = within(screen.getByRole('region', { name: 'Education and focus' })).getAllByRole('listitem')
    expect(items).toHaveLength(3)
    expect(items[0]).toHaveTextContent('Universitas Negeri Semarang (UNNES)')
    expect(items[1]).toHaveTextContent('Bangkit Academy graduate')
    expect(items[2]).toHaveTextContent(specialization.title)
  })
})

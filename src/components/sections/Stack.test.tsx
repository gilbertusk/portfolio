import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { toolGroups } from '../../data/stack'
import Stack from './Stack'

describe('Stack', () => {
  it('renders every tool group with all of its tools', () => {
    render(<Stack />)

    for (const group of toolGroups) {
      expect(screen.getByRole('heading', { level: 3, name: group.title })).toBeInTheDocument()
      const list = screen.getByRole('list', { name: group.title })
      expect(within(list).getAllByRole('listitem')).toHaveLength(group.tools.length)
    }
  })

  it('draws a brand mark only for tools that have one', () => {
    render(<Stack />)
    const aiList = screen.getByRole('list', { name: 'AI & automation' })

    const n8n = within(aiList).getByText('n8n').closest('li') as HTMLElement
    const openAi = within(aiList).getByText('OpenAI API').closest('li') as HTMLElement

    expect(n8n.querySelector('svg')).not.toBeNull()
    expect(openAi.querySelector('svg')).toBeNull()
  })
})

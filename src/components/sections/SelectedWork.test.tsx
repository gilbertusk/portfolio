import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { allProjects } from '../../data/projects'
import { SelectedWork } from './SelectedWork'

describe('SelectedWork', () => {
  it('presents every project as one consistent, scrollable card collection', () => {
    render(<SelectedWork />)

    const carousel = screen.getByRole('list', { name: 'Project carousel' })
    expect(carousel).toHaveClass('project-carousel')
    expect(carousel.querySelectorAll('.project-card')).toHaveLength(allProjects.length)

    expect(screen.getByAltText(/Rep Counter recognizing a push-up/)).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /Rep Counter: Live demo/ })).toHaveLength(1)
    expect(screen.getAllByRole('link', { name: /KPI Job Desk System: Live site/ })).toHaveLength(1)
  })

  it('promotes the first link when a project has no live link', () => {
    render(<SelectedWork />)

    expect(screen.getByRole('link', { name: /LabelGuard AI: Source/ })).toHaveTextContent('Source')
    expect(screen.getByRole('link', { name: /Back-End Absensi: API docs/ })).toHaveTextContent('API docs')
    expect(screen.getByRole('link', { name: /Back-End Absensi: Source/ })).toHaveTextContent('')
    expect(screen.getAllByText('No public link')).toHaveLength(2)
    expect(screen.getByText('Private repo')).toBeInTheDocument()
  })
})

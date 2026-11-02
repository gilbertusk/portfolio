import { createEvent, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { getProject } from '../../data/projects'
import { alsoBuilt, featured } from '../../data/showcase'
import { SelectedWork } from './SelectedWork'

describe('SelectedWork', () => {
  it('shows every featured project as a compact card with detailed evidence', () => {
    render(<SelectedWork />)

    const grid = screen.getByRole('list', { name: 'Selected projects' })
    expect(within(grid).getAllByRole('article')).toHaveLength(featured.length)
    expect(screen.getByAltText(/Rep Counter recognizing a push-up/)).toBeInTheDocument()
    expect(screen.getByRole('list', { name: 'Rep Counter measured results' })).toHaveTextContent('0.822')
    expect(screen.getByRole('list', { name: 'Rep Counter measured results' })).toHaveTextContent('held-out videos')
    expect(screen.getByRole('list', { name: 'Rep Counter delivery flow' })).toHaveTextContent('MediaPipe + 1D-CNN')
    expect(screen.getByRole('button', { name: 'Previous project' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next project' })).toBeInTheDocument()
    expect(within(grid).getAllByRole('listitem', { current: true })).toHaveLength(1)
  })

  it('derives arrow availability from the real scroll bounds', async () => {
    render(<SelectedWork />)

    const track = screen.getByRole('list', { name: 'Selected projects' })
    Object.defineProperties(track, {
      clientWidth: { configurable: true, value: 500 },
      scrollWidth: { configurable: true, value: 1_500 },
      scrollLeft: { configurable: true, writable: true, value: 0 },
    })
    fireEvent.scroll(track)

    const previous = screen.getByRole('button', { name: 'Previous project' })
    const next = screen.getByRole('button', { name: 'Next project' })
    await waitFor(() => expect(next).toBeEnabled())
    expect(previous).toBeDisabled()

    Object.defineProperty(track, 'scrollLeft', { configurable: true, writable: true, value: 1_000 })
    fireEvent.scroll(track)

    await waitFor(() => expect(previous).toBeEnabled())
    expect(next).toBeDisabled()
  })

  it('keeps project links clickable while reserving pointer capture for a real drag', () => {
    render(<SelectedWork />)

    const track = screen.getByRole('list', { name: 'Selected projects' })
    const demo = screen.getByRole('link', { name: 'Rep Counter: Live demo (opens in a new tab)' })
    const setPointerCapture = vi.fn()
    Object.defineProperty(track, 'setPointerCapture', { configurable: true, value: setPointerCapture })

    fireEvent.pointerDown(demo, { pointerType: 'mouse', button: 0, pointerId: 1, clientX: 100 })
    expect(setPointerCapture).not.toHaveBeenCalled()

    const click = createEvent.click(demo)
    fireEvent(demo, click)
    expect(click.defaultPrevented).toBe(false)

    fireEvent.pointerDown(track, { pointerType: 'mouse', button: 0, pointerId: 2, clientX: 100 })
    fireEvent.pointerMove(track, { pointerType: 'mouse', pointerId: 2, clientX: 97 })
    expect(setPointerCapture).not.toHaveBeenCalled()

    fireEvent.pointerMove(track, { pointerType: 'mouse', pointerId: 2, clientX: 80 })
    expect(setPointerCapture).toHaveBeenCalledWith(2)
  })

  it('explains every project and names its tech stack', () => {
    render(<SelectedWork />)

    for (const { id } of [...featured, ...alsoBuilt]) {
      const project = getProject(id)
      expect(screen.getByText(project.summary)).toBeInTheDocument()
      const stack = screen.getByRole('list', { name: `${project.title} tech stack` })
      expect(within(stack).getAllByRole('listitem')).toHaveLength(project.stack.length)
    }
  })

  it('labels project links with their project and new-tab behavior', () => {
    render(<SelectedWork />)

    expect(screen.getByRole('link', { name: 'Rep Counter: Live demo (opens in a new tab)' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'G Pos: 30s walkthrough (opens in a new tab)' })).toHaveAttribute('href', '/demo/g-pos-walkthrough.mp4')
    expect(screen.getByRole('link', { name: 'Back-End Absensi: API docs (opens in a new tab)' })).toBeInTheDocument()
  })

  it('lists the smaller builds with honest link states', () => {
    render(<SelectedWork />)

    const also = screen.getByRole('list', { name: 'Also built' })
    // One intro tile plus one tile per project.
    // Direct children only: each tile also holds a nested tech stack list.
    const tiles = within(also).getAllByRole('listitem').filter((item) => item.parentElement === also)
    expect(tiles).toHaveLength(alsoBuilt.length + 1)
    expect(screen.getByRole('link', { name: 'KPI Job Desk System: Live site (opens in a new tab)' })).toBeInTheDocument()
    expect(within(also).getByText('Code is private')).toBeInTheDocument()
    expect(within(also).getAllByText('No public link')).toHaveLength(2)
  })
})

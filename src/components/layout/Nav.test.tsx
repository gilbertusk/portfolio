import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { navItems } from '../../data/profile'
import { Nav } from './Nav'

describe('Nav', () => {
  it('opens and closes the mobile menu', () => {
    render(<Nav />)
    const toggle = screen.getByRole('button', { name: 'Open menu' })

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(document.getElementById('mobile-menu')).toBeNull()

    fireEvent.click(toggle)

    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(toggle).toHaveAccessibleName('Close menu')
    const menu = document.getElementById('mobile-menu')
    expect(menu).not.toBeNull()
    expect(within(menu as HTMLElement).getAllByRole('link')).toHaveLength(navItems.length)
  })

  it('closes the mobile menu after a link is chosen', () => {
    render(<Nav />)
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))

    const menu = document.getElementById('mobile-menu') as HTMLElement
    fireEvent.click(within(menu).getByRole('link', { name: 'Toolkit' }))

    expect(document.getElementById('mobile-menu')).toBeNull()
  })

  it('closes the mobile menu on Escape and returns focus to the toggle', () => {
    render(<Nav />)
    const toggle = screen.getByRole('button', { name: 'Open menu' })
    fireEvent.click(toggle)
    const menu = document.getElementById('mobile-menu') as HTMLElement
    within(menu).getByRole('link', { name: 'Work' }).focus()

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(document.getElementById('mobile-menu')).toBeNull()
    expect(toggle).toHaveFocus()
  })

  it('keeps the mobile links inside the main navigation landmark', () => {
    render(<Nav />)
    fireEvent.click(screen.getByRole('button', { name: 'Open menu' }))

    const nav = screen.getByRole('navigation', { name: 'Main' })
    expect(nav).toContainElement(document.getElementById('mobile-menu'))
  })
})

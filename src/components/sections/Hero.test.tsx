import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Hero } from './Hero'

describe('Hero', () => {
  it('shows the role focus, location, and availability to recruiters', () => {
    render(<Hero />)

    expect(screen.getByText(/computer vision & automation/i)).toBeInTheDocument()
    expect(screen.getByText(/semarang, indonesia/i)).toBeInTheDocument()
    expect(screen.getByText(/open to internships/i)).toBeInTheDocument()
  })
})

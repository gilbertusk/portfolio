import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CopyEmailButton } from './CopyEmailButton'

const EMAIL = 'someone@example.com'

function stubClipboard(writeText: (text: string) => Promise<void>): void {
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } })
}

async function clickCopy(name: string): Promise<void> {
  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name }))
  })
}

afterEach(() => {
  vi.useRealTimers()
})

describe('CopyEmailButton', () => {
  it('copies the address and confirms it', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    stubClipboard(writeText)
    render(<CopyEmailButton email={EMAIL} />)

    await clickCopy('Copy email')

    expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument()
    expect(writeText).toHaveBeenCalledWith(EMAIL)
    expect(screen.getByRole('status')).toHaveTextContent('Email address copied')
  })

  it('tells the visitor when copying fails', async () => {
    stubClipboard(vi.fn().mockRejectedValue(new Error('denied')))
    render(<CopyEmailButton email={EMAIL} />)

    await clickCopy('Copy email')

    expect(screen.getByRole('button', { name: 'Copy failed' })).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent(`Copy failed. The address is ${EMAIL}`)
  })

  it('returns to its idle label after a moment', async () => {
    vi.useFakeTimers()
    stubClipboard(vi.fn().mockResolvedValue(undefined))
    render(<CopyEmailButton email={EMAIL} />)

    await clickCopy('Copy email')
    act(() => vi.advanceTimersByTime(2500))

    expect(screen.getByRole('button', { name: 'Copy email' })).toBeInTheDocument()
  })

  it('restarts the reset timer when clicked again', async () => {
    vi.useFakeTimers()
    stubClipboard(vi.fn().mockResolvedValue(undefined))
    render(<CopyEmailButton email={EMAIL} />)

    await clickCopy('Copy email')
    act(() => vi.advanceTimersByTime(1500))
    await clickCopy('Copied')
    act(() => vi.advanceTimersByTime(1500))

    expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument()
  })
})

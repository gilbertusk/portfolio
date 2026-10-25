import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

// jsdom implements neither matchMedia nor IntersectionObserver; Motion's
// whileInView needs these browser APIs.
function installMatchMedia(prefersDark: boolean): void {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: vi.fn((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)' ? prefersDark : false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

class MockIntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly thresholds = []
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  takeRecords = vi.fn(() => [])
}

beforeEach(() => {
  installMatchMedia(false)
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
  window.localStorage.clear()
  document.documentElement.className = ''
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
  // Also undoes spies left behind by a test that failed before restoring them.
  vi.restoreAllMocks()
})


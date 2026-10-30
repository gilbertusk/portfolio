import { Suspense, lazy } from 'react'
import { ErrorBoundary } from '../ui/ErrorBoundary'
import { ToolkitShell } from './ToolkitShell'

// The brand logos in the toolkit add ~140 KB of SVG path data, so the
// section ships as its own chunk instead of weighing down the first paint.
const Stack = lazy(() => import('./Stack'))

// Heights approximate the loaded grid at each breakpoint so the swap doesn't shove the page.
const loading = (
  <ToolkitShell>
    <div aria-hidden className="min-h-[60rem] rounded-3xl bg-blue-soft/50 lg:min-h-[28rem]" />
  </ToolkitShell>
)

const failed = (
  <ToolkitShell>
    <p className="rounded-3xl bg-card p-6 text-muted">This section didn’t load. Refresh the page to try again.</p>
  </ToolkitShell>
)

export function LazyStack() {
  return (
    <ErrorBoundary fallback={failed}>
      <Suspense fallback={loading}>
        <Stack />
      </Suspense>
    </ErrorBoundary>
  )
}

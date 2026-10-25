import { Suspense, lazy, type ReactNode } from 'react'
import { ErrorBoundary } from '../ui/ErrorBoundary'
import { Section, SectionHeading } from '../ui/Section'

// The brand logos in the stack section add ~140 KB of SVG path data, so the
// section ships as its own chunk instead of weighing down the first paint.
const Stack = lazy(() => import('./Stack'))

/** Same id and heading as the real section, so anchors work while it loads. */
function StackShell({ children }: { children: ReactNode }) {
  return (
    <Section id="stack" labelledBy="stack-heading">
      <SectionHeading id="stack-heading" title="Tools I work with" />
      {children}
    </Section>
  )
}

// Heights approximate the loaded grid at each breakpoint so the swap doesn't shove the page.
const loading = (
  <StackShell>
    <div aria-hidden className="mt-12 min-h-[98rem] bg-surface-2/60 md:min-h-[56rem] lg:min-h-[45rem]" />
  </StackShell>
)

const failed = (
  <StackShell>
    <p className="mt-6 text-muted">This section didn’t load. Refresh the page to try again.</p>
  </StackShell>
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

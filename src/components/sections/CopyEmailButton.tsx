import { CheckIcon, CopyIcon, WarningIcon } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

type CopyStatus = 'idle' | 'copied' | 'failed'

const RESET_AFTER_MS = 2000

const LABELS: Record<CopyStatus, string> = { idle: 'Copy email', copied: 'Copied', failed: 'Copy failed' }
const ICONS = { idle: CopyIcon, copied: CheckIcon, failed: WarningIcon }

interface CopyEmailButtonProps {
  email: string
}

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  // A fresh object per attempt, so a second click within the window restarts the reset timer.
  const [attempt, setAttempt] = useState<{ status: CopyStatus }>({ status: 'idle' })
  const { status } = attempt

  useEffect(() => {
    if (status === 'idle') return
    const timer = setTimeout(() => setAttempt({ status: 'idle' }), RESET_AFTER_MS)
    return () => clearTimeout(timer)
  }, [attempt, status])

  const handleCopy = async () => {
    try {
      // navigator.clipboard is undefined outside secure contexts; that throws here too.
      await navigator.clipboard.writeText(email)
      setAttempt({ status: 'copied' })
    } catch {
      setAttempt({ status: 'failed' })
    }
  }

  const announcement = {
    idle: '',
    copied: 'Email address copied',
    failed: `Copy failed. The address is ${email}`,
  }[status]
  const StatusIcon = ICONS[status]

  return (
    <>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 border border-ink bg-surface px-3.5 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-surface-2 active:scale-[0.97]"
      >
        <StatusIcon aria-hidden size={15} className={status === 'copied' ? 'text-accent' : undefined} />
        {LABELS[status]}
      </button>
      <output className="sr-only">
        {announcement}
      </output>
    </>
  )
}

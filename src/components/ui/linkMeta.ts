import { ArrowUpRightIcon, BookOpenIcon, GithubLogoIcon, type Icon } from '@phosphor-icons/react'
import type { LinkKind } from '../../data/types'

export const LINK_META: Record<LinkKind, { label: string; icon: Icon }> = {
  demo: { label: 'Live demo', icon: ArrowUpRightIcon },
  site: { label: 'Live site', icon: ArrowUpRightIcon },
  docs: { label: 'API docs', icon: BookOpenIcon },
  source: { label: 'Source', icon: GithubLogoIcon },
}

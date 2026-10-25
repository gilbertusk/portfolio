export type LinkKind = 'demo' | 'source' | 'docs' | 'site'

export interface ProjectLink {
  kind: LinkKind
  href: string
}

export interface Metric {
  value: string
  label: string
}

export interface ProjectImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface ProjectFlow {
  input: string
  model: string
  output: string
  description: string
}

export interface Project {
  id: string
  title: string
  year: string
  category: string
  summary: string
  teaser?: string
  stack: string[]
  links: ProjectLink[]
  metrics?: Metric[]
  image?: ProjectImage
  flow?: ProjectFlow
  status?: 'In progress'
  /** Private repos never get a source link; the note tells visitors why. */
  isPrivate?: boolean
}

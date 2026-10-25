export interface TimelineEntry {
  role: string
  org: string
  period: string
  detail: string
}

export interface Certification {
  title: string
  issuer: string
  date: string
  /** Verification page, when the issuer provides one. */
  href?: string
}

export const bio = [
  'I’m an Informatics Engineering student at Universitas Negeri Semarang. I started on the backend, building REST APIs with Laravel and Node.js, and studied cloud computing at Bangkit Academy.',
  'Now I focus on AI automation: training and evaluating models, wiring LLMs into business workflows, and building the services and tests around them so they hold up in daily use.',
]

export const timeline: TimelineEntry[] = [
  {
    role: 'Informatics Engineering student',
    org: 'Universitas Negeri Semarang',
    period: '2022 - present',
    detail: 'Software engineering, databases, cloud computing, and machine learning.',
  },
  {
    role: 'Cloud Computing cohort',
    org: 'Bangkit Academy',
    period: 'Aug - Dec 2023',
    detail: 'Backend development, Google Cloud deployment, and ML fundamentals.',
  },
  {
    role: 'Chief Executive',
    org: 'Ilkom Social Journey, Magelang',
    period: 'Nov 2023',
    detail: 'Led planning and coordination of the event from start to finish.',
  },
  {
    role: 'Expert Staff, Social Affairs',
    org: 'Hima Ilmu Komputer UNNES',
    period: 'Jan - Dec 2023',
    detail: 'Designed community programs, including IT training for local residents.',
  },
]

const dicoding = (id: string) => `https://www.dicoding.com/certificates/${id}`

export const certifications: Certification[] = [
  {
    title: 'Applying Machine Learning with Google Cloud',
    issuer: 'Dicoding',
    date: 'Dec 2024',
    href: dicoding('07Z64952RPQR'),
  },
  { title: 'AI Fundamentals', issuer: 'Dicoding', date: 'Nov 2024', href: dicoding('1RXY2JWNMXVM') },
  { title: 'Python for Data Science', issuer: 'HiColleagues', date: 'Nov 2024' },
  {
    title: 'Becoming a Google Cloud Engineer',
    issuer: 'Dicoding',
    date: 'Nov 2024',
    href: dicoding('EYX4JM82OZDL'),
  },
  {
    title: 'Back-End Development with Google Cloud',
    issuer: 'Dicoding',
    date: 'Nov 2024',
    href: dicoding('JMZV4L2OOXN9'),
  },
  {
    title: 'JavaScript Programming Fundamentals',
    issuer: 'Dicoding',
    date: 'Nov 2024',
    href: dicoding('6RPNYGVE5Z2M'),
  },
  { title: 'Git and GitHub Fundamentals', issuer: 'Dicoding', date: 'Sep 2024', href: dicoding('1RXYL5G5KPVM') },
  { title: 'Programming Logic 101', issuer: 'Dicoding', date: 'Sep 2024', href: dicoding('4EXGQW70DZRL') },
]

/** How many certifications show before the "show all" disclosure. */
export const VISIBLE_CERTIFICATIONS = 4

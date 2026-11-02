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
  'I’m an Informatics Engineering graduate of Universitas Negeri Semarang. I started on the backend, building REST APIs with Laravel and Node.js, and studied cloud computing at Bangkit Academy.',
  'Today I work as a backend developer: REST APIs, microservices, and the tests around them. AI is what I explore beyond that, from training and evaluating vision models to wiring LLMs into the services I build.',
]

export const timeline: TimelineEntry[] = [
  {
    role: 'Freelance Backend Developer',
    org: 'PT Berlian Artha Label',
    period: 'Aug - Nov 2026',
    detail: 'Built internal tools for a garment label maker: a KPI job desk system, job order and kontra bon document generators, and OCR label inspection.',
  },
  {
    role: 'Backend Developer Intern',
    org: 'PT Ngupoyo Rejeki Lestari Mulya',
    period: 'Feb - Jun 2025',
    detail: 'Built and tested REST APIs for a face recognition attendance system: authentication, attendance records, and face image handling, with Express.js and MongoDB.',
  },
  {
    role: 'Bachelor of Informatics Engineering',
    org: 'Universitas Negeri Semarang',
    period: '2022 - 2026',
    detail: 'Software engineering, databases, cloud computing, and machine learning.',
  },
  {
    role: 'Cloud Computing cohort',
    org: 'Bangkit Academy',
    period: 'Jun - Nov 2024',
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

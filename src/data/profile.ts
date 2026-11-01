export const profile = {
  name: 'Gilbertus Kristo',
  initials: 'GK',
  role: 'Backend Developer',
  email: 'gilbertuskristo@gmail.com',
  location: 'Semarang, Indonesia',
  availability: 'Available for work',
  links: {
    github: 'https://github.com/gilbertusk',
    linkedin: 'https://www.linkedin.com/in/gilbertus-kristo-anugerah-adviandito-a81809240/',
  },
  /** Served from public/; `fileName` is what the browser saves it as. */
  cv: { href: '/cv-gilbertus-kristo.pdf', fileName: 'Gilbertus-Kristo-CV.pdf' },
} as const

export const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Research', href: '#research' },
  { label: 'About', href: '#about' },
  { label: 'Toolkit', href: '#toolkit' },
  { label: 'Contact', href: '#contact' },
] as const

export const intro = {
  label: 'Gilbertus Kristo // Backend Developer & AI enthusiast, Semarang, ID',
  summary:
    'Backend developer in Semarang, Indonesia. I build REST APIs, microservices, and the automated tests that keep them reliable. As an AI enthusiast, I train vision models and wire LLMs into the systems I build.',
} as const

export const contactCopy = {
  heading: 'Have a workflow that should run on its own? Let’s talk.',
  body: 'Tell me about the process, the data, and what “done” looks like. I usually reply within a day.',
} as const

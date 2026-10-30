export const profile = {
  name: 'Gilbertus Kristo',
  initials: 'GK',
  role: 'AI Engineer',
  email: 'gilbertuskristo@gmail.com',
  location: 'Semarang, Indonesia',
  availability: 'Open to internships and freelance automation work',
  links: {
    github: 'https://github.com/gilbertusk',
    linkedin: 'https://www.linkedin.com/in/gilbertus-kristo-anugerah-adviandito-a81809240/',
  },
} as const

export const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Toolkit', href: '#toolkit' },
  { label: 'Contact', href: '#contact' },
] as const

export const intro = {
  label: 'Gilbertus Kristo // AI Engineer based in Semarang, ID',
  summary:
    'AI engineer in Semarang, Indonesia. I train computer vision models, wire LLMs into business workflows, and write the APIs and automated tests that keep them running in daily use.',
} as const

export const contactCopy = {
  heading: 'Have a workflow that should run on its own? Let’s talk.',
  body: 'Tell me about the process, the data, and what “done” looks like. I usually reply within a day.',
} as const

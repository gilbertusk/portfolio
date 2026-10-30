/**
 * Presentation choices for the bento layout. Project facts (titles, links,
 * images) stay in projects.ts; this file only decides how they are framed.
 */

export type Tone = 'blue' | 'coral' | 'sky' | 'lavender' | 'navy' | 'blue-soft' | 'coral-soft'

export interface FeaturedEntry {
  /** Id of a project in projects.ts. */
  id: string
  /** Background behind the browser preview. */
  tone: Tone
  /** Text shown in the preview's address bar. */
  address: string
  /** Short card copy; the full summary is too long for a two-line card. */
  blurb: string
  pills: [string, string]
}

export const featured: FeaturedEntry[] = [
  {
    id: 'rep-counter',
    tone: 'coral',
    address: 'gilbertusk.github.io/fitness-rep-counter',
    blurb: 'Recognizes the exercise, counts reps, and flags bad form from a webcam, all inside the browser.',
    pills: ['22 exercises', '0.822 macro-F1'],
  },
  {
    id: 'pilah',
    tone: 'sky',
    address: 'gilbertusk.github.io/garbage-detection',
    blurb: 'Point a phone at trash and it tells you which bin it belongs in. MobileNetV3 runs on the device.',
    pills: ['0.939 macro-F1', '4.2 MB model'],
  },
  {
    id: 'labelguard',
    tone: 'navy',
    address: 'labelguard · inspection flow',
    blurb: 'Quality control for PT Berlian Artha Label: each garment label is read by OCR and checked against its purchase order.',
    pills: ['Tesseract OCR', 'PostgreSQL'],
  },
  {
    id: 'travel-booking-engine',
    tone: 'blue',
    address: 'jaeger · booking saga trace',
    blurb: 'Merges hotel inventory from several suppliers into one search, then runs the booking saga to an e-voucher.',
    pills: ['Kafka', 'Jaeger tracing'],
  },
  {
    id: 'pneumonia-detection',
    tone: 'lavender',
    address: 'pneumonia-detection-liard.vercel.app',
    blurb: 'Educational chest X-ray classifier behind a Flask API with a Next.js upload UI. Not for clinical use.',
    pills: ['TensorFlow', 'Flask API'],
  },
  {
    id: 'back-end-absensi',
    tone: 'coral-soft',
    address: 'back-end-absensi.vercel.app/api-docs',
    blurb: 'Attendance API with JWT auth, user management, and photo uploads to Cloudinary, documented with Swagger.',
    pills: ['JWT auth', 'Cloudinary'],
  },
]

/** LabelGuard has no public screenshot, so its preview shows the inspection flow instead. */
export const labelGuardSteps = ['Label photo', 'OCR + field rules', 'Match purchase order', 'Ship or flag']

export type AlsoBuiltIcon = 'clipboard' | 'cart' | 'game' | 'compass' | 'heartbeat'

export interface AlsoBuiltEntry {
  id: string
  icon: AlsoBuiltIcon
  tone: Tone
  blurb: string
}

export const alsoBuilt: AlsoBuiltEntry[] = [
  { id: 'kpi-job-desk', icon: 'clipboard', tone: 'blue', blurb: 'Weighted tasks, proof of completion, and rule-based scoring for late work.' },
  { id: 'nexacommerce', icon: 'cart', tone: 'coral', blurb: '14 microservices with SAGA checkout, Midtrans payments, and Kafka events.' },
  { id: 'kancil-pintar', icon: 'game', tone: 'sky', blurb: 'Math mini-games for elementary school, on Supabase with row-level security.' },
  { id: 'career-decider', icon: 'compass', tone: 'lavender', blurb: 'Career paths and a learning roadmap from a user’s interests and skills.' },
  { id: 'healthbot', icon: 'heartbeat', tone: 'coral-soft', blurb: 'Health chatbot with workout scheduling and diet recommendations.' },
]

export const focusAreas = [
  { icon: 'eye', title: 'Computer vision', detail: 'Pose estimation, image classification, OCR' },
  { icon: 'flow', title: 'LLM automation', detail: 'n8n, Make, Zapier, Claude and Gemini APIs' },
  { icon: 'server', title: 'Backend & testing', detail: 'Node.js, Python, PostgreSQL, Playwright' },
] as const

export const workflowSteps = [
  { icon: 'database', title: 'Data', detail: 'Collect, label, clean' },
  { icon: 'brain', title: 'Model', detail: 'Train, evaluate, export' },
  { icon: 'flow', title: 'Workflow', detail: 'Ship into real use' },
] as const

export const highlightStats = [
  { value: '0.939', label: 'macro-F1 for Pilah, my on-device waste classifier', tone: 'navy' },
  { value: '22', label: 'exercises Rep Counter recognizes from a webcam', tone: 'coral' },
] as const

export const skillTicker = [
  'Computer vision',
  'LLM automation',
  'n8n workflows',
  'PyTorch',
  'ONNX Runtime',
  'OCR pipelines',
  'REST APIs',
  'End-to-end testing',
]

export const aboutFacts = ['Semarang, Indonesia', 'Informatics @ UNNES', 'Bangkit Academy 2023'] as const

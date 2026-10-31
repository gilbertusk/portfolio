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
    id: 'telaah',
    tone: 'coral-soft',
    address: 'telaah · streamlit demo',
    blurb: 'Research topic in, paper-comparison table out. Code checks every LLM-filled cell against the abstract.',
    pills: ['98.5% grounding rate', 'MCP server'],
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
]

/** LabelGuard has no public screenshot, so its preview shows the inspection flow instead. */
export const labelGuardSteps = ['Label photo', 'OCR + field rules', 'Match purchase order', 'Ship or flag']

export type AlsoBuiltIcon = 'clipboard' | 'cart' | 'game' | 'compass' | 'heartbeat' | 'plug'

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
  { id: 'back-end-absensi', icon: 'plug', tone: 'navy', blurb: 'Attendance API with JWT auth, user management, and Cloudinary photo uploads, documented with Swagger.' },
]

/** Headline words that render as chips: "I turn [raw data] into [models] that [ship.]". */
export const headline = {
  parts: [
    { text: 'I turn', chip: null },
    { text: 'raw data', chip: { icon: 'camera', tone: 'coral' } },
    { text: 'into', chip: null },
    { text: 'models', chip: { icon: 'lightning', tone: 'blue' } },
    { text: 'that', chip: null },
    { text: 'ship.', chip: { icon: 'arrow', tone: 'navy' } },
  ],
} as const

/** Every number here comes from a project's own evaluation (see projects.ts). */
export const highlightStats = [
  { value: '0.939', label: 'macro-F1, Pilah classifier', color: 'text-blue' },
  { value: '22', label: 'exercises Rep Counter tracks', color: 'text-coral' },
  { value: '4.2 MB', label: 'int8 ONNX model on device', color: 'text-[#16a34a]' },
  { value: '0', label: 'webcam frames sent to a server', color: 'text-[#7c3aed]' },
] as const

export const pipelineSteps = [
  { title: 'Data & labeling', detail: 'Collect, clean, and label images and pose keypoints' },
  { title: 'Model training & export', detail: 'PyTorch training, int8 quantization, ONNX export' },
  { title: 'Workflow & serving', detail: 'ONNX Runtime Web, REST APIs, n8n automations' },
] as const

/** Decorative terminal; each line restates a real Rep Counter fact, no invented metrics. */
export const terminalLines = [
  { tone: 'prompt', text: '$ python -m rep_counter --backend=onnx_web' },
  { tone: 'info', text: '[INFO] ONNX Runtime Web ready, inference runs in the browser' },
  { tone: 'pose', text: '[POSE] 33 MediaPipe landmarks per frame' },
  { tone: 'model', text: '[MODEL] 1D-CNN · 22 exercises · macro-F1 0.822' },
  { tone: 'ok', text: '● 0 frames uploaded, video never leaves the device' },
] as const

export const specialization = {
  label: 'Specialization focus',
  title: 'Computer Vision & Automation',
  detail: 'MediaPipe, quantization, n8n, REST APIs & Docker',
} as const

export const skillTicker = [
  'Computer vision',
  'LLM automation',
  'n8n workflows',
  'PyTorch',
  'ONNX Runtime',
  'MediaPipe pose estimation',
  'MobileNetV3 edge classifier',
  'OCR pipelines',
  'REST APIs',
]

export const aboutFacts = ['Semarang, Indonesia', 'Informatics @ UNNES', 'Bangkit Academy 2023'] as const

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
}

export const featured: FeaturedEntry[] = [
  {
    id: 'pos-kasir',
    tone: 'blue-soft',
    address: 'poskasir.kesug.com',
  },
  {
    id: 'rep-counter',
    tone: 'coral',
    address: 'gilbertusk.github.io/fitness-rep-counter',
  },
  {
    id: 'pilah',
    tone: 'sky',
    address: 'garbage-detection-olive.vercel.app',
  },
  {
    id: 'telaah',
    tone: 'coral-soft',
    address: 'telaah-fyyjxxvfoclxg9mzgdaax7.streamlit.app',
  },
  {
    id: 'travel-booking-engine',
    tone: 'blue',
    address: 'jaeger · booking saga trace',
  },
  {
    id: 'pneumonia-detection',
    tone: 'lavender',
    address: 'pneumonia-detection-liard.vercel.app',
  },
]

export type AlsoBuiltIcon = 'clipboard' | 'cart' | 'game' | 'compass' | 'heartbeat' | 'plug'

export interface AlsoBuiltEntry {
  id: string
  icon: AlsoBuiltIcon
  tone: Tone
}

export const alsoBuilt: AlsoBuiltEntry[] = [
  { id: 'kpi-job-desk', icon: 'clipboard', tone: 'blue' },
  { id: 'nexacommerce', icon: 'cart', tone: 'coral' },
  { id: 'kancil-pintar', icon: 'game', tone: 'sky' },
  { id: 'career-decider', icon: 'compass', tone: 'lavender' },
  { id: 'healthbot', icon: 'heartbeat', tone: 'coral-soft' },
  { id: 'back-end-absensi', icon: 'plug', tone: 'navy' },
]

/** Headline words that render as chips: "I build [backends] that put [AI] to [work.]". */
export const headline = {
  parts: [
    { text: 'I build', chip: null },
    { text: 'backends', chip: { icon: 'server', tone: 'blue' } },
    { text: 'that put', chip: null },
    { text: 'AI', chip: { icon: 'sparkle', tone: 'coral' } },
    { text: 'to', chip: null },
    { text: 'work.', chip: { icon: 'arrow', tone: 'navy' } },
  ],
} as const

/** Every number here comes from a project's own evaluation (see projects.ts). */
export const highlightStats = [
  { value: '14', label: 'backend services in NexaCommerce', color: 'text-blue' },
  { value: '98.5%', label: 'Telaah LLM cells quote-checked', color: 'text-coral' },
  { value: '0.939', label: 'macro-F1, Pilah classifier', color: 'text-[#16a34a]' },
  { value: '22', label: 'exercises Rep Counter tracks', color: 'text-[#7c3aed]' },
] as const

export const pipelineSteps = [
  { title: 'API & data model', detail: 'REST endpoints, Prisma schemas, PostgreSQL' },
  { title: 'Services & messaging', detail: 'Express services, Kafka and RabbitMQ events, Redis' },
  { title: 'AI & automation', detail: 'ONNX and LLM features, n8n automations, Docker' },
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
  title: 'Backend & Applied AI',
  detail: 'REST APIs, Kafka, Docker, MediaPipe & n8n',
} as const

export const skillTicker = [
  'REST APIs',
  'Microservices',
  'Kafka & RabbitMQ',
  'PostgreSQL',
  'Docker',
  'Computer vision',
  'LLM automation',
  'n8n workflows',
  'PyTorch',
  'ONNX Runtime',
  'MediaPipe pose estimation',
  'MobileNetV3 edge classifier',
]

export const aboutFacts = ['Semarang, Indonesia', 'Informatics @ UNNES', 'Bangkit Academy 2023'] as const

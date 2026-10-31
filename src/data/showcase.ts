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
  /** Headline results; left out where the tech stack already says it all. */
  pills?: [string, string]
}

export const featured: FeaturedEntry[] = [
  {
    id: 'rep-counter',
    tone: 'coral',
    address: 'gilbertusk.github.io/fitness-rep-counter',
    pills: ['22 exercises', '0.822 macro-F1'],
  },
  {
    id: 'pilah',
    tone: 'sky',
    address: 'gilbertusk.github.io/garbage-detection',
    pills: ['0.939 macro-F1', '4.2 MB model'],
  },
  {
    id: 'telaah',
    tone: 'coral-soft',
    address: 'telaah-fyyjxxvfoclxg9mzgdaax7.streamlit.app',
    pills: ['98.5% grounding rate', 'MCP server'],
  },
  {
    id: 'labelguard',
    tone: 'navy',
    address: 'labelguard · inspection flow',
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

/** LabelGuard has no public screenshot, so its preview shows the inspection flow instead. */
export const labelGuardSteps = ['Label photo', 'OCR + field rules', 'Match purchase order', 'Ship or flag']

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

import {
  siApachekafka,
  siClaude,
  siDocker,
  siExpress,
  siFlask,
  siGithubactions,
  siGooglecloud,
  siGooglegemini,
  siGrafana,
  siHuggingface,
  siJaeger,
  siJest,
  siLaravel,
  siMake,
  siMediapipe,
  siMongodb,
  siMysql,
  siN8n,
  siNextdotjs,
  siNodedotjs,
  siOnnx,
  siOpencv,
  siPostgresql,
  siPrisma,
  siPrometheus,
  siPytest,
  siPython,
  siPytorch,
  siRabbitmq,
  siReact,
  siRedis,
  siScikitlearn,
  siSupabase,
  siTailwindcss,
  siTensorflow,
  siTypescript,
  siVercel,
  siVitest,
  siZapier,
  type SimpleIcon,
} from 'simple-icons'

export interface Tool {
  name: string
  /** Brand mark from simple-icons. Brands without one there render as text only. */
  icon?: SimpleIcon
}

export interface ToolGroup {
  id: string
  title: string
  description: string
  tools: Tool[]
}

export const toolGroups: ToolGroup[] = [
  {
    id: 'ai',
    title: 'AI & automation',
    description: 'Where most of my time goes now: workflow automation, LLM APIs, and models I train and ship.',
    tools: [
      { name: 'n8n', icon: siN8n },
      { name: 'Make', icon: siMake },
      { name: 'Zapier', icon: siZapier },
      { name: 'Claude API', icon: siClaude },
      { name: 'Gemini API', icon: siGooglegemini },
      { name: 'OpenAI API' },
      { name: 'PyTorch', icon: siPytorch },
      { name: 'TensorFlow', icon: siTensorflow },
      { name: 'ONNX Runtime', icon: siOnnx },
      { name: 'MediaPipe', icon: siMediapipe },
      { name: 'OpenCV', icon: siOpencv },
      { name: 'scikit-learn', icon: siScikitlearn },
      { name: 'Hugging Face', icon: siHuggingface },
      { name: 'Tesseract OCR' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    description: 'APIs and services that models plug into.',
    tools: [
      { name: 'Node.js', icon: siNodedotjs },
      { name: 'TypeScript', icon: siTypescript },
      { name: 'Python', icon: siPython },
      { name: 'Express', icon: siExpress },
      { name: 'Flask', icon: siFlask },
      { name: 'Laravel', icon: siLaravel },
      { name: 'Prisma', icon: siPrisma },
    ],
  },
  {
    id: 'infra',
    title: 'Data & infrastructure',
    description: 'Storage, messaging, deployment, and observability.',
    tools: [
      { name: 'PostgreSQL', icon: siPostgresql },
      { name: 'Redis', icon: siRedis },
      { name: 'RabbitMQ', icon: siRabbitmq },
      { name: 'Kafka', icon: siApachekafka },
      { name: 'Supabase', icon: siSupabase },
      { name: 'MongoDB', icon: siMongodb },
      { name: 'MySQL', icon: siMysql },
      { name: 'Docker', icon: siDocker },
      { name: 'Google Cloud', icon: siGooglecloud },
      { name: 'Vercel', icon: siVercel },
      { name: 'Prometheus', icon: siPrometheus },
      { name: 'Grafana', icon: siGrafana },
      { name: 'Jaeger', icon: siJaeger },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend & testing',
    description: 'Interfaces around the model, and the tests behind them.',
    tools: [
      { name: 'React', icon: siReact },
      { name: 'Next.js', icon: siNextdotjs },
      { name: 'Tailwind CSS', icon: siTailwindcss },
      { name: 'Vitest', icon: siVitest },
      { name: 'Jest', icon: siJest },
      { name: 'Playwright' },
      { name: 'pytest', icon: siPytest },
      { name: 'GitHub Actions', icon: siGithubactions },
    ],
  },
]

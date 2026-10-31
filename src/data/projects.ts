import absensiImage from '../assets/projects/back-end-absensi.webp'
import kpiImage from '../assets/projects/kpi-job-desk.webp'
import pilahImage from '../assets/projects/pilah-demo.webp'
import pneumoniaImage from '../assets/projects/pneumonia.webp'
import repCounterImage from '../assets/projects/rep-counter.webp'
import telaahImage from '../assets/projects/telaah.webp'
import travelJaegerImage from '../assets/projects/travel-jaeger.webp'
import type { Project } from './types'

export const featuredProjects: Project[] = [
  {
    id: 'rep-counter',
    title: 'Rep Counter',
    year: '2026',
    category: 'Computer vision',
    summary:
      'A workout assistant that recognizes the exercise, counts reps, and flags bad form from a webcam. Pose estimation and the classifier both run in the browser.',
    teaser: 'Rep counting and form guidance from a webcam.',
    metrics: [
      { value: '22', label: 'exercises recognized' },
      { value: '0.822', label: 'macro-F1 on held-out videos' },
      { value: '0', label: 'video frames sent to a server' },
    ],
    stack: ['MediaPipe Pose', 'PyTorch', '1D-CNN', 'ONNX Runtime Web', 'Playwright'],
    links: [
      { kind: 'demo', href: 'https://gilbertusk.github.io/fitness-rep-counter/' },
      { kind: 'source', href: 'https://github.com/gilbertusk/fitness-rep-counter' },
    ],
    image: {
      src: repCounterImage,
      alt: 'Rep Counter recognizing a push-up with 91% confidence, with the pose skeleton drawn over the video and a rep count of 2',
      width: 1200,
      height: 902,
    },
    flow: {
      input: 'Camera',
      model: 'Pose + CNN',
      output: 'Reps',
      description: 'Camera video is converted to pose landmarks, classified by a 1D-CNN, then used for rep counting and form feedback.',
    },
  },
  {
    id: 'pilah',
    title: 'Pilah',
    year: '2026',
    category: 'Image classification',
    summary:
      'Point a phone at a piece of trash and Pilah tells you which bin it goes in. A fine-tuned MobileNetV3 runs on the device, so photos never leave it.',
    teaser: 'Waste classification that runs on the device.',
    metrics: [
      { value: '0.939', label: 'macro-F1 on 1,836 test images' },
      { value: '4.2 MB', label: 'int8 ONNX model' },
    ],
    stack: ['PyTorch', 'MobileNetV3', 'ONNX', 'pytest'],
    links: [
      { kind: 'demo', href: 'https://gilbertusk.github.io/garbage-detection/' },
      { kind: 'source', href: 'https://github.com/gilbertusk/garbage-detection' },
    ],
    image: {
      src: pilahImage,
      alt: 'Pilah web app home screen asking which bin a piece of trash belongs in, with buttons to turn on the camera or pick a photo',
      width: 1200,
      height: 750,
    },
    flow: {
      input: 'Photo',
      model: 'CNN',
      output: 'Class',
      description: 'A phone photo runs through MobileNetV3 on the device to produce a waste class.',
    },
  },
  {
    id: 'telaah',
    title: 'Telaah',
    year: '2026',
    category: 'LLM automation',
    summary:
      'Turns a research topic into a paper-comparison table extracted from open abstracts. Gemini fills a fixed schema, and code, not the model, checks every cell against a verbatim quote from the source. Runs as a CLI, an MCP server for agents, and a Streamlit web demo.',
    teaser: 'Quote-checked paper comparisons from a research topic.',
    metrics: [
      { value: '98.5%', label: 'of filled cells backed by a verified quote (16-paper sample run)' },
      { value: '3.3x', label: 'faster with 4 parallel workers on 6 papers' },
      { value: '40', label: 'abstracts frozen for hand-scored evaluation' },
    ],
    stack: ['Python', 'Gemini API', 'OpenAlex', 'MCP', 'Streamlit', 'pytest', 'GitHub Actions'],
    links: [
      { kind: 'demo', href: 'https://telaah-fyyjxxvfoclxg9mzgdaax7.streamlit.app/' },
      { kind: 'source', href: 'https://github.com/gilbertusk/telaah' },
    ],
    image: {
      src: telaahImage,
      alt: 'Telaah sample review of leaf disease classification papers: 16 papers reviewed, 98% grounding rate, CSV and BibTeX downloads, and fields marked Verified',
      width: 1200,
      height: 752,
    },
    flow: {
      input: 'Topic',
      model: 'LLM + quote check',
      output: 'Table',
      description: 'A research topic is searched on OpenAlex, Gemini extracts each field, and code verifies every value against the abstract.',
    },
  },
  {
    id: 'labelguard',
    title: 'LabelGuard AI',
    year: '2026',
    category: 'OCR automation',
    summary:
      'Quality control for PT Berlian Artha Label. Operators photograph a garment label, OCR reads it, and every field is checked against the purchase order before shipment.',
    teaser: 'OCR checks label fields against purchase orders.',
    stack: ['Tesseract.js', 'Sharp', 'Node.js', 'Prisma', 'PostgreSQL', 'Redis', 'Docker'],
    flow: {
      input: 'Label',
      model: 'OCR',
      output: 'Match',
      description: 'A label photo is read by OCR and its fields are checked against the purchase order.',
    },
    links: [{ kind: 'source', href: 'https://github.com/GilbertusKristo/labelguard-ai' }],
  },
]

export const moreAiProjects: Project[] = [
  {
    id: 'pneumonia-detection',
    title: 'Pneumonia Detection',
    year: '2026',
    category: 'Medical imaging',
    summary:
      'Educational chest X-ray classification demo served through a Flask API, with a Next.js upload interface. It is not intended for clinical diagnosis.',
    stack: ['TensorFlow', 'Flask', 'Next.js'],
    image: {
      src: pneumoniaImage,
      alt: 'Pneumonia detection website showing a chest X-ray upload and model result interface',
      width: 1200,
      height: 900,
    },
    flow: {
      input: 'X-ray',
      model: 'TF model',
      output: 'Result',
      description: 'An uploaded chest X-ray is classified by a TensorFlow model and the result is shown in the web interface.',
    },
    links: [{ kind: 'demo', href: 'https://pneumonia-detection-liard.vercel.app/' }],
  },
  {
    id: 'career-decider',
    title: 'AI Career Decider',
    year: '2024',
    category: 'Recommendation',
    summary: 'Suggests career paths and a learning roadmap from a user’s interests and skills.',
    stack: ['Machine learning', 'REST API'],
    flow: {
      input: 'Skills',
      model: 'ML',
      output: 'Path',
      description: 'Interests and skills inform career recommendations and a learning roadmap.',
    },
    links: [],
  },
  {
    id: 'healthbot',
    title: 'HealthBot',
    year: '2024',
    category: 'Chatbot',
    summary: 'Health assistant with a chatbot, workout scheduling, and diet recommendations.',
    stack: ['Chatbot', 'Recommendation'],
    links: [],
  },
]

export const engineeringProjects: Project[] = [
  {
    id: 'travel-booking-engine',
    title: 'Travel Booking Engine',
    year: '2026',
    category: 'Distributed systems',
    status: 'In progress',
    summary:
      'Hotel aggregator that merges inventory from several third-party suppliers into one search, then runs the booking saga through to an e-voucher.',
    stack: ['Next.js', 'Express', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Kafka', 'Jaeger', 'k6'],
    image: {
      src: travelJaegerImage,
      alt: 'Jaeger trace of a travel booking request across payment, booking, and supplier services',
      width: 1400,
      height: 963,
    },
    links: [{ kind: 'source', href: 'https://github.com/gilbertusk/travelbookingengine' }],
  },
  {
    id: 'nexacommerce',
    title: 'NexaCommerce',
    year: '2026',
    category: 'Microservices',
    summary:
      'E-commerce platform split into 14 backend services, with SAGA checkout, Redis carts, Midtrans payments, and Kafka event streams.',
    stack: ['TypeScript', 'Express', 'Prisma', 'PostgreSQL', 'RabbitMQ', 'Kafka', 'Docker'],
    links: [{ kind: 'source', href: 'https://github.com/gilbertusk/nexacommerce' }],
  },
  {
    id: 'kpi-job-desk',
    title: 'KPI Job Desk System',
    year: '2026',
    category: 'Internal tool',
    isPrivate: true,
    summary:
      'Managers assign weighted tasks, staff report completion with proof, and late work is scored by rules each manager sets. Includes Excel import and audit history.',
    stack: ['Next.js', 'Prisma', 'Supabase', 'Auth.js', 'Playwright'],
    image: {
      src: kpiImage,
      alt: 'KPI Job Desk System sign-in page for PT Berlian Artha Label, with email and password fields',
      width: 1200,
      height: 750,
    },
    links: [{ kind: 'site', href: 'https://keyperformanceindicator.vercel.app' }],
  },
  {
    id: 'kancil-pintar',
    title: 'Kancil Pintar',
    year: '2026',
    category: 'Education',
    status: 'In progress',
    isPrivate: true,
    summary:
      'Web game that teaches elementary school math through mini-games set in a village world, built on Supabase with row-level security.',
    stack: ['Next.js', 'React 19', 'Supabase', 'Tailwind CSS'],
    links: [],
  },
  {
    id: 'back-end-absensi',
    title: 'Back-End Absensi',
    year: '2026',
    category: 'REST API',
    summary: 'Attendance API with JWT auth, user management, and photo uploads to Cloudinary.',
    stack: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Cloudinary'],
    image: {
      src: absensiImage,
      alt: 'Swagger documentation for the attendance API, listing auth and user endpoints such as register, login, and profile updates',
      width: 1200,
      height: 750,
    },
    links: [
      { kind: 'docs', href: 'https://back-end-absensi.vercel.app/api-docs/' },
      { kind: 'source', href: 'https://github.com/GilbertusKristo/back-end-absensi' },
    ],
  },
]

/** One ordered collection keeps every project in the same presentation system. */
export const allProjects: Project[] = [
  ...featuredProjects,
  ...moreAiProjects,
  ...engineeringProjects,
]

const projectsById = new Map(allProjects.map((project) => [project.id, project]))

/** Looks up a project by id; throws so a typo in showcase.ts fails loudly instead of rendering nothing. */
export function getProject(id: string): Project {
  const project = projectsById.get(id)
  if (!project) throw new Error(`Unknown project id: ${id}`)
  return project
}

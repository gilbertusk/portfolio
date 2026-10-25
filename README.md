# Gilbertus Kristo · Portfolio

Personal portfolio for an AI Automation & AI Engineer. Single page with a white canvas, restrained black graphic accents, and project imagery in its original color. Built with React 19, Vite, Tailwind CSS v4, and Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm test` | Vitest unit and component tests |
| `npm run test:coverage` | Tests with a coverage report |
| `npm run lint` | oxlint |
| `npm run build` | Type-check and build to `dist/` |
| `npm run preview` | Serve the production build locally |

## Editing content

All copy lives in `src/data/`, so most updates never touch a component:

| File | Holds |
| --- | --- |
| `profile.ts` | Name, role, email, social links, nav items |
| `projects.ts` | AI, automation, and backend projects shown in the carousel |
| `stack.ts` | Tool groups shown in "Tools I work with" |
| `about.ts` | Bio, experience timeline, certifications |

### Adding a project

Append an object to the right array in `src/data/projects.ts`:

```ts
{
  id: 'invoice-agent',            // unique, kebab-case
  title: 'Invoice Agent',
  year: '2026',
  category: 'LLM automation',
  summary: 'One or two sentences on what it does and for whom.',
  stack: ['n8n', 'Claude API', 'PostgreSQL'],
  links: [
    { kind: 'demo', href: 'https://...' },
    { kind: 'source', href: 'https://github.com/...' },
  ],
  metrics: [{ value: '120', label: 'invoices processed per day' }], // optional, real numbers only
  status: 'In progress',          // optional
  isPrivate: true,                // optional; private repos must not have a `source` link
}
```

`src/data/data.test.ts` fails the build if ids repeat, a link isn't https, or a private project links to its source.

All projects in **Selected work** use the same compact card and appear in one horizontally scrollable carousel. The collection follows `allProjects`, which combines the three project arrays in `projects.ts`. Live demos and sites are shown directly on their cards. Add a `flow` entry when a model or processing diagram should fill the card preview area.

Images go in `src/assets/projects/` as WebP (about 1200 to 1400 px wide) and are imported in `projects.ts`.

## Deploying

The site is static. On Vercel, import the repo and keep the defaults (framework: Vite, output: `dist`).

## Notes

- Fonts (Geist, Geist Mono) are self-hosted through Fontsource; no Google Fonts request.
- The "Tools I work with" section is lazy-loaded because its brand logos (simple-icons) add about 140 KB of SVG paths.
- Colors are semantic tokens in `src/index.css` (`--canvas`, `--ink`, `--accent`, ...). The hero grid, circular outline, and hatching are CSS decorations, so the photo and project images keep their natural colors.

import { ArrowUpRightIcon, BookOpenTextIcon, FilePdfIcon } from '@phosphor-icons/react'
import { Fragment } from 'react'
import { SELF_AUTHOR, publications, type Publication } from '../../data/publications'
import { cn } from '../../lib/cn'
import { Reveal } from '../ui/Reveal'
import { SectionTitle } from '../ui/SectionTitle'

const RESULT_COLORS = ['text-coral', 'text-blue']

const external = (name: string) => ({
  target: '_blank',
  rel: 'noopener noreferrer',
  'aria-label': `${name} (opens in a new tab)`,
})

function AuthorList({ authors }: { authors: string[] }) {
  return (
    <p className="text-[0.85rem] leading-relaxed text-muted">
      {authors.map((author, index) => (
        <Fragment key={author}>
          {index > 0 && ', '}
          {author === SELF_AUTHOR ? <strong className="font-semibold text-ink">{author}</strong> : author}
        </Fragment>
      ))}
    </p>
  )
}

function PaperCard({ paper, resultColor }: { paper: Publication; resultColor: string }) {
  const isIndonesian = paper.language === 'Indonesian'
  return (
    <article className="bento-card lift flex h-full flex-col gap-5 p-5 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 rounded-md border-[1.5px] border-ink bg-card px-2.5 py-1 font-mono text-[0.7rem] font-bold shadow-hard-sm">
          <BookOpenTextIcon aria-hidden weight="bold" size={14} />
          {paper.journal} · {paper.year}
        </span>
        <span className="rounded-md bg-toolbar px-2 py-0.5 font-mono text-[0.68rem] font-semibold text-muted">
          {paper.language}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h3 lang={isIndonesian ? 'id' : 'en'} className="text-[1.2rem] leading-snug font-bold tracking-[-0.02em] text-balance">
          {paper.title}
        </h3>
        {paper.englishTitle && <p className="text-[0.9rem] text-muted italic">{paper.englishTitle}</p>}
      </div>

      <AuthorList authors={paper.authors} />

      <p className="flex items-baseline gap-3 rounded-lg border-[1.5px] border-dashed border-ink/25 bg-bg px-4 py-3">
        <span className={cn('font-display text-[2rem] leading-none font-bold tracking-[-0.03em] tabular-nums', resultColor)}>
          {paper.result.value}
        </span>
        <span className="font-mono text-[0.72rem] leading-snug text-muted">{paper.result.label}</span>
      </p>

      <ul aria-label="Topics" className="flex flex-wrap gap-1.5">
        {paper.topics.map((topic) => (
          <li
            key={topic}
            className="rounded-md border border-blue/30 bg-blue-soft px-2 py-0.5 font-mono text-[0.7rem] font-semibold text-blue"
          >
            {topic}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono text-[0.7rem] text-muted">
          {paper.issue}
          {paper.doi && (
            <>
              {' · '}
              <a
                href={`https://doi.org/${paper.doi}`}
                {...external(`DOI ${paper.doi}`)}
                className="underline decoration-line underline-offset-2 hover:text-blue"
              >
                DOI
              </a>
            </>
          )}
        </span>
        <span className="flex gap-2">
          <a
            href={paper.href}
            {...external(`Read "${paper.title}"`)}
            className="press inline-flex items-center gap-1.5 rounded-lg bg-blue px-3.5 py-2 font-mono text-[0.78rem] font-bold text-white"
          >
            Read paper
            <ArrowUpRightIcon aria-hidden weight="bold" size={14} />
          </a>
          <a
            href={paper.pdfHref}
            {...external(`PDF of "${paper.title}"`)}
            className="press inline-flex items-center gap-1.5 rounded-lg bg-card px-3.5 py-2 font-mono text-[0.78rem] font-bold"
          >
            <FilePdfIcon aria-hidden weight="bold" size={15} />
            PDF
          </a>
        </span>
      </div>
    </article>
  )
}

export function Publications() {
  return (
    <section id="research" aria-labelledby="research-heading" className="px-3 pt-16 md:px-8 md:pt-20">
      <div className="mx-auto flex max-w-[71rem] flex-col gap-7">
        <SectionTitle
          id="research-heading"
          label="Peer-reviewed journals"
          before="Published"
          highlight="research"
          blurb="Image classification studies on lightweight and transfer-learned CNNs."
        />
        <ul aria-label="Journal articles" className="grid gap-4 md:grid-cols-2">
          {publications.map((paper, index) => (
            <Reveal as="li" key={paper.href} className="h-full" delay={index * 0.08}>
              <PaperCard paper={paper} resultColor={RESULT_COLORS[index % RESULT_COLORS.length]} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

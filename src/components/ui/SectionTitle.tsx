interface SectionTitleProps {
  id: string
  /** Small mono kicker above the heading, e.g. "Production showcases". */
  label: string
  before: string
  /** The highlighted last word, drawn in blue with a coral underline. */
  highlight: string
  blurb?: string
}

export function SectionTitle({ id, label, before, highlight, blurb }: SectionTitleProps) {
  return (
    <div className="flex flex-col gap-4 px-1 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col items-start gap-3">
        <p className="rounded-md border-[1.5px] border-blue/40 bg-blue-soft px-2.5 py-1 font-mono text-[0.68rem] font-bold tracking-[0.08em] text-blue uppercase">
          {label}
        </p>
        <h2 id={id} className="text-[2rem] leading-tight font-bold tracking-[-0.035em] md:text-[2.6rem]">
          {before}{' '}
          <span className="text-blue underline decoration-coral decoration-[3px] underline-offset-[6px]">{highlight}</span>
        </h2>
      </div>
      {blurb && <p className="max-w-sm text-[0.95rem] text-pretty text-muted md:text-right">{blurb}</p>}
    </div>
  )
}

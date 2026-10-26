import { GithubLogoIcon, LinkedinLogoIcon, type Icon } from '@phosphor-icons/react'
import { profile } from '../../data/profile'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { CopyEmailButton } from './CopyEmailButton'

const SOCIAL_LINKS: Array<{ label: string; href: string; icon: Icon }> = [
  { label: 'LinkedIn', href: profile.links.linkedin, icon: LinkedinLogoIcon },
  { label: 'GitHub', href: profile.links.github, icon: GithubLogoIcon },
]

export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-heading">
      <Reveal>
        <div className="contact-pattern relative overflow-hidden border border-ink bg-surface px-6 py-12 md:px-14 md:py-16">
          <p className="relative z-10 font-mono text-xs tracking-[0.14em] text-subtle uppercase">Contact</p>
          <h2
            id="contact-heading"
            className="relative z-10 mt-4 max-w-2xl text-3xl font-medium tracking-[-0.06em] text-balance md:text-5xl md:leading-[1.08]"
          >
            Have a process that should run itself?
          </h2>
          <p className="relative z-10 mt-5 max-w-xl text-lg leading-relaxed text-muted">
            I’m open to internships, freelance automation work, and collaborations. Email is the fastest way to
            reach me.
          </p>

          <p className="relative z-10 mt-8 inline-flex items-center gap-2 text-sm font-medium">
            <span aria-hidden className="size-2 bg-ink" />
            {profile.availability}
          </p>

          <div className="relative z-10 mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
            <a
              href={`mailto:${profile.email}`}
              className="text-xl font-medium tracking-tight break-all underline decoration-line decoration-2 underline-offset-[6px] transition-colors hover:decoration-accent sm:text-3xl lg:text-4xl"
            >
              {profile.email}
            </a>
            <CopyEmailButton email={profile.email} />
          </div>

          <ul className="relative z-10 mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6">
            {SOCIAL_LINKS.map(({ label, href, icon: LinkIcon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
                >
                  <LinkIcon aria-hidden size={18} />
                  {label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  )
}

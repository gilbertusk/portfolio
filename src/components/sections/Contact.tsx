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
        <div className="contact-card">
          <div className="contact-main">
            <p className="font-mono text-xs tracking-[0.14em] text-subtle uppercase">Contact</p>
            <h2
              id="contact-heading"
              className="mt-4 max-w-2xl text-3xl font-medium tracking-[-0.06em] text-balance md:text-5xl md:leading-[1.08]"
            >
              Have a process that should run itself?
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              I’m open to internships, freelance automation work, and collaborations. Email is the fastest way to
              reach me.
            </p>

            <div className="contact-email-block mt-10">
              <span className="font-mono text-[0.65rem] tracking-[0.12em] text-subtle uppercase">Best way to reach me</span>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="contact-email-link text-xl font-medium tracking-tight break-all underline decoration-line decoration-2 underline-offset-[6px] transition-colors hover:decoration-accent sm:text-3xl lg:text-[2.15rem]"
                >
                  {profile.email}
                </a>
                <CopyEmailButton email={profile.email} />
              </div>
            </div>
          </div>

          <aside className="contact-aside" aria-label="Contact details and social links">
            <div className="contact-aside-top">
              <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.12em] uppercase">
                <span aria-hidden className="contact-status-dot" />
                Open to connect
              </span>
              <span className="font-mono text-[0.65rem] text-surface/55">GK / 2026</span>
            </div>

            <div className="contact-orbit-art" aria-hidden="true">
              <span className="contact-orbit-ring contact-orbit-ring-one" />
              <span className="contact-orbit-ring contact-orbit-ring-two" />
              <span className="contact-orbit-point contact-orbit-point-one" />
              <span className="contact-orbit-point contact-orbit-point-two" />
              <span className="contact-at-mark">@</span>
            </div>

            <div className="contact-aside-bottom">
              <div>
                <span className="block font-mono text-[0.6rem] tracking-[0.12em] text-surface/55 uppercase">Based in</span>
                <span className="mt-1 block text-sm font-medium">{profile.location}</span>
              </div>
              <ul className="flex gap-2">
            {SOCIAL_LINKS.map(({ label, href, icon: LinkIcon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  className="contact-social-link inline-flex size-10 items-center justify-center border border-surface/25 text-surface transition-colors hover:bg-surface hover:text-ink"
                >
                  <LinkIcon aria-hidden size={18} />
                </a>
              </li>
            ))}
              </ul>
            </div>
          </aside>
        </div>
      </Reveal>
    </Section>
  )
}

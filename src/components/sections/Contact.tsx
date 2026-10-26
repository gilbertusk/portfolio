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
          <div className="contact-card-heading">
            <span>Contact</span>
            <span className="contact-availability"><span aria-hidden className="contact-status-dot" />{profile.availability}</span>
          </div>

          <div className="contact-content">
            <div className="contact-copy">
              <h2
                id="contact-heading"
                className="max-w-2xl text-3xl font-medium tracking-[-0.06em] text-balance md:text-5xl md:leading-[1.08]"
              >
                Have a process that should run itself?
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                I’m open to internships, freelance automation work, and collaborations. Email is the fastest way to
                reach me.
              </p>
            </div>

            <div className="contact-direct">
              <span className="contact-kicker">Best way to reach me</span>
              <a href={`mailto:${profile.email}`} className="contact-email-link">
                {profile.email}
              </a>
              <CopyEmailButton email={profile.email} />
            </div>
          </div>

          <footer className="contact-card-footer">
            <p><span className="contact-kicker">Based in</span><span>{profile.location}</span></p>
            <ul className="contact-social-list">
              {SOCIAL_LINKS.map(({ label, href, icon: LinkIcon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (opens in a new tab)`}
                    className="contact-social-link"
                  >
                    <LinkIcon aria-hidden size={17} />
                    {label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </footer>
        </div>
      </Reveal>
    </Section>
  )
}

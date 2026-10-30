import {
  ArrowUpRightIcon,
  AsteriskIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  type Icon,
} from '@phosphor-icons/react'
import { contactCopy, profile } from '../../data/profile'
import { cn } from '../../lib/cn'
import { Reveal } from '../ui/Reveal'
import { CopyEmailButton } from './CopyEmailButton'

interface ContactLink {
  label: string
  value: string
  href: string
  icon: Icon
  iconClass: string
}

const CONTACT_LINKS: ContactLink[] = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: EnvelopeSimpleIcon, iconClass: 'bg-coral text-white' },
  { label: 'GitHub', value: 'github.com/gilbertusk', href: profile.links.github, icon: GithubLogoIcon, iconClass: 'bg-sky' },
  { label: 'LinkedIn', value: 'in/gilbertus-kristo', href: profile.links.linkedin, icon: LinkedinLogoIcon, iconClass: 'bg-lavender' },
]

function ContactCard({ label, value, href, icon: LinkIcon, iconClass }: ContactLink) {
  const isExternal = href.startsWith('http')
  return (
    <li>
      <a
        href={href}
        {...(isExternal
          ? { target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${label} (opens in a new tab)` }
          : {})}
        className="flex items-center gap-3.5 rounded-2xl bg-card p-3.5 pr-4 text-ink transition-transform motion-safe:hover:translate-x-1.5"
      >
        <span className={cn('grid size-11 shrink-0 place-items-center rounded-2xl', iconClass)}>
          <LinkIcon aria-hidden weight="bold" size={20} />
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-[0.8rem] font-medium text-muted">{label}</span>
          <span className="truncate font-semibold">{value}</span>
        </span>
        <ArrowUpRightIcon aria-hidden weight="bold" size={18} className="hidden shrink-0 sm:block" />
      </a>
    </li>
  )
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="px-3 pt-16 md:px-8 md:pt-20">
      {/* White focus rings: the default blue ring vanishes against this panel. */}
      <Reveal className="relative mx-auto flex max-w-[71rem] flex-col gap-8 overflow-hidden rounded-[1.75rem] bg-blue p-7 text-white md:flex-row md:items-center md:gap-12 md:p-14 [&_:focus-visible]:outline-white">
        <span
          aria-hidden
          className="absolute -top-20 -right-16 grid size-44 place-items-center rounded-full bg-coral pt-14 pr-12 md:-top-28 md:-right-24 md:size-[18.75rem] md:pt-24 md:pr-20"
        >
          <AsteriskIcon weight="bold" className="size-9 motion-safe:animate-spin-slow md:size-18" />
        </span>
        <span
          aria-hidden
          className="absolute -bottom-16 -left-14 size-44 rounded-full border-[28px] border-sky opacity-55"
        />

        <div className="relative flex flex-1 flex-col gap-5">
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white/14 px-3 py-1.5 text-[0.8rem] font-medium">
            <span aria-hidden className="size-2 rounded-full bg-mint motion-safe:animate-blink" />
            {profile.availability}
          </p>
          <h2
            id="contact-heading"
            className="max-w-xl text-[1.9rem] leading-[1.1] font-semibold tracking-[-0.03em] text-balance md:text-[2.5rem]"
          >
            {contactCopy.heading}
          </h2>
          <p className="max-w-md text-[1.05rem] text-pretty text-white/80">{contactCopy.body}</p>
        </div>

        <div className="relative flex w-full flex-col gap-3 md:w-96">
          <ul className="flex flex-col gap-2.5">
            {CONTACT_LINKS.map((link) => (
              <ContactCard key={link.label} {...link} />
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <CopyEmailButton email={profile.email} />
            <span className="text-sm text-white/70">{profile.location}</span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

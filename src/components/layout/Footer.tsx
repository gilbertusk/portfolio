import { profile } from '../../data/profile'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-ink">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-subtle sm:flex-row sm:justify-between md:px-8">
        <p>
          © {CURRENT_YEAR} {profile.name}
        </p>
        <p>{profile.location}</p>
      </div>
    </footer>
  )
}

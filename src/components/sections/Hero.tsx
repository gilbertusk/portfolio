import { ArrowUpRightIcon } from '@phosphor-icons/react'
import profileImage from '../../assets/profile.webp'
import { profile } from '../../data/profile'

const PHOTO_ALT = 'Portrait of Gilbertus Kristo with arms crossed, in front of a grey concrete wall'

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="hero-pattern">
      <img src={profileImage} alt={PHOTO_ALT} className="hero-background" width={853} height={893} fetchPriority="high" />
      <div aria-hidden className="hero-shade" />
      <div className="hero-shell">
        <div className="hero-topline">
          <span>01 / Portfolio</span>
          <span>{profile.location} · 2026</span>
        </div>

        <div className="hero-intro">
          <p className="hero-welcome">Welcome</p>
          <h1 id="hero-heading" className="hero-title">
            Gilbertus <span>Kristo.</span>
          </h1>
          <p className="hero-role">{profile.role}</p>
          <div className="hero-actions">
            <a href="#work" className="hero-primary-link">View my work <ArrowUpRightIcon aria-hidden size={16} /></a>
            <a href="#contact" className="hero-secondary-link">Hire me <ArrowUpRightIcon aria-hidden size={14} /></a>
          </div>
        </div>

        <div className="hero-bottom">
          <p className="hero-description">I build computer vision, OCR, and backend tools that make everyday work easier.</p>
          <p className="hero-details">{profile.availability}</p>
        </div>

        <div className="hero-proof" aria-label="Selected project results">
          <div><strong>22</strong><span>exercises recognized<br /><small>Rep Counter</small></span></div>
          <div><strong>0.939</strong><span>macro-F1 score<br /><small>Pilah · 1,836 test images</small></span></div>
          <div><strong>0</strong><span>video frames sent to server<br /><small>Rep Counter runs in browser</small></span></div>
        </div>
      </div>
    </section>
  )
}

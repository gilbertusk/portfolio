import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { Footer } from './components/layout/Footer'
import { Nav } from './components/layout/Nav'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { LazyStack } from './components/sections/LazyStack'
import { SelectedWork } from './components/sections/SelectedWork'

export default function App() {
  return (
    // LazyMotion + `m` components load only the animation features used here.
    // reducedMotion="user" honors prefers-reduced-motion: transforms drop, fades stay.
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-canvas"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">
          <Hero />
          <SelectedWork />
          <LazyStack />
          <About />
          <Contact />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}

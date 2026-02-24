import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Hero from '../components/hero.jsx'
import BackgroundGradient from '../components/BackgroundGradient.jsx'
import Navbar from '../components/Navbar.jsx'
import About from '../components/About.jsx'
import Projects from '../components/Projects.jsx'
import Skills from '../components/Skills.jsx'
import Experience from '../components/Experience.jsx'
import Contact from '../components/Contact.jsx'
import { trackVisit } from '../api'

gsap.registerPlugin(ScrollTrigger)

function Portfolio() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.2,
      infinite: false,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const rafFn = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(rafFn)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(rafFn)
    }
  }, [])

  // Track page visit
  useEffect(() => {
    trackVisit('/').catch(() => {})
  }, [])

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: '#000000', overflowX: 'hidden' }}>

      <BackgroundGradient />

      <Navbar />
      <Hero />
      <About />

      {/* ── Shared decorative rings centered at About/Skills boundary ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none"
        style={{ position: 'relative', height: 0, overflow: 'visible', zIndex: 1 }}
      >
        <div style={{
          position: 'absolute', left: '50%', top: 0,
          transform: 'translate(-50%, -50%)',
          width: 'clamp(260px, 55vw, 500px)', height: 'clamp(260px, 55vw, 500px)',
          borderRadius: '50%', border: '1px solid rgba(255,255,255,0.07)'
        }} />
        <div style={{
          position: 'absolute', left: '50%', top: 0,
          transform: 'translate(-50%, -50%)',
          width: 'clamp(400px, 80vw, 780px)', height: 'clamp(400px, 80vw, 780px)',
          borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)'
        }} />
        <div style={{
          position: 'absolute', left: '50%', top: 0,
          transform: 'translate(-50%, -50%)',
          width: 'clamp(560px, 95vw, 1080px)', height: 'clamp(560px, 95vw, 1080px)',
          borderRadius: '50%', border: '1px solid rgba(255,255,255,0.03)'
        }} />
      </div>

      <Skills />
      <Projects />
      <Experience />
      <Contact />

    </div>
  )
}

export default Portfolio

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Hero = () => {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const ctaRef = useRef(null)
  const statusRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        opacity: 0,
        y: 32,
        duration: 0.8,
        ease: 'power3.out'
      })

      gsap.from(rightRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        delay: 0.1,
        ease: 'power3.out'
      })

      gsap.from(statusRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.5,
        delay: 0.15,
        ease: 'power2.out'
      })

      if (ctaRef.current) {
        gsap.from(ctaRef.current.children, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          delay: 0.25,
          stagger: 0.08,
          ease: 'power2.out'
        })
      }

      // subtle floating motion for the right glass panel
      gsap.to(rightRef.current, {
        y: -6,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex items-center justify-center pt-32 pb-24 px-4 sm:px-6 lg:px-8"
      style={{ zIndex: 10 }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-center">
        {/* Left: Main content */}
        <div ref={leftRef}>
          <div
            ref={statusRef}
            className="inline-flex items-center px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-5 sm:mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
            <span
              className="text-xs sm:text-sm tracking-wide uppercase text-white/70"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Technology geek · Frontend
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-white mb-4 sm:mb-5"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Crafting
            {' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-sky-300 to-cyan-300">
              minimal, tech‑driven
            </span>
            {' '}
            interfaces.
          </h1>

          <p
            className="text-sm sm:text-base md:text-lg text-white/70 max-w-xl mb-6 sm:mb-8"
            style={{ fontFamily: 'Poppins, sans-serif' }}

          >
            I build fast, clean and animated web experiences that stay out of the way and let the work speak.
          </p>

          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 hover:border-white/40 text-sm sm:text-base font-medium text-white transition-all duration-300 backdrop-blur-md shadow-[0_0_40px_rgba(56,189,248,0.3)]"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              View Projects
              <span className="ml-2 text-sky-300">
                &#8599;
              </span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center px-5 sm:px-6 py-3 rounded-full border border-white/15 text-sm sm:text-base text-white/80 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Right: Techy glass panel */}
        <div className="lg:pl-4" ref={rightRef}>
          <div className="relative">
            {/* Glow ring */}
            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-tr from-sky-500/40 via-cyan-400/30 to-emerald-300/30 opacity-70 blur-2xl" />

            <div className="relative rounded-3xl border border-white/15 bg-black/40 backdrop-blur-xl px-5 sm:px-6 md:px-7 py-5 sm:py-6 md:py-7 shadow-[0_18px_60px_rgba(0,0,0,0.65)]">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/40 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    SYSTEM STATUS
                  </p>
                  <p className="text-xs sm:text-sm text-white/80" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Tech Geek · Frontend Engineer
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                  <span className="w-2 h-2 rounded-full bg-sky-400/80" />
                  <span className="w-2 h-2 rounded-full bg-cyan-300/80" />
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 mb-5 text-xs sm:text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
                  <p className="text-[11px] uppercase tracking-wide text-white/40 mb-1.5">
                    Focus
                  </p>
                  <p className="text-white/90">Frontend Systems</p>
                  <p className="text-[11px] text-white/50 mt-1">
                    React · Animation · UX
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
                  <p className="text-[11px] uppercase tracking-wide text-white/40 mb-1.5">
                    Currently exploring
                  </p>
                  <p className="text-white/90">Web performance</p>
                  <p className="text-[11px] text-white/50 mt-1">
                    Runtimes · DX · toolchains
                  </p>
                </div>
              </div>

              {/* Skill pulse bar */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-white/50" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <span>Frontend signal</span>
                  <span>98%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-[88%] bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 shadow-[0_0_18px_rgba(34,211,238,0.8)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
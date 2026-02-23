import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

import reactLogo from '../assets/images/React-icon.svg.png'
import threejsLogo from '../assets/images/threejs.png'
import pythonLogo from '../assets/images/Python-logo-notext.svg.png'
import jsLogo from '../assets/images/JavaScript-logo.png'
import githubLogo from '../assets/images/github.png'
import tailwindLogo from '../assets/images/tailwind.png'
import nextLogo from '../assets/images/next.webp'
import postmanLogo from '../assets/images/postman.svg'

const Hero = () => {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const ctaRef = useRef(null)
  const statusRef = useRef(null)
  const spotlightRef = useRef(null)
  const logoRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Animate subtle glow intensity
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0.6,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        })
      }

      // Animate logos marquee from right to left
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          xPercent: -50,
          duration: 20,
          repeat: -1,
          ease: 'none',
        })
      }

      gsap.from(leftRef.current, {
        opacity: 0,
        y: 32,
        duration: 0.8,
        ease: 'power3.out',
      })

      gsap.from(rightRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        delay: 0.1,
        ease: 'power3.out',
      })

      gsap.from(statusRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.5,
        delay: 0.15,
        ease: 'power2.out',
      })

      if (ctaRef.current) {
        gsap.from(ctaRef.current.children, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          delay: 0.25,
          stagger: 0.08,
          ease: 'power2.out',
        })
      }

      // subtle floating motion for the right glass panel
      gsap.to(rightRef.current, {
        y: -6,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Reusable tech logo tile
  const LogoTile = ({ src, alt, imgClass = 'w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10' }) => (
    <div className="w-10 h-10 sm:w-13 sm:h-13 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
      <img src={src} alt={alt} className={`${imgClass} object-contain`} />
    </div>
  )

  const logos = [
    { src: reactLogo, alt: 'React' },
    { src: threejsLogo, alt: 'Three.js' },
    { src: pythonLogo, alt: 'Python' },
    { src: jsLogo, alt: 'JavaScript' },
    { src: githubLogo, alt: 'GitHub' },
    { src: tailwindLogo, alt: 'Tailwind' },
    { src: nextLogo, alt: 'Next.js' },
    { src: postmanLogo, alt: 'Postman' },
  ]

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex items-center justify-center min-h-[100dvh] px-5 sm:px-6 lg:px-8"
      style={{ zIndex: 10 }}
    >
      {/* Inner wrapper */}
      <div className="w-full max-w-[92vw] xs:max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto text-center mt-14 sm:mt-16 md:mt-20 py-8 sm:py-0">

        {/* ── CTA pill buttons ── */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-10"
        >
          {/* Full Stack badge with glow — overflow-hidden fully contains the blur */}
          <div className="relative inline-flex items-center justify-center rounded-full overflow-hidden">
            <div
              ref={spotlightRef}
              className="absolute inset-0 rounded-full bg-[#72A9CF]/50 blur-sm"
            />
            <button className="relative inline-flex items-center justify-center px-4 sm:px-6 py-1.5 sm:py-3 rounded-full bg-black/80 border border-[#72A9CF]/50 text-white font-medium text-[11px] sm:text-sm transition-all duration-300 hover:bg-black">
              Full Stack
            </button>
          </div>

          {/* Problem Solver badge */}
          <div className="relative inline-flex items-center justify-center">
            <button className="relative inline-flex items-center justify-center px-4 sm:px-6 py-1.5 sm:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white font-medium text-[11px] sm:text-sm transition-all duration-300 hover:border-white/50 hover:bg-white/5">
              Problem Solver
            </button>
          </div>
        </div>

        {/* ── Main heading ── */}
        <h1
          ref={leftRef}
          className="text-[clamp(1.2rem,5.5vw,5rem)] font-medium leading-[1.15] mb-4 sm:mb-7 whitespace-nowrap"
        >
          <span className="text-white/50">From zero to </span>
          <span className="text-white">production.</span>
          <br />
          <span className="text-white/50">From idea to </span>
          <span className="text-white">impact.</span>
        </h1>

        {/* ── Subheading ── */}
        <p
          ref={statusRef}
          className="text-[13px] sm:text-base md:text-lg text-white/50 w-full max-w-[36ch] sm:max-w-prose mx-auto mb-8 sm:mb-14 leading-relaxed"
        >
          Udit Agrawal — I build digital products that move fast and scale faster.
          MERN stack specialist who speaks Python and thinks in systems.
        </p>

        {/* ── Tech logo marquee ── */}
        <div
          ref={rightRef}
          className="relative overflow-hidden w-full"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
          }}
        >
          <div
            ref={logoRef}
            className="flex items-center gap-4 sm:gap-6 md:gap-8 whitespace-nowrap"
          >
            {/* First set */}
            <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
              {logos.map((logo) => (
                <LogoTile key={logo.alt} {...logo} />
              ))}
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
              {logos.map((logo) => (
                <LogoTile key={`${logo.alt}-dup`} {...logo} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Hero

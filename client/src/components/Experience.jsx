import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const EXPERIENCE = [
  {
    role: 'Technical Lead',
    company: 'The Cloud Club',
    period: 'Feb 2025 – Present',
  },
  {
    role: 'Web Developer',
    company: 'Nexathread',
    period: 'Jan 2025 – Present',
  },
  {
    role: 'Web Development Intern',
    company: 'Nexathread',
    period: 'Apr 2023 – Jan 2025',
  },
]

const Experience = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const rowRefs    = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      )

      rowRefs.current.forEach((row, i) => {
        if (!row) return
        gsap.fromTo(
          row,
          { opacity: 0, y: 16 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            ease: 'power3.out',
            delay: i * 0.07,
            scrollTrigger: {
              trigger: row,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full px-5 sm:px-8 lg:px-16
                 py-20 sm:py-28 lg:py-36"
      style={{ zIndex: 10 }}
    >
      <div className="w-full max-w-5xl mx-auto">

        {/* ── Heading ── */}
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white mb-10 sm:mb-14"
          style={{ letterSpacing: '-0.03em' }}
        >
          Experience
        </h2>

        {/* ── Rows ── */}
        <div className="flex flex-col">
          {EXPERIENCE.map((item, i) => (
            <div
              key={i}
              ref={(el) => (rowRefs.current[i] = el)}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between
                         gap-1 sm:gap-0
                         py-6 sm:py-8 lg:py-9
                         border-t border-white/[0.08]
                         last:border-b last:border-white/[0.08]
                         group"
            >
              {/* Role */}
              <span
                className="text-white/80 font-light text-base sm:text-xl lg:text-2xl
                           group-hover:text-white transition-colors duration-300"
                style={{ letterSpacing: '-0.03em' }}
              >
                {item.role}
              </span>

              {/* Company + Period — left-aligned on mobile, right-aligned on sm+ */}
              <div className="sm:text-right shrink-0 sm:ml-8">
                <p
                  className="text-white/60 font-light text-sm sm:text-base"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {item.company}
                </p>
                <p
                  className="text-white/30 font-light text-xs sm:text-sm mt-0.5"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  {item.period}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Experience

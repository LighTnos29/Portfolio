import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SKILLS = [
  // Row 1 — Languages & Core
  ['JavaScript', 'TypeScript', 'Python', 'HTML & CSS', 'SQL'],
  // Row 2 — Frameworks & Libraries
  ['React.js', 'Node.js', 'Express.js', 'Next.js', 'Tailwind CSS', 'GSAP'],
  // Row 3 — Tools & Platforms
  ['MongoDB', 'PostgreSQL', 'REST APIs', 'Git & GitHub', 'Docker', '+ More'],
]

const SkillPill = ({ label, index }) => (
  <span
    data-pill
    className="inline-flex items-center px-4 py-2 rounded-xl
               border border-white/10 bg-white/[0.04]
               text-white/70 font-light text-sm
               whitespace-nowrap
               transition-all duration-300
               hover:border-white/25 hover:bg-white/[0.08] hover:text-white/90
               cursor-default select-none"
    style={{ letterSpacing: '-0.02em' }}
  >
    {label}
  </span>
)

const Skills = () => {
  const sectionRef  = useRef(null)
  const headingRef  = useRef(null)
  const rowRefs     = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading fade-in
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

      // Each row fades + slides up with stagger between rows
      rowRefs.current.forEach((row, i) => {
        if (!row) return
        const pills = row.querySelectorAll('[data-pill]')
        gsap.fromTo(
          pills,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0,
            duration: 0.55,
            ease: 'power3.out',
            stagger: 0.05,
            delay: i * 0.08,
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
      id="skills"
      ref={sectionRef}
      className="relative w-full px-5 sm:px-8 lg:px-16
                 py-20 sm:py-28 lg:py-36"
      style={{ zIndex: 10 }}
    >
      <div className="relative w-full max-w-5xl mx-auto">

        {/* ── Heading ── */}
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white mb-10 sm:mb-14"
          style={{ letterSpacing: '-0.03em' }}
        >
          Skills
        </h2>

        {/* ── Skill rows ── */}
        <div className="flex flex-col gap-4 sm:gap-5">
          {SKILLS.map((row, i) => (
            <div
              key={i}
              ref={(el) => (rowRefs.current[i] = el)}
              className="flex flex-wrap gap-2.5 sm:gap-3"
            >
              {row.map((label) => (
                <SkillPill key={label} label={label} />
              ))}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Skills

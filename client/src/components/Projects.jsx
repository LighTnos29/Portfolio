import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import ctfImg from '../assets/images/ctf.jpg'

gsap.registerPlugin(ScrollTrigger)

const NAV_H = 72

// ── Icons ─────────────────────────────────────────────────────────────────────
const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const ExternalIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
)

// ── Project data ──────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    _id: '1',
    title: 'Modernizing a Subscription Management Platform',
    domain: 'Full Stack Web',
    description: 'With a user-centered approach, the goal was to create an intuitive interface for effortless financial management while incorporating gamification.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    liveDemoUrl: '#',
    githubUrl: '#',
    image: ctfImg,
    gradient: 'linear-gradient(135deg, rgba(56,139,253,0.15) 0%, rgba(139,92,246,0.12) 60%, rgba(10,211,245,0.08) 100%), rgb(6,8,13)',
  },
  {
    _id: '2',
    title: 'Building a Real-Time Collaborative Dev Tool',
    domain: 'MERN Stack',
    description: 'Designed and engineered a live coding environment with presence indicators, conflict-free merging, and instant preview — built on the MERN stack.',
    techStack: ['React', 'Express', 'Socket.io', 'MongoDB'],
    liveDemoUrl: '#',
    githubUrl: '#',
    image: ctfImg,
    gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(6,182,212,0.12) 60%, rgba(99,102,241,0.08) 100%), rgb(6,8,13)',
  },
  {
    _id: '3',
    title: 'E-Commerce Platform with AI Recommendations',
    domain: 'Full Stack + AI',
    description: 'Full-stack storefront powered by a Python recommendation engine, featuring real-time inventory, Stripe checkout, and a headless CMS.',
    techStack: ['Next.js', 'Python', 'Stripe', 'PostgreSQL'],
    liveDemoUrl: '#',
    githubUrl: '#',
    image: ctfImg,
    gradient: 'linear-gradient(135deg, rgba(245,158,11,0.14) 0%, rgba(244,63,94,0.11) 60%, rgba(139,92,246,0.08) 100%), rgb(6,8,13)',
  },
]

// ── Card UI ───────────────────────────────────────────────────────────────────
const CardContent = ({ project, isMobile }) => (
  <div
    className="group relative w-full h-full rounded-2xl overflow-hidden border border-white/10"
    style={{ background: project.gradient }}
  >
    {isMobile ? (
      /* ── Mobile layout: image top, text below ── */
      <div className="flex flex-col h-full">
        {/* Image — fixed height at top */}
        <div className="relative w-full shrink-0 overflow-hidden" style={{ height: '42%' }}>
          {project.image ? (
            <>
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[rgb(6,8,13)] to-transparent pointer-events-none" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-white/[0.02]">
              <span className="text-white/20 text-xs uppercase tracking-widest">No image</span>
            </div>
          )}
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center flex-1 px-5 py-4 space-y-3 overflow-hidden">
          {project.domain && (
            <span className="inline-block self-start px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-widest bg-white/5 border border-white/10 text-white/50">
              {project.domain}
            </span>
          )}
          <h3 className="text-xl font-medium text-white leading-snug">{project.title}</h3>
          <p className="text-xs text-white/50 leading-relaxed line-clamp-3">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack?.map((tech) => (
              <span key={tech} className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-white/5 border border-white/10 text-white/60">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white/80 text-xs font-medium transition-all duration-300 hover:bg-white/10 hover:text-white"
              >
                Live Demo <ExternalIcon />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 text-white/50 text-xs font-medium transition-all duration-300 hover:bg-white/5 hover:text-white/80"
              >
                <GithubIcon /> GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    ) : (
      /* ── Desktop layout: text left, image right ── */
      <div className="flex flex-row h-full">
        {/* Left text */}
        <div className="flex flex-col justify-center w-[50%] shrink-0 px-8 xl:px-12 py-8 xl:py-10 space-y-4 xl:space-y-5 overflow-hidden">
          {project.domain && (
            <span className="inline-block self-start px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-widest bg-white/5 border border-white/10 text-white/50">
              {project.domain}
            </span>
          )}
          <h3 className="text-2xl lg:text-3xl xl:text-[2rem] font-medium text-white leading-snug">{project.title}</h3>
          <p className="text-sm lg:text-base text-white/50 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack?.map((tech) => (
              <span key={tech} className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/5 border border-white/10 text-white/60">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 pt-1">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-white/80 text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:text-white"
              >
                Live Demo <ExternalIcon />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-white/50 text-sm font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20 hover:text-white/80"
              >
                <GithubIcon /> GitHub
              </a>
            )}
          </div>
        </div>

        {/* Right image */}
        <div className="flex-1 relative border-l border-white/10 overflow-hidden">
          {project.image ? (
            <>
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/15 pointer-events-none" />
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-white/[0.02]">
              <span className="text-white/20 text-xs uppercase tracking-widest">No image</span>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
)

// ── Main section ──────────────────────────────────────────────────────────────
const Projects = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardRefs = useRef([])
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      )

      const cards = cardRefs.current.filter(Boolean)
      const total = cards.length
      const vh = window.innerHeight

      cards.forEach((card, i) => gsap.set(card, { y: i === 0 ? 0 : vh }))

      const tl = gsap.timeline({ paused: true })

      cards.forEach((card, i) => {
        if (i === total - 1) return
        const seg = i / (total - 1)
        const segDur = 1 / (total - 1)
        tl.to(cards[i + 1], { y: 0, ease: 'none', duration: segDur }, seg)
          .to(cards[i], { scale: 0.95, opacity: 0.6, ease: 'none', duration: segDur }, seg)
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: `top ${NAV_H}px`,
        end: `+=${(total - 1) * vh}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.6,
        animation: tl,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Heading */}
      <div
        ref={headingRef}
        className="relative px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 lg:pt-32 pb-0 max-w-6xl mx-auto"
        style={{ zIndex: 10 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight">
          Projects that <span className="text-white/40">ship.</span>
        </h2>
      </div>

      {/* Pinned stack */}
      <section
        id="work"
        ref={sectionRef}
        style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', zIndex: 10 }}
      >
        {PROJECTS.map((project, i) => (
          <div
            key={project._id}
            ref={(el) => (cardRefs.current[i] = el)}
            style={{
              position: 'absolute',
              top: `${NAV_H + 8}px`,
              bottom: isMobile ? '16px' : '24px',
              left: isMobile ? '12px' : 'clamp(16px, 3vw, 48px)',
              right: isMobile ? '12px' : 'clamp(16px, 3vw, 48px)',
              maxWidth: '82rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              zIndex: i + 1,
              willChange: 'transform, opacity',
            }}
          >
            <CardContent project={project} isMobile={isMobile} />
          </div>
        ))}
      </section>
    </>
  )
}

export default Projects

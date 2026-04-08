import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getProjects, trackProjectView, BACKEND_URL } from '../api'

const safeUrl = (url) => {
  if (!url) return null
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? url : null
  } catch {
    return null
  }
}

gsap.registerPlugin(ScrollTrigger)

const NAV_H = 72

// Gradient presets for project cards
const GRADIENTS = [
  'linear-gradient(135deg, rgba(56,139,253,0.15) 0%, rgba(139,92,246,0.12) 60%, rgba(10,211,245,0.08) 100%), rgb(6,8,13)',
  'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(6,182,212,0.12) 60%, rgba(99,102,241,0.08) 100%), rgb(6,8,13)',
  'linear-gradient(135deg, rgba(245,158,11,0.14) 0%, rgba(244,63,94,0.11) 60%, rgba(139,92,246,0.08) 100%), rgb(6,8,13)',
  'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(56,139,253,0.12) 60%, rgba(16,185,129,0.08) 100%), rgb(6,8,13)',
  'linear-gradient(135deg, rgba(244,63,94,0.15) 0%, rgba(245,158,11,0.12) 60%, rgba(56,139,253,0.08) 100%), rgb(6,8,13)',
]

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

// ── Card UI ───────────────────────────────────────────────────────────────────
const CardContent = ({ project, isMobile, onProjectClick }) => (
  <div
    className="group relative w-full h-full rounded-2xl overflow-hidden border border-white/10"
    style={{ background: project.gradient }}
  >
    {isMobile ? (
      /* ── Mobile layout: stacked ── */
      <div className="flex flex-col h-full">
        {/* Image or decorative header area */}
        <div className="relative w-full shrink-0 overflow-hidden" style={{ height: '140px' }}>
          {project.imageUrl ? (
            <>
              <img
                src={project.imageUrl.startsWith('http') ? project.imageUrl : `${BACKEND_URL}${project.imageUrl}`}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-contain object-center"
                style={{ background: 'rgb(6,8,13)' }}
              />
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[rgb(6,8,13)] to-transparent pointer-events-none" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-white/[0.02]" />
              <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
                <span className="text-4xl font-bold text-white/[0.06]" style={{ letterSpacing: '-0.05em' }}>
                  {project.title.split(' ').slice(0, 2).join(' ')}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[rgb(6,8,13)] to-transparent pointer-events-none" />
            </>
          )}
        </div>

        {/* Text */}
        <div className="flex flex-col flex-1 px-4 py-3 gap-2 overflow-y-auto">
          {project.domain && (
            <span className="inline-block self-start px-2.5 py-0.5 rounded-full text-[9px] font-medium uppercase tracking-widest bg-white/5 border border-white/10 text-white/50">
              {project.domain}
            </span>
          )}
          <h3 className="text-base font-medium text-white leading-snug">{project.title}</h3>
          <p className="text-[11px] text-white/50 leading-relaxed line-clamp-3">{project.description}</p>
          <div className="flex flex-wrap gap-1">
            {project.techStack?.map((tech) => (
              <span key={tech} className="px-2 py-0.5 rounded-lg text-[9px] font-medium bg-white/5 border border-white/10 text-white/60">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {safeUrl(project.liveDemoUrl) && (
              <a href={safeUrl(project.liveDemoUrl)} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.stopPropagation(); onProjectClick?.(project); }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 text-white/80 text-[11px] font-medium transition-all duration-300 hover:bg-white/10 hover:text-white">
                Live Demo <ExternalIcon />
              </a>
            )}
            {safeUrl(project.githubUrl) && (
              <a href={safeUrl(project.githubUrl)} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.stopPropagation(); onProjectClick?.(project); }}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/10 text-white/50 text-[11px] font-medium transition-all duration-300 hover:bg-white/5 hover:text-white/80">
                <GithubIcon /> GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    ) : (
      /* ── Desktop layout: text left, decorative right ── */
      <div className="flex flex-row h-full">
        {/* Left text */}
        <div className="flex flex-col justify-center w-[55%] shrink-0 px-8 xl:px-12 py-8 xl:py-10 space-y-4 xl:space-y-5 overflow-hidden">
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
            {safeUrl(project.liveDemoUrl) && (
              <a href={safeUrl(project.liveDemoUrl)} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.stopPropagation(); onProjectClick?.(project); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 bg-white/5 text-white/80 text-sm font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/40 hover:text-white">
                Live Demo <ExternalIcon />
              </a>
            )}
            {safeUrl(project.githubUrl) && (
              <a href={safeUrl(project.githubUrl)} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.stopPropagation(); onProjectClick?.(project); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-white/50 text-sm font-medium transition-all duration-300 hover:bg-white/5 hover:border-white/20 hover:text-white/80">
                <GithubIcon /> GitHub
              </a>
            )}
          </div>
        </div>

        {/* Right image or decorative area */}
        <div className="flex-1 relative border-l border-white/10 overflow-hidden">
          {project.imageUrl ? (
            <>
              <img
                src={project.imageUrl.startsWith('http') ? project.imageUrl : `${BACKEND_URL}${project.imageUrl}`}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ background: 'rgb(6,8,13)' }}
              />
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/30 to-transparent pointer-events-none" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-white/[0.01]" />
              <div className="relative text-center px-6">
                <span className="text-6xl xl:text-7xl font-bold text-white/[0.04]" style={{ letterSpacing: '-0.05em' }}>
                  {project.title.split(' ').slice(0, 2).join(' ')}
                </span>
              </div>
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
  const CACHE_KEY = 'portfolio_projects'
  const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

  const addGradients = (list) =>
    list.map((p, i) => ({ ...p, gradient: GRADIENTS[i % GRADIENTS.length] }))

  const getCachedProjects = () => {
    try {
      const raw = sessionStorage.getItem(CACHE_KEY)
      if (!raw) return null
      const { data, ts } = JSON.parse(raw)
      if (Date.now() - ts > CACHE_TTL) return null
      return data
    } catch { return null }
  }

  const setCachedProjects = (data) => {
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }))
    } catch { /* storage full — ignore */ }
  }

  const cached = getCachedProjects()
  const [projects, setProjects] = useState(() => cached ? addGradients(cached) : [])
  const [loading, setLoading] = useState(!cached)

  // Fetch projects from API (skips if cache is fresh, background-refreshes otherwise)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects()
        const list = data.projects || []
        setCachedProjects(list)
        setProjects(addGradients(list))
      } catch (error) {
        if (import.meta.env.DEV) console.error('Error fetching projects:', error)
        if (projects.length === 0) setProjects([])
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Setup scroll animations once projects are loaded
  useEffect(() => {
    if (loading || projects.length === 0) return

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
      if (total <= 1) return

      const sectionH = sectionRef.current?.offsetHeight || window.innerHeight
      const vh = sectionH

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
  }, [loading, projects])

  // Track project view when clicking external links
  const handleProjectClick = (project) => {
    trackProjectView(project._id, project.title).catch(() => { })
  }

  if (loading) {
    return (
      <div id="projects" className="relative w-full px-5 sm:px-8 lg:px-16 py-20 sm:py-28 lg:py-36" style={{ zIndex: 10 }}>
        <div className="w-full max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white mb-10 sm:mb-14" style={{ letterSpacing: '-0.03em' }}>
            Projects that <span className="text-white/40">ship.</span>
          </h2>
          <div className="flex flex-col gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-full h-48 sm:h-64 rounded-2xl border border-white/10 animate-pulse" style={{ background: 'rgba(255,255,255,0.03)' }} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div id="projects" className="relative w-full px-5 sm:px-8 lg:px-16 py-20 sm:py-28 lg:py-36" style={{ zIndex: 10 }}>
        <div className="w-full max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white mb-10 sm:mb-14" style={{ letterSpacing: '-0.03em' }}>
            Projects that <span className="text-white/40">ship.</span>
          </h2>
          <p className="text-white/40 text-sm">Projects coming soon...</p>
        </div>
      </div>
    )
  }

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
        id="projects"
        ref={sectionRef}
        style={{ position: 'relative', width: '100%', height: isMobile ? '85vh' : '100vh', overflow: 'hidden', zIndex: 10 }}
      >
        {projects.map((project, i) => (
          <div
            key={project._id}
            ref={(el) => (cardRefs.current[i] = el)}
            style={{
              position: 'absolute',
              top: isMobile ? `${NAV_H + 4}px` : `${NAV_H + 8}px`,
              bottom: isMobile ? '8px' : '24px',
              left: isMobile ? '8px' : 'clamp(16px, 3vw, 48px)',
              right: isMobile ? '8px' : 'clamp(16px, 3vw, 48px)',
              maxWidth: '82rem',
              marginLeft: 'auto',
              marginRight: 'auto',
              zIndex: i + 1,
              willChange: 'transform, opacity',
            }}
          >
            <CardContent project={project} isMobile={isMobile} onProjectClick={handleProjectClick} />
          </div>
        ))}
      </section>
    </>
  )
}

export default Projects

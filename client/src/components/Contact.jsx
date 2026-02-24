import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ContactPopup from './ContactPopup'

gsap.registerPlugin(ScrollTrigger)

// ── Contact ───────────────────────────────────────────────────────────────────
const Contact = () => {
    const sectionRef = useRef(null)
    const cardRef = useRef(null)
    const headingRef = useRef(null)
    const defaultRef = useRef(null)
    const hoverRef = useRef(null)
    const imgLayerRef = useRef(null)
    const [popupOpen, setPopupOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth < 768)

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768)
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    // ── Scroll-in + hard-set GSAP initial states ───────────────────────────
    useEffect(() => {
        gsap.set(hoverRef.current, { opacity: 0, y: 0 })
        gsap.set(imgLayerRef.current, { opacity: 0 })
        gsap.set(defaultRef.current, { opacity: 1, y: 0 })

        const ctx = gsap.context(() => {
            gsap.fromTo(headingRef.current,
                { opacity: 0, y: 28 },
                {
                    opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
                    scrollTrigger: { trigger: headingRef.current, start: 'top 88%', toggleActions: 'play none none none' }
                }
            )
            gsap.fromTo(cardRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.1,
                    scrollTrigger: { trigger: cardRef.current, start: 'top 88%', toggleActions: 'play none none none' }
                }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    // ── Hover (desktop only) ───────────────────────────────────────────────
    const handleMouseEnter = () => {
        if (isMobile) return
        gsap.killTweensOf([defaultRef.current, hoverRef.current, imgLayerRef.current])
        gsap.to(imgLayerRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' })
        gsap.to(defaultRef.current, { opacity: 0, y: -16, duration: 0.28, ease: 'power2.in' })
        gsap.to(hoverRef.current, { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out', delay: 0.15 })
    }
    const handleMouseLeave = () => {
        if (isMobile) return
        gsap.killTweensOf([defaultRef.current, hoverRef.current, imgLayerRef.current])
        gsap.to(imgLayerRef.current, { opacity: 0, duration: 0.38, ease: 'power2.in' })
        gsap.to(hoverRef.current, { opacity: 0, y: 16, duration: 0.25, ease: 'power2.in' })
        gsap.to(defaultRef.current, { opacity: 1, y: 0, duration: 0.38, ease: 'power2.out', delay: 0.08 })
    }

    // ── Reusable content ───────────────────────────────────────────────────
    const eyebrowDefault = (
        <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: '#4a8fa8', boxShadow: '0 0 8px rgba(74,143,168,0.8)' }} />
            <span className="font-light uppercase text-white/35"
                style={{ fontSize: 'clamp(9px, 1.8vw, 11px)', letterSpacing: '0.18em' }}>
                Available for work
            </span>
        </div>
    )

    const headlineDefault = (
        <h3 className="text-white font-medium text-center"
            style={{ fontSize: isMobile ? 'clamp(2rem, 9vw, 2.8rem)' : 'clamp(1.5rem, 5vw, 3.8rem)', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            Upgrade your web
            <br />
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>presence with me.</span>
        </h3>
    )

    const headlineHover = (
        <h3 className="text-white font-medium text-center"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 3.8rem)', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            Let's build something
            <br />
            <span style={{ color: 'rgba(230,90,80,0.95)' }}>extraordinary.</span>
        </h3>
    )

    const avatarRow = (bg) => (
        <div className="flex items-center gap-2 flex-wrap justify-center">
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                style={{ ...bg, fontSize: '10px', fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>
                UA
            </div>
            <span className="text-white/35 font-light"
                style={{ fontSize: 'clamp(10px, 1.5vw, 13px)', letterSpacing: '-0.01em' }}>
                Udit Agrawal — Full Stack Developer
            </span>
        </div>
    )

    const darkBtn = (
        <button onClick={() => setPopupOpen(true)}
            className="inline-flex items-center gap-2 rounded-full font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
                padding: 'clamp(9px, 1.5vw, 14px) clamp(18px, 3vw, 28px)',
                fontSize: 'clamp(12px, 1.5vw, 14px)',
                background: '#111',
                border: '1px solid rgba(255,255,255,0.14)',
                boxShadow: '0 2px 16px rgba(0,0,0,0.5)',
                letterSpacing: '-0.02em',
            }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#72A9CF">
                <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74z" />
            </svg>
            Hire Me
        </button>
    )

    const redBtn = (
        <button onClick={() => setPopupOpen(true)}
            className="inline-flex items-center gap-2 rounded-full font-medium text-white transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
                padding: 'clamp(9px, 1.5vw, 14px) clamp(18px, 3vw, 28px)',
                fontSize: 'clamp(12px, 1.5vw, 14px)',
                background: 'linear-gradient(135deg, #c0392b 0%, #96281b 100%)',
                border: '1px solid rgba(192,57,43,0.55)',
                boxShadow: '0 4px 28px rgba(192,57,43,0.50)',
                letterSpacing: '-0.02em',
            }}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Me
        </button>
    )

    // shared card background / border
    const cardBase = {
        borderRadius: isMobile ? '28px' : '9999px',
        background: 'linear-gradient(145deg, #293F4C 0%, #1D1D1D 50%, #111 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 12px 64px rgba(0,0,0,0.6)',
    }

    return (
        <>
            <section
                id="contact"
                ref={sectionRef}
                className="relative w-full px-4 sm:px-8 lg:px-16 py-16 sm:py-24 lg:py-36"
                style={{ zIndex: 10 }}
            >
                <div className="w-full max-w-5xl mx-auto">

                    {/* ── Heading ── */}
                    <h2
                        ref={headingRef}
                        className="font-medium text-white mb-8 sm:mb-12 lg:mb-14"
                        style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
                    >
                        Get in touch
                    </h2>

                    {/* ══════════════════════════════════════════════════════
                        MOBILE  — normal-flow card (no absolute layers)
                    ══════════════════════════════════════════════════════ */}
                    {isMobile ? (
                        <div
                            ref={cardRef}
                            className="relative w-full overflow-hidden"
                            style={cardBase}
                        >
                            {/* dot grid */}
                            <div className="absolute inset-0 pointer-events-none" style={{
                                backgroundImage: 'radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)',
                                backgroundSize: '28px 28px', zIndex: 0,
                            }} />
                            {/* shimmer line */}
                            <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{
                                background: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.06) 60%, transparent 95%)',
                                zIndex: 1,
                            }} />

                            {/* normal-flow content */}
                            <div className="relative flex flex-col items-center justify-center text-center gap-6 px-8 py-16" style={{ zIndex: 2 }}>
                                {eyebrowDefault}
                                {headlineDefault}
                                {darkBtn}
                                {avatarRow({ background: 'linear-gradient(135deg, #293F4C, #1a2e3a)', border: '1px solid rgba(255,255,255,0.12)' })}
                            </div>
                        </div>
                    ) : (
                        /* ══════════════════════════════════════════════════════
                            DESKTOP — absolute layers with hover animation
                        ══════════════════════════════════════════════════════ */
                        <div
                            ref={cardRef}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className="relative w-full overflow-hidden cursor-pointer select-none"
                            style={{ ...cardBase, minHeight: 'clamp(300px, 35vw, 460px)' }}
                        >
                            {/* dot grid */}
                            <div className="absolute inset-0 pointer-events-none" style={{
                                backgroundImage: 'radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)',
                                backgroundSize: '28px 28px', zIndex: 0,
                            }} />

                            {/* red hover layer */}
                            <div ref={imgLayerRef} className="absolute inset-0 pointer-events-none" style={{
                                opacity: 0, zIndex: 1,
                                background: `
                                    radial-gradient(ellipse 90% 70% at 50% 115%, rgba(160,20,20,0.70) 0%, rgba(100,10,10,0.40) 40%, transparent 65%),
                                    linear-gradient(160deg, rgba(140,20,20,0.18) 0%, rgba(80,8,8,0.45) 55%, rgba(20,0,0,0.72) 100%)
                                `,
                            }} />

                            {/* shimmer top line */}
                            <div className="absolute top-0 left-0 right-0 h-px pointer-events-none" style={{
                                background: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.06) 60%, transparent 95%)',
                                zIndex: 3,
                            }} />

                            {/* DEFAULT layer */}
                            <div ref={defaultRef}
                                className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-10 text-center"
                                style={{ zIndex: 4 }}>
                                {eyebrowDefault}
                                {headlineDefault}
                                {darkBtn}
                                {avatarRow({ background: 'linear-gradient(135deg, #293F4C, #1a2e3a)', border: '1px solid rgba(255,255,255,0.12)' })}
                            </div>

                            {/* HOVER layer */}
                            <div ref={hoverRef}
                                className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-10 text-center pointer-events-none"
                                style={{ zIndex: 5 }}>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
                                        style={{ background: '#e05555', boxShadow: '0 0 10px rgba(220,60,60,0.9)' }} />
                                    <span className="font-light uppercase text-white/40"
                                        style={{ fontSize: 'clamp(9px, 1.1vw, 11px)', letterSpacing: '0.18em' }}>
                                        Open to opportunities
                                    </span>
                                </div>
                                {headlineHover}
                                <div className="pointer-events-auto">{redBtn}</div>
                                {avatarRow({ background: 'linear-gradient(135deg, #5a1a1a, #3a0e0e)', border: '1px solid rgba(192,57,43,0.25)' })}
                            </div>
                        </div>
                    )}


                    {/* ── Footer ── */}
                    <div className="mt-12 sm:mt-16 lg:mt-20 border-t border-white/[0.06] pt-6 sm:pt-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <span className="text-white/20 text-xs sm:text-sm font-light" style={{ letterSpacing: '-0.01em' }}>
                                © {new Date().getFullYear()} Lightnos.dev — Udit Agrawal
                            </span>
                            
                            {/* Social Links */}
                            <div className="flex items-center gap-3">
                                <a
                                    href="https://github.com/LighTnos29"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                                    aria-label="GitHub"
                                >
                                    <svg className="w-4 h-4 text-white/50 hover:text-white/80 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/your-linkedin-profile"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 flex items-center justify-center rounded-full backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                                    aria-label="LinkedIn"
                                >
                                    <svg className="w-4 h-4 text-white/50 hover:text-white/80 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            </div>
                            
                            <span className="text-white/15 text-[10px] sm:text-xs font-light" style={{ letterSpacing: '-0.01em' }}>
                                Built with React · GSAP · Tailwind
                            </span>
                        </div>
                    </div>

                </div>
            </section>

            <ContactPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
        </>
    )
}

export default Contact

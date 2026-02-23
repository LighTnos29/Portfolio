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
                    <div className="mt-12 sm:mt-16 lg:mt-20 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/[0.06] pt-6 sm:pt-8">
                        <span className="text-white/20 text-xs sm:text-sm font-light" style={{ letterSpacing: '-0.01em' }}>
                            © {new Date().getFullYear()} Lightnos.dev — Udit Agrawal
                        </span>
                        <span className="text-white/15 text-[10px] sm:text-xs font-light" style={{ letterSpacing: '-0.01em' }}>
                            Built with React · GSAP · Tailwind
                        </span>
                    </div>

                </div>
            </section>

            <ContactPopup isOpen={popupOpen} onClose={() => setPopupOpen(false)} />
        </>
    )
}

export default Contact

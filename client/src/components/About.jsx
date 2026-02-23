import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Pill — pure black, text glow sweeps across the label ─────────────────────
const Pill = ({ children, delay = '0s' }) => (
    <span
        className="relative inline-flex items-center px-3 py-[1px] rounded-full
               mx-1 align-middle whitespace-nowrap overflow-hidden"
        style={{ background: '#000', border: '1px solid rgba(255,255,255,0.25)' }}
    >
        {/* Base text */}
        <span
            className="relative z-10 font-light"
            style={{ fontSize: '0.68em', letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.55)' }}
        >
            {children}
        </span>
        {/* Glow sweep — clipped to text shape */}
        <span
            aria-hidden="true"
            className="absolute inset-0 z-20 font-light flex items-center justify-center pointer-events-none"
            style={{
                fontSize: '0.68em',
                letterSpacing: '-0.01em',
                background: 'linear-gradient(90deg, transparent 0%, transparent 35%, rgba(255,255,255,1) 50%, transparent 65%, transparent 100%)',
                backgroundSize: '400% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'pill-text-shine 14s ease-in-out infinite',
                animationDelay: delay,
            }}
        >
            {children}
        </span>
    </span>
)

// ── About ─────────────────────────────────────────────────────────────────────
const About = () => {
    const sectionRef = useRef(null)
    const paraRef = useRef(null)
    const statsRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const lines = paraRef.current?.querySelectorAll('[data-line]') ?? []
            gsap.fromTo(lines,
                { opacity: 0, y: 18 },
                {
                    opacity: 1, y: 0,
                    duration: 0.65,
                    ease: 'power3.out',
                    stagger: 0.06,
                    scrollTrigger: {
                        trigger: paraRef.current,
                        start: 'top 82%',
                        toggleActions: 'play none none none',
                    },
                }
            )
            gsap.fromTo(statsRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: 'top 88%',
                        toggleActions: 'play none none none',
                    },
                }
            )
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative w-full flex items-center justify-center
                 px-5 sm:px-10 md:px-16 lg:px-24
                 py-16 sm:py-24 lg:py-36"
            style={{ zIndex: 10 }}
        >
            <div className="relative w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto text-center">

                {/* ── Bio ── */}
                <div
                    ref={paraRef}
                    style={{
                        fontSize: 'clamp(0.85rem, 2.2vw, 1.75rem)',
                        fontWeight: 300,
                        lineHeight: 2.8,
                        color: 'rgba(255,255,255,0.55)',
                        letterSpacing: '-0.03em',
                    }}
                >
                    <span data-line className="inline">Full-stack developer and&nbsp;</span>
                    <span data-line className="inline"><Pill delay="0s">MERN Stack</Pill></span>
                    <span data-line className="inline">&nbsp;specialist with over&nbsp;</span>
                    <span data-line className="inline"><Pill delay="0.8s">3 years</Pill></span>
                    <span data-line className="inline">&nbsp;of experience. Expertise extends to&nbsp;</span>
                    <span data-line className="inline"><Pill delay="1.6s">Python</Pill></span>
                    <span data-line className="inline">&nbsp;and&nbsp;</span>
                    <span data-line className="inline"><Pill delay="2.4s">AI Development</Pill></span>
                    <span data-line className="inline">, enabling me to build</span>
                    <span data-line className="inline">&nbsp;scalable systems. I go by&nbsp;</span>
                    <span data-line className="inline"><Pill delay="3.2s">Lightnos.dev</Pill></span>
                    <span data-line className="inline" style={{ color: 'rgba(255,255,255,0.8)' }}>
                        &nbsp;— shipping products that move fast.
                    </span>
                </div>

                {/* ── Stats ── */}
                <div
                    ref={statsRef}
                    className="flex flex-wrap justify-center
                     gap-x-6 gap-y-6
                     sm:gap-x-10 sm:gap-y-6
                     lg:gap-x-16
                     mt-10 sm:mt-14 lg:mt-20"
                >
                    {[
                        { value: '10+', label: 'Projects Shipped' },
                        { value: '3+', label: 'Years Experience' },
                        { value: 'MERN', label: 'Core Stack' },
                        { value: '∞', label: 'Problems Solved' },
                    ].map(({ value, label }) => (
                        <div key={label} className="flex flex-col items-center gap-1">
                            <span
                                className="text-white"
                                style={{
                                    fontSize: 'clamp(0.9rem, 1.6vw, 1.5rem)',
                                    fontWeight: 300,
                                    letterSpacing: '-0.04em',
                                }}
                            >
                                {value}
                            </span>
                            <span className="text-[9px] sm:text-[10px] lg:text-xs text-white/30 uppercase tracking-widest font-light">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default About

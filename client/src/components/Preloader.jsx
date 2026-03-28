import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const Preloader = ({ onComplete }) => {
  const overlayRef = useRef(null)
  const counterRef = useRef(null)
  const lineRef = useRef(null)
  const lineGlowRef = useRef(null)
  const nameRef = useRef(null)
  const tagRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Name + tag slide in
      tl.fromTo(nameRef.current,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' },
        0.1
      )
      tl.fromTo(tagRef.current,
        { opacity: 0, x: -6 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' },
        0.25
      )

      // Counter fades in
      tl.fromTo(counterRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' },
        0.15
      )

      // Progress line fills
      tl.to(lineRef.current, {
        scaleX: 1,
        duration: 2.4,
        ease: 'expo.inOut',
      }, 0.3)

      // Glow follows line
      tl.fromTo(lineGlowRef.current,
        { xPercent: -100 },
        { xPercent: 0, duration: 2.4, ease: 'expo.inOut' },
        0.3
      )

      // Counter 0 → 100 — DOM-driven, no React state
      tl.to({ val: 0 }, {
        val: 100,
        duration: 2.4,
        ease: 'expo.inOut',
        onUpdate: function () {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(this.targets()[0].val)
          }
        },
      }, 0.3)

      // Hold at 100
      tl.to({}, { duration: 0.4 })

      // ── Exit ──

      tl.to([nameRef.current, tagRef.current], {
        opacity: 0, y: -8, duration: 0.3, ease: 'power3.in',
      })
      tl.to(counterRef.current, {
        opacity: 0, y: -12, duration: 0.3, ease: 'power3.in',
      }, '<')
      tl.to([lineRef.current, lineGlowRef.current?.parentElement], {
        opacity: 0, duration: 0.25, ease: 'power2.in',
      }, '<+0.05')

      // Overlay wipes up
      tl.to(overlayRef.current, {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut',
        onComplete: () => onComplete?.(),
      }, '-=0.1')

    }, overlayRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0"
      style={{ zIndex: 9999, backgroundColor: '#000000' }}
    >
      {/* Bottom content */}
      <div
        className="absolute bottom-0 left-0 right-0 flex flex-col"
        style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}
      >
        {/* Row: name left, counter right */}
        <div
          className="flex items-end justify-between"
          style={{ marginBottom: 'clamp(1rem, 3vw, 1.5rem)' }}
        >
          {/* Left: name stack */}
          <div className="flex flex-col" style={{ gap: 'clamp(2px, 0.5vw, 6px)' }}>
            <span
              ref={nameRef}
              className="text-white tracking-tighter"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
                opacity: 0,
              }}
            >
              Lightnos<span className="text-white/35">.dev</span>
            </span>
            <span
              ref={tagRef}
              className="text-white/15 uppercase font-medium"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(0.55rem, 1vw, 0.7rem)',
                letterSpacing: '0.25em',
                opacity: 0,
              }}
            >
              Portfolio &mdash; 2025
            </span>
          </div>

          {/* Right: counter — driven via ref, no re-renders */}
          <span
            ref={counterRef}
            className="text-white tabular-nums font-medium leading-none"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(3.5rem, 12vw, 9rem)',
              letterSpacing: '-0.06em',
              opacity: 0,
            }}
          >
            0
          </span>
        </div>

        {/* Progress line */}
        <div className="relative w-full overflow-hidden" style={{ height: '1px' }}>
          <div className="absolute inset-0 bg-white/[0.06]" />
          <div
            ref={lineRef}
            className="absolute inset-0"
            style={{
              transformOrigin: 'left',
              transform: 'scaleX(0)',
              background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.5) 100%)',
            }}
          />
          {/* Glow that travels with the fill edge */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              ref={lineGlowRef}
              className="absolute right-0 top-1/2 -translate-y-1/2"
              style={{
                width: '80px',
                height: '16px',
                background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.6) 0%, transparent 70%)',
                filter: 'blur(3px)',
                transform: 'translateX(-100%)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preloader

import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE
const EMAILJS_TEMPLATE_NOTIFY = import.meta.env.VITE_EMAILJS_TEMPLATE_NOTIFY
const EMAILJS_TEMPLATE_REPLY = import.meta.env.VITE_EMAILJS_TEMPLATE_REPLY
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const ContactPopup = ({ isOpen, onClose }) => {
    const overlayRef = useRef(null)
    const modalRef = useRef(null)
    const [form, setForm] = useState({ name: '', email: '', message: '' })
    const [status, setStatus] = useState('idle')
    const [isMobile, setIsMobile] = useState(
        typeof window !== 'undefined' && window.innerWidth < 768
    )

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 768)
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    useEffect(() => {
        if (!isOpen) {
            document.body.style.overflow = ''
            return
        }
        document.body.style.overflow = 'hidden'
        setForm({ name: '', email: '', message: '' })
        setStatus('idle')

        gsap.set(modalRef.current, { clearProps: 'all' })
        gsap.set(overlayRef.current, { opacity: 0 })
        gsap.set(modalRef.current, { opacity: 0, scale: 0.96 })
        gsap.to(overlayRef.current, { opacity: 1, duration: 0.25, ease: 'power2.out' })
        gsap.to(modalRef.current, { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out', delay: 0.05 })
    }, [isOpen])

    const handleClose = () => {
        gsap.to(modalRef.current, { opacity: 0, scale: 0.96, duration: 0.22, ease: 'power2.in' })
        gsap.to(overlayRef.current, { opacity: 0, duration: 0.28, ease: 'power2.in', delay: 0.04, onComplete: onClose })
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('sending')

        const templateParams = {
            name: form.name,
            email: form.email,
            to_email: form.email,  // explicit recipient for auto-reply
            to_name: form.name,
            message: form.message,
            year: new Date().getFullYear(),
        }

        try {
            // 1️⃣ Notify you
            await emailjs.send(
                EMAILJS_SERVICE,
                EMAILJS_TEMPLATE_NOTIFY,
                templateParams,
                EMAILJS_PUBLIC_KEY
            )
            // 2️⃣ Auto-reply to sender
            await emailjs.send(
                EMAILJS_SERVICE,
                EMAILJS_TEMPLATE_REPLY,
                templateParams,
                EMAILJS_PUBLIC_KEY
            )
            setStatus('sent')
        } catch (err) {
            setStatus('error')
        }
    }

    if (!isOpen) return null

    const inputCls = `w-full rounded-2xl font-light text-white
                      placeholder-white/25 outline-none transition-all duration-200
                      bg-white/5 border border-white/10
                      focus:bg-white/10 focus:border-white/25`

    return (
        /* ── Backdrop ── */
        <div
            ref={overlayRef}
            onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
            style={{
                position: 'fixed', inset: 0, zIndex: 200,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: isMobile ? '16px' : '32px',
                backgroundColor: 'rgba(0,0,0,0.65)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
            }}
        >
            {/* ── Modal ── */}
            <div
                ref={modalRef}
                style={{
                    position: 'relative',
                    width: isMobile ? 'calc(100vw - 32px)' : 'min(860px, calc(100vw - 64px))',
                    maxHeight: '92dvh',
                    overflowY: 'auto',
                    borderRadius: '24px',
                    background: 'rgba(8,8,8,0.80)',
                    border: '1px solid rgba(255,255,255,0.11)',
                    backdropFilter: 'blur(28px)',
                    WebkitBackdropFilter: 'blur(28px)',
                    boxShadow: '0 0 0 1px rgba(255,255,255,0.04) inset, 0 40px 100px rgba(0,0,0,0.85)',
                }}
            >
                {/* top shimmer */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 1, pointerEvents: 'none',
                    background: 'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.13) 50%, transparent 90%)',
                }} />

                {/* ── Close button (always top-right) ── */}
                <button
                    onClick={handleClose}
                    aria-label="Close"
                    style={{
                        position: 'absolute', top: 20, right: 20, zIndex: 10,
                        width: 36, height: 36, borderRadius: '50%',
                        border: '1px solid rgba(255,255,255,0.15)',
                        background: 'rgba(255,255,255,0.07)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'rgba(255,255,255,0.55)', cursor: 'pointer',
                        transition: 'all 0.2s',
                    }}
                >
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* ── Layout: single col on mobile, two col on desktop ── */}
                <div style={{
                    display: isMobile ? 'block' : 'grid',
                    gridTemplateColumns: isMobile ? undefined : '1fr 1.4fr',
                }}>

                    {/* ── LEFT: info panel ── */}
                    <div style={{
                        padding: isMobile ? '32px 24px 20px' : '48px 40px 48px 44px',
                        display: 'flex', flexDirection: 'column',
                        justifyContent: 'space-between', gap: 24,
                        borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.07)',
                        borderBottom: isMobile ? '1px solid rgba(255,255,255,0.07)' : 'none',
                    }}>
                        <div>
                            <p style={{
                                color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 300,
                                textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 14,
                            }}>
                                Contact
                            </p>
                            <h2 style={{
                                color: '#fff', fontWeight: 500, margin: 0,
                                fontSize: isMobile ? '1.6rem' : 'clamp(1.6rem, 2.8vw, 2.4rem)',
                                letterSpacing: '-0.04em', lineHeight: 1.15,
                            }}>
                                Let's build<br />something great.
                            </h2>
                            <p style={{
                                color: 'rgba(255,255,255,0.38)', fontWeight: 300, marginTop: 16,
                                fontSize: isMobile ? 13 : 'clamp(13px, 1.1vw, 15px)',
                                letterSpacing: '-0.01em', lineHeight: 1.6,
                            }}>
                                I'll get back to you within 24 hours. Whether it's a project idea, a question, or just a hello.
                            </p>
                        </div>

                        {/* contact info chips */}
                        {!isMobile && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {[
                                    { icon: '✉', label: 'udit.2012005@gmail.com' },
                                    { icon: '⚡', label: 'Available for freelance' },
                                ].map(({ icon, label }) => (
                                    <div key={label} style={{
                                        display: 'flex', alignItems: 'center', gap: 10,
                                        padding: '9px 14px', borderRadius: 12,
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                    }}>
                                        <span style={{ fontSize: 13 }}>{icon}</span>
                                        <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, fontWeight: 300, letterSpacing: '-0.01em' }}>
                                            {label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* ── RIGHT: form ── */}
                    <div style={{ padding: isMobile ? '20px 24px 28px' : '48px 44px 48px 40px' }}>
                        {status === 'error' ? (

                            /* error */
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, minHeight: isMobile ? 'auto' : '100%', textAlign: 'center', padding: '24px 0' }}>
                                <div style={{
                                    width: 52, height: 52, borderRadius: '50%',
                                    background: 'rgba(192,57,43,0.12)', border: '1px solid rgba(192,57,43,0.3)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <svg width="22" height="22" fill="none" stroke="rgba(220,80,60,0.9)" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <p style={{ color: '#fff', fontWeight: 500, fontSize: 17, letterSpacing: '-0.02em' }}>Something went wrong</p>
                                <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 13, fontWeight: 300 }}>
                                    Please try again or email me directly at<br />
                                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>udit.2012005@gmail.com</span>
                                </p>
                                <button onClick={() => setStatus('idle')} style={{
                                    marginTop: 4, padding: '9px 24px', borderRadius: 999,
                                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)',
                                    color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 500,
                                    cursor: 'pointer', letterSpacing: '-0.01em', transition: 'all 0.2s',
                                }}>
                                    Try again
                                </button>
                            </div>

                        ) : status === 'sent' ? (

                            /* success */
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, minHeight: isMobile ? 'auto' : '100%', textAlign: 'center', padding: '24px 0' }}>
                                <div style={{
                                    width: 52, height: 52, borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p style={{ color: '#fff', fontWeight: 500, fontSize: 17, letterSpacing: '-0.02em' }}>Message sent!</p>
                                <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 13, fontWeight: 300 }}>
                                    Thanks for reaching out. I'll be in touch shortly.
                                </p>
                                <button onClick={handleClose} style={{
                                    marginTop: 4, padding: '9px 24px', borderRadius: 999,
                                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)',
                                    color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 500,
                                    cursor: 'pointer', letterSpacing: '-0.01em', transition: 'all 0.2s',
                                }}>
                                    Close
                                </button>
                            </div>

                        ) : (

                            /* form */
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>

                                {[
                                    { field: 'Name', type: 'text', placeholder: 'Your name' },
                                    { field: 'Email', type: 'email', placeholder: 'your@email.com' },
                                ].map(({ field, type, placeholder }) => (
                                    <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                                        <label style={{
                                            color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: 300,
                                            textTransform: 'uppercase', letterSpacing: '0.14em', paddingLeft: 2,
                                        }}>
                                            {field}
                                        </label>
                                        <input
                                            type={type} name={field.toLowerCase()} required
                                            value={form[field.toLowerCase()]} onChange={handleChange}
                                            placeholder={placeholder}
                                            className={inputCls}
                                            style={{ padding: '12px 16px', fontSize: 14, letterSpacing: '-0.01em' }}
                                        />
                                    </div>
                                ))}

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
                                    <label style={{
                                        color: 'rgba(255,255,255,0.35)', fontSize: 10, fontWeight: 300,
                                        textTransform: 'uppercase', letterSpacing: '0.14em', paddingLeft: 2,
                                    }}>
                                        Message
                                    </label>
                                    <textarea
                                        name="message" required
                                        rows={isMobile ? 4 : 5}
                                        value={form.message} onChange={handleChange}
                                        placeholder="What would you like to discuss?"
                                        className={`${inputCls} resize-none`}
                                        style={{ padding: '12px 16px', fontSize: 14, letterSpacing: '-0.01em', flex: 1 }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    style={{
                                        width: '100%', padding: '14px', marginTop: 2,
                                        borderRadius: 16, fontWeight: 500, fontSize: 14,
                                        color: '#fff', letterSpacing: '-0.02em',
                                        background: 'rgba(255,255,255,0.09)',
                                        border: '1px solid rgba(255,255,255,0.18)',
                                        cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                                        opacity: status === 'sending' ? 0.55 : 1,
                                        transition: 'all 0.25s',
                                    }}
                                >
                                    {status === 'sending' ? (
                                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                                            <svg className="animate-spin" width="15" height="15" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Sending…
                                        </span>
                                    ) : 'Send Message'}
                                </button>

                            </form>
                        )}
                    </div>

                </div>

                {/* safe-area bottom gap */}
                <div style={{ height: 'env(safe-area-inset-bottom, 12px)' }} />
            </div>
        </div>
    )
}

export default ContactPopup

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLogin } from '../api'

const AdminLogin = () => {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await adminLogin(code)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message || 'Invalid access code')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#000' }}>
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-15"
          style={{ backgroundColor: '#8B5CF6', filter: 'blur(100px)', left: '30%', top: '20%' }} />
        <div className="absolute w-[300px] h-[300px] rounded-full opacity-10"
          style={{ backgroundColor: '#93C5FD', filter: 'blur(80px)', right: '20%', bottom: '30%' }} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back link */}
        <a href="/"
          className="inline-flex items-center gap-2 text-white/40 text-sm font-light mb-8 hover:text-white/70 transition-colors">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to portfolio
        </a>

        {/* Login card */}
        <div className="rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(8,8,8,0.80)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(28px)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.04) inset, 0 40px 100px rgba(0,0,0,0.85)',
          }}>
          {/* Shimmer line */}
          <div style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.13) 50%, transparent 90%)',
          }} />

          <div className="p-8 sm:p-10">
            {/* Header */}
            <div className="mb-8">
              <p className="text-white/30 text-[10px] font-light uppercase tracking-[0.2em] mb-3">Admin Access</p>
              <h1 className="text-white text-2xl sm:text-3xl font-medium" style={{ letterSpacing: '-0.04em' }}>
                Welcome back.
              </h1>
              <p className="text-white/35 text-sm font-light mt-2" style={{ letterSpacing: '-0.01em' }}>
                Enter your access code to continue.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-white/30 text-[10px] font-light uppercase tracking-[0.14em] block mb-2 pl-0.5">
                  Access Code
                </label>
                <input
                  type="password"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter your secret code"
                  required
                  className="w-full rounded-2xl font-light text-white placeholder-white/20 outline-none transition-all duration-200
                             bg-white/5 border border-white/10 focus:bg-white/10 focus:border-white/25
                             px-4 py-3.5 text-sm"
                  style={{ letterSpacing: '-0.01em' }}
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <svg width="14" height="14" fill="none" stroke="rgba(239,68,68,0.8)" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="text-red-400/80 text-xs font-light">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl font-medium text-white text-sm transition-all duration-300"
                style={{
                  padding: '14px',
                  background: 'rgba(255,255,255,0.09)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.55 : 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin" width="15" height="15" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Authenticating...
                  </span>
                ) : 'Enter Dashboard'}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/15 text-[10px] font-light mt-6" style={{ letterSpacing: '-0.01em' }}>
          Lightnos.dev — Admin Panel
        </p>
      </div>
    </div>
  )
}

export default AdminLogin

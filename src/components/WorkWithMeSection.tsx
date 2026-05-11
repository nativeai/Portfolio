'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Turnstile } from '@marsidev/react-turnstile'

const engagementModes = [
  {
    mode: 'Build',
    description:
      'Design and implement operational and RevOps systems from the ground up — CRM structure, pipeline frameworks, reporting dashboards, and cross-functional workflows.',
    bestFor: 'Early-stage companies establishing their first operational infrastructure',
  },
  {
    mode: 'Fix',
    description:
      'Diagnose and repair broken processes across sales, customer support, logistics, or operations — identifying root causes and implementing durable solutions.',
    bestFor: 'Companies experiencing growing pains or declining performance metrics',
  },
  {
    mode: 'Scale',
    description:
      'Optimize existing systems to improve efficiency, visibility, and growth capacity — removing bottlenecks and building for the next stage of the business.',
    bestFor: 'Companies preparing for a funding round, expansion, or significant team growth',
  },
]

const WorkWithMeSection = () => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [turnstileReady, setTurnstileReady] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const handler = () => {
      setShowForm(true)
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }
    window.addEventListener('open-contact-form', handler)
    return () => window.removeEventListener('open-contact-form', handler)
  }, [])

  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Unblock the form if Turnstile never fires (missing key, ad blocker, etc.)
  useEffect(() => {
    if (!showForm) return
    const timeout = setTimeout(() => setTurnstileReady(true), 6000)
    return () => clearTimeout(timeout)
  }, [showForm])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitStatus('idle')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken }),
      })
      if (res.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTurnstileToken(null)
        setTurnstileReady(false)
        setTimeout(() => {
          setShowForm(false)
          setSubmitStatus('idle')
        }, 2500)
      } else {
        const data = await res.json().catch(() => ({}))
        console.error('Contact form error:', res.status, data)
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="relative py-24 px-6 sm:px-12 lg:px-24 xl:px-32 max-w-7xl mx-auto"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="font-display text-3xl font-bold text-white">Work With Me</h2>
        <div className="w-12 h-1 bg-gold-accent rounded-full mt-3" />
      </motion.div>

      {/* Engagement mode cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {engagementModes.map((item, index) => (
          <motion.div
            key={item.mode}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-primary-700/40 rounded-md p-6 border border-primary-600/30 hover:border-gold/40 transition-colors duration-200"
          >
            <p className="text-gold font-display text-xl font-bold">{item.mode}</p>
            <div className="w-8 h-0.5 bg-gold-accent mt-2 mb-4" />
            <p className="text-primary-100 text-sm leading-relaxed">{item.description}</p>
            <p className="text-primary-300 text-xs mt-4 font-semibold uppercase tracking-wide">Best for:</p>
            <p className="text-primary-200 text-xs mt-1">{item.bestFor}</p>
          </motion.div>
        ))}
      </div>

      {/* Closing copy + CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 text-center"
      >
        <h3 className="font-display text-2xl font-bold text-white">
          If your systems are slowing growth — I can help fix that.
        </h3>

        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <a
            href="#contact"
            className="bg-cta text-white px-8 py-3 rounded-md font-semibold hover:brightness-110 transition-all duration-200"
          >
            Work With Me
          </a>
          <button
            onClick={() => setShowForm(!showForm)}
            className="border border-primary-400 text-primary-100 px-8 py-3 rounded-md hover:border-gold hover:text-gold transition-all duration-200"
          >
            Send a Message
          </button>
        </div>

        {/* Inline contact form */}
        {showForm && (
          <motion.form
            ref={formRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            onSubmit={handleSubmit}
            className="mt-8 max-w-lg mx-auto text-left space-y-4"
          >
            <div>
              <label className="text-primary-300 text-xs font-semibold uppercase tracking-wide block mb-1">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-primary-800/60 border border-primary-600 text-white rounded-md px-4 py-3 w-full focus:border-gold focus:outline-none transition-colors duration-200 text-sm"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-primary-300 text-xs font-semibold uppercase tracking-wide block mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-primary-800/60 border border-primary-600 text-white rounded-md px-4 py-3 w-full focus:border-gold focus:outline-none transition-colors duration-200 text-sm"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label className="text-primary-300 text-xs font-semibold uppercase tracking-wide block mb-1">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-primary-800/60 border border-primary-600 text-white rounded-md px-4 py-3 w-full focus:border-gold focus:outline-none transition-colors duration-200 text-sm resize-none"
                placeholder="Tell me about what you're working on..."
              />
            </div>
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
              onSuccess={(token) => { setTurnstileToken(token); setTurnstileReady(true) }}
              onError={() => { setTurnstileToken(null); setTurnstileReady(true) }}
              onExpire={() => setTurnstileToken(null)}
              options={{ theme: 'dark', size: 'invisible' }}
            />
            <button
              type="submit"
              disabled={submitting || !turnstileReady}
              className="w-full bg-gold text-primary-800 font-semibold py-3 rounded-md hover:brightness-110 transition-all duration-200 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? 'Sending…' : !turnstileReady ? 'Verifying…' : 'Send Message'}
            </button>
            {submitStatus === 'success' && (
              <p className="text-center text-sm text-green-400">Message sent! Shandon will be in touch soon.</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-center text-sm text-red-400">Something went wrong. Please try again.</p>
            )}
          </motion.form>
        )}
      </motion.div>
    </section>
  )
}

export default WorkWithMeSection

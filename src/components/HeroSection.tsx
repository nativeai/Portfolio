'use client'

import { useEffect, useState } from 'react'

const LINES = [
  { text: 'Build Excellence', color: '#E8C97A', maxPx: 76, minPx: 30, wScale: 0.080 },
  { text: 'Evolve Systems',   color: '#FFFFFF', maxPx: 54, minPx: 20, wScale: 0.056 },
  { text: 'Unlock Growth',    color: '#C9A84C', maxPx: 68, minPx: 24, wScale: 0.072 },
]

// Each line's entrance takes DURATION ms.
// The next line is triggered GAP ms after the previous one starts.
const DURATION    = 1600
const GAP         = 600
const START_DELAY = 400

interface LineLayout { y: number; fontSize: number }

export default function HeroSection() {
  const [layout,          setLayout]          = useState<LineLayout[]>([])
  const [visible,         setVisible]         = useState([false, false, false])
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [hintVisible,     setHintVisible]     = useState(false)

  useEffect(() => {
    // ── Layout ──────────────────────────────────────────────────────────────
    function buildLayout(): LineLayout[] {
      const W       = window.innerWidth
      const H       = window.innerHeight
      const topBound = 78
      const midY     = topBound + (H * 0.70 - topBound) * 0.46
      const maxFs    = Math.max(26, Math.min(LINES[0].maxPx, Math.round(W * LINES[0].wScale)))
      const spacing  = maxFs * 2.2
      const firstY   = midY - spacing * (LINES.length - 1) / 2
      return LINES.map(({ maxPx, minPx, wScale }, i) => ({
        y:        firstY + i * spacing,
        fontSize: Math.max(minPx, Math.min(maxPx, Math.round(W * wScale))),
      }))
    }

    setLayout(buildLayout())
    const onResize = () => setLayout(buildLayout())
    window.addEventListener('resize', onResize)

    // ── Lock scroll ──────────────────────────────────────────────────────────
    document.body.style.overflow = 'hidden'

    // ── Sequential reveals ───────────────────────────────────────────────────
    const t0 = setTimeout(() => setVisible([true, false, false]), START_DELAY)
    const t1 = setTimeout(() => setVisible([true, true,  false]), START_DELAY + GAP)
    const t2 = setTimeout(() => setVisible([true, true,  true ]), START_DELAY + GAP * 2)

    // Subtitle + hint after last line has fully settled
    const lastLineDone = START_DELAY + GAP * 2 + DURATION
    const tSub  = setTimeout(() => { document.body.style.overflow = ''; setSubtitleVisible(true) }, lastLineDone + 100)
    const tHint = setTimeout(() => setHintVisible(true), lastLineDone + 500)

    return () => {
      [t0, t1, t2, tSub, tHint].forEach(clearTimeout)
      document.body.style.overflow = ''
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    const hide = () => { if (window.scrollY > 5) setHintVisible(false) }
    window.addEventListener('scroll', hide, { passive: true })
    return () => window.removeEventListener('scroll', hide)
  }, [])

  return (
    <section id="hero" className="relative h-screen overflow-hidden">

      {layout.map(({ y, fontSize }, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 text-center"
          style={{ top: y, transform: 'translateY(-50%)' }}
        >
          <span
            className="pointer-events-none select-none inline-block"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontWeight: 700,
              fontSize,
              lineHeight: 1,
              color:      LINES[i].color,
              willChange: 'opacity, filter, transform',
              transition: `opacity ${DURATION}ms cubic-bezier(0.22,1,0.36,1),
                           filter  ${DURATION}ms cubic-bezier(0.22,1,0.36,1),
                           transform ${DURATION}ms cubic-bezier(0.22,1,0.36,1)`,
              opacity:   visible[i] ? 1 : 0,
              filter:    visible[i] ? 'blur(0px)'  : 'blur(28px)',
              transform: visible[i] ? 'translateY(0px) scale(1)' : 'translateY(10px) scale(1.05)',
            }}
          >
            {LINES[i].text}
          </span>
        </div>
      ))}

      {/* Subtitle */}
      <div
        className="absolute left-0 right-0 flex justify-center px-6"
        style={{
          top:           '72%',
          opacity:       subtitleVisible ? 1 : 0,
          transform:     subtitleVisible ? 'translateY(0)' : 'translateY(10px)',
          transition:    'opacity 0.65s ease, transform 0.65s ease',
          pointerEvents: subtitleVisible ? 'auto' : 'none',
        }}
      >
        <p className="text-center text-primary-200 text-sm sm:text-base leading-relaxed italic max-w-2xl">
          "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
          <span className="block mt-2 not-italic text-primary-400 text-xs tracking-widest uppercase">— Aristotle</span>
        </p>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        style={{
          opacity:       hintVisible ? 0.45 : 0,
          transition:    'opacity 0.6s ease',
          pointerEvents: 'none',
        }}
      >
        <span className="text-[10px] tracking-widest uppercase text-primary-300">Scroll</span>
        <svg
          className="w-4 h-4 text-primary-300 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

    </section>
  )
}

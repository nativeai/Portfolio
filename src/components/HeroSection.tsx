'use client'

import { useEffect, useState } from 'react'

const LINES = [
  { text: 'Build Excellence', color: '#E8C97A', maxPx: 76, minPx: 30, wScale: 0.080 },
  { text: 'Evolve Systems',   color: '#FFFFFF', maxPx: 54, minPx: 20, wScale: 0.056 },
  { text: 'Unlock Growth',    color: '#C9A84C', maxPx: 68, minPx: 24, wScale: 0.072 },
]

const TYPE_SPEED  = 55  // ms per character
const LINE_PAUSE  = 320 // ms pause between lines
const START_DELAY = 500

interface LineLayout { y: number; fontSize: number }

export default function HeroSection() {
  const [layout,          setLayout]          = useState<LineLayout[]>([])
  const [charCounts,      setCharCounts]      = useState([0, 0, 0])
  const [activeLine,      setActiveLine]      = useState(-1)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [hintVisible,     setHintVisible]     = useState(false)

  useEffect(() => {
    // ── Layout ──────────────────────────────────────────────────────────────
    function buildLayout(): LineLayout[] {
      const W        = window.innerWidth
      const H        = window.innerHeight
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

    // Lock scroll immediately — released after hero finishes typing.
    // Skip the lock if the URL has a hash (tab navigation to /#about etc.).
    if (!window.location.hash) {
      document.body.style.overflow = 'hidden'
    }

    // ── Typewriter sequence ──────────────────────────────────────────────────
    const timers: ReturnType<typeof setTimeout>[] = []

    function typeLine(lineIdx: number, charIdx: number) {
      if (lineIdx >= LINES.length) {
        const tSub  = setTimeout(() => { document.body.style.overflow = ''; setSubtitleVisible(true); setActiveLine(-1) }, 300)
        const tHint = setTimeout(() => setHintVisible(true), 800)
        timers.push(tSub, tHint)
        return
      }

      if (charIdx === 0) setActiveLine(lineIdx)

      setCharCounts(prev => { const n = [...prev]; n[lineIdx] = charIdx; return n })

      if (charIdx < LINES[lineIdx].text.length) {
        timers.push(setTimeout(() => typeLine(lineIdx, charIdx + 1), TYPE_SPEED))
      } else {
        timers.push(setTimeout(() => typeLine(lineIdx + 1, 0), LINE_PAUSE))
      }
    }

    // Start hero typewriter after navbar signals it's ready.
    // Check the flag in case the event already fired before this effect ran.
    function startHero() {
      timers.push(setTimeout(() => typeLine(0, 0), START_DELAY))
    }

    if ((window as Window & { __navbarTyped?: boolean }).__navbarTyped) {
      startHero()
    } else {
      window.addEventListener('navbar-typed', startHero, { once: true })
    }

    return () => {
      window.removeEventListener('navbar-typed', startHero)
      timers.forEach(clearTimeout)
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
              color: LINES[i].color,
            }}
          >
            {LINES[i].text.slice(0, charCounts[i])}
            {activeLine === i && (
              <span
                aria-hidden="true"
                style={{
                  display:       'inline-block',
                  width:         '2px',
                  height:        '0.82em',
                  background:    LINES[i].color,
                  marginLeft:    '3px',
                  verticalAlign: 'middle',
                  animation:     'hero-cursor-blink 0.65s step-end infinite',
                }}
              />
            )}
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

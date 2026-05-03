'use client'

import { useEffect, useRef, useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Particle {
  cx: number; cy: number
  tx: number; ty: number
  color: string
  alpha: number
}

interface LineLayout {
  y: number
  fontSize: number
}

// ─── Text pixel sampler ───────────────────────────────────────────────────────

function sampleLine(
  text: string,
  font: string,
  color: string,
  W: number,
  centerY: number,
  gap: number
): Particle[] {
  const OFF_H = 160
  const off   = document.createElement('canvas')
  off.width   = W
  off.height  = OFF_H
  const ctx   = off.getContext('2d')!
  ctx.font         = font
  ctx.textAlign    = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle    = '#fff'
  ctx.fillText(text, W / 2, OFF_H / 2)

  const { data } = ctx.getImageData(0, 0, W, OFF_H)
  const pts: Particle[] = []
  const spreadX = W * 0.9
  const spreadY = W * 0.5

  for (let y = 0; y < OFF_H; y += gap) {
    for (let x = 0; x < W; x += gap) {
      if (data[(y * W + x) * 4 + 3] > 128) {
        pts.push({
          cx: (Math.random() - 0.5) * spreadX * 2 + W / 2,
          cy: (Math.random() - 0.5) * spreadY * 2 + centerY,
          tx: x,
          ty: centerY + (y - OFF_H / 2),
          color,
          alpha: 0,
        })
      }
    }
  }
  return pts
}

// ─── Line config ──────────────────────────────────────────────────────────────

const LINES = [
  { text: 'Build Excellence', color: '#E8C97A', maxPx: 76, minPx: 30, wScale: 0.080 },
  { text: 'Evolve Systems',   color: '#FFFFFF', maxPx: 54, minPx: 20, wScale: 0.056 },
  { text: 'Unlock Growth',    color: '#C9A84C', maxPx: 68, minPx: 24, wScale: 0.072 },
]

const FORM_MS   = 1300
const DOT_EASE  = 0.072
const DOT_FADE  = 0.030
const DOT_R     = 0.8
const PRE_R     = 0.55
const PRE_ALPHA = 0.09

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const pRef         = useRef<Particle[][]>(LINES.map(() => []))
  const startRef     = useRef<number[]>(LINES.map(() => -1))
  const rafRef       = useRef<number>(0)
  const ctaDoneRef   = useRef(false)
  const lineShownRef = useRef([false, false, false])

  const [layout,          setLayout]          = useState<LineLayout[]>([])
  const [linesVisible,    setLinesVisible]    = useState([false, false, false])
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [hintVisible,     setHintVisible]     = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Lock scroll while animation plays
    document.body.style.overflow = 'hidden'

    // ── Build canvas + particle sets ────────────────────────────────────────
    function build() {
      if (!canvas) return
      const W = window.innerWidth
      const H = window.innerHeight
      canvas.width  = W
      canvas.height = H

      const topBound = 78
      const midY     = topBound + (H * 0.70 - topBound) * 0.46
      const maxFs    = Math.max(26, Math.min(LINES[0].maxPx, Math.round(W * LINES[0].wScale)))
      const spacing  = maxFs * 2.2
      const firstY   = midY - spacing * (LINES.length - 1) / 2

      const newLayout: LineLayout[] = []

      pRef.current = LINES.map(({ text, color, maxPx, minPx, wScale }, i) => {
        const fs   = Math.max(minPx, Math.min(maxPx, Math.round(W * wScale)))
        const font = `700 ${fs}px "Playfair Display", Georgia, serif`
        const cy   = firstY + i * spacing
        newLayout.push({ y: cy, fontSize: fs })
        return sampleLine(text, font, color, W, cy, 4)
      })

      setLayout(newLayout)
    }

    // ── RAF loop ────────────────────────────────────────────────────────────
    function loop(ts: number) {
      if (!canvas) return
      const ctx = canvas.getContext('2d')!
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const starts = startRef.current
      let allDone  = true

      for (let li = 0; li < LINES.length; li++) {
        const ps = pRef.current[li]

        // Pre-trigger: faint scattered constellation
        if (starts[li] < 0) {
          allDone = false
          ctx.globalAlpha = PRE_ALPHA
          ctx.fillStyle   = LINES[li].color
          for (const p of ps) {
            ctx.beginPath()
            ctx.arc(p.cx, p.cy, PRE_R, 0, Math.PI * 2)
            ctx.fill()
          }
          ctx.globalAlpha = 1
          continue
        }

        const t = Math.min((ts - starts[li]) / FORM_MS, 1)

        // At 80% convergence: fade in real CSS text
        if (t >= 0.8 && !lineShownRef.current[li]) {
          lineShownRef.current[li] = true
          setLinesVisible(prev => {
            const n = [...prev]; n[li] = true; return n
          })
        }

        // Fully converged — chain the next line
        if (t >= 1) {
          if (li < LINES.length - 1 && starts[li + 1] < 0) {
            starts[li + 1] = ts
          }
          continue
        }

        allDone = false

        for (const p of ps) {
          p.cx   += (p.tx - p.cx) * DOT_EASE
          p.cy   += (p.ty - p.cy) * DOT_EASE
          p.alpha = Math.min(p.alpha + DOT_FADE, t)
          if (p.alpha < 0.015) continue
          ctx.globalAlpha = Math.min(p.alpha, 1)
          ctx.fillStyle   = p.color
          ctx.beginPath()
          ctx.arc(p.cx, p.cy, DOT_R, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.globalAlpha = 1

      if (allDone && !ctaDoneRef.current) {
        ctaDoneRef.current = true
        // Unlock scroll and reveal subtitle + scroll hint
        document.body.style.overflow = ''
        setSubtitleVisible(true)
        setTimeout(() => setHintVisible(true), 400)
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    // ── Init — auto-start line 0 after fonts load ──────────────────────────
    document.fonts.ready.then(() => {
      build()
      startRef.current[0] = performance.now()
      rafRef.current = requestAnimationFrame(loop)
    })

    // Hide scroll hint once user actually scrolls
    const hideHint = () => { if (window.scrollY > 5) setHintVisible(false) }
    window.addEventListener('scroll', hideHint, { passive: true })
    window.addEventListener('resize', build)

    return () => {
      cancelAnimationFrame(rafRef.current)
      document.body.style.overflow = ''  // always unlock on unmount
      window.removeEventListener('scroll', hideHint)
      window.removeEventListener('resize', build)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section id="hero" className="relative h-screen overflow-hidden">

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Real CSS text — fades in as each line's dots converge */}
      {layout.map(({ y, fontSize }, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 text-center pointer-events-none select-none"
          style={{
            top:        y,
            transform:  'translateY(-50%)',
            fontFamily: '"Playfair Display", Georgia, serif',
            fontWeight: 700,
            fontSize,
            lineHeight: 1,
            color:      LINES[i].color,
            opacity:    linesVisible[i] ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          {LINES[i].text}
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
          Director of Operations specializing in RevOps, customer support, logistics,
          operational systems, and global compliance for scaling companies.
        </p>
      </div>

      {/* Scroll hint — appears after all animations complete */}
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

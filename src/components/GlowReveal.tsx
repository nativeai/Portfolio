'use client'

import { useEffect, useRef, useState } from 'react'

interface GlowRevealProps {
  children: React.ReactNode
  className?: string
  color?: 'gold' | 'blue'
}

export function GlowReveal({ children, className = '', color = 'blue' }: GlowRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`glow-reveal ${inView ? `in-view glow-${color}` : ''} ${className}`}
    >
      {children}
    </div>
  )
}

'use client'

import { useEffect, useRef } from 'react'

export function AuroraBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId: number
    let scrollY = 0
    let smooth = 0

    const onScroll = () => { scrollY = window.scrollY }
    window.addEventListener('scroll', onScroll, { passive: true })

    function tick() {
      smooth += (scrollY - smooth) * 0.06
      const container = containerRef.current
      if (container) {
        const blobs = container.children
        // Each blob moves at a different rate — creates depth separation
        ;(blobs[0] as HTMLElement).style.transform = `translateY(${smooth * 0.12}px)`
        ;(blobs[1] as HTMLElement).style.transform = `translateY(${smooth * -0.08}px)`
        ;(blobs[2] as HTMLElement).style.transform = `translateY(${smooth * 0.18}px)`
        ;(blobs[3] as HTMLElement).style.transform = `translateY(${smooth * -0.05}px)`
      }
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div ref={containerRef} className="aurora-container" aria-hidden="true">
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="aurora-blob aurora-blob-4" />
    </div>
  )
}

'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MagneticProps {
  children: React.ReactNode
  strength?: number
  className?: string
}

export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { width, height, left, top } = ref.current.getBoundingClientRect()
    setPos({
      x: (e.clientX - (left + width / 2)) * strength,
      y: (e.clientY - (top + height / 2)) * strength,
    })
  }

  const reset = () => setPos({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Magnetic } from './Magnetic'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Signal the hero section that the nav is ready so its typewriter can start.
  // Set a flag first so HeroSection can detect this even if it mounts after.
  useEffect(() => {
    ;(window as Window & { __navbarTyped?: boolean }).__navbarTyped = true
    window.dispatchEvent(new CustomEvent('navbar-typed'))
  }, [])

  const navLinks = [
    { label: 'About',        anchor: 'about',        openForm: false },
    { label: 'Work',         anchor: 'work',         openForm: false },
    { label: 'Case Studies', anchor: 'case-studies', openForm: false },
    { label: 'Contact',      anchor: 'contact',      openForm: true  },
    { label: 'Resume',       anchor: 'resume',       openForm: false, href: '/resume' },
  ]

  const linkHref = (anchor: string) => isHome ? `#${anchor}` : `/#${anchor}`

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'frosted bg-primary-800/70 shadow-custom-dark border-b border-primary-600/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 xl:px-32">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Name */}
          <div className="flex items-center gap-3">
            <span className="bg-gold-accent text-primary-800 font-display font-bold rounded-md px-2 py-1 text-sm leading-none">
              SH
            </span>
            <span className="text-white font-medium text-sm">Shandon Hicks</span>
          </div>

          {/* Center: Nav links (desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Magnetic key={link.anchor} strength={0.3}>
                <a
                  href={'href' in link ? link.href : linkHref(link.anchor)}
                  onClick={link.openForm ? () => window.dispatchEvent(new CustomEvent('open-contact-form')) : undefined}
                  className="text-primary-100 hover:text-gold text-sm tracking-wide transition-colors duration-200 block py-1 px-1"
                >
                  {link.label}
                </a>
              </Magnetic>
            ))}
          </div>

          {/* Right: CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Magnetic strength={0.25}>
              <button
                onClick={() => {
                  if (isHome) {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                    window.dispatchEvent(new CustomEvent('open-contact-form'))
                  } else {
                    window.location.href = '/#contact'
                  }
                }}
                className="bg-gold-accent text-primary-800 font-semibold px-4 py-2 rounded-md text-sm hover:brightness-110 transition-all duration-200"
              >
                Work With Me
              </button>
            </Magnetic>
            <button
              className="md:hidden text-primary-100 hover:text-gold transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-primary-600/30">
            <div className="flex flex-col gap-4 mt-3">
              {navLinks.map((link) => (
                <a
                  key={link.anchor}
                  href={'href' in link ? link.href : linkHref(link.anchor)}
                  onClick={() => {
                    setMobileOpen(false)
                    if (link.openForm) window.dispatchEvent(new CustomEvent('open-contact-form'))
                  }}
                  className="text-primary-100 hover:text-gold text-sm tracking-wide transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

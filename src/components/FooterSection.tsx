'use client'

import { AiFillLinkedin } from 'react-icons/ai'

const FooterSection = () => {
  return (
    <footer className="bg-primary-800 py-12 px-6 sm:px-12 lg:px-24 xl:px-32">
      <div className="max-w-7xl mx-auto">
        {/* Top row: brand */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
          <span className="bg-gold-accent text-primary-800 font-display font-bold rounded-md px-2 py-1 text-sm leading-none w-fit">
            SH
          </span>
          <div>
            <p className="text-white font-medium text-sm">Shandon Hicks</p>
            <p className="text-primary-300 text-xs mt-0.5">Building the systems that scale companies.</p>
          </div>
        </div>

        {/* Middle row: nav links */}
        <nav className="flex flex-wrap gap-6 mb-8">
          <a href="#about" className="text-primary-300 hover:text-gold text-sm transition-colors duration-200">
            About
          </a>
          <a href="#work" className="text-primary-300 hover:text-gold text-sm transition-colors duration-200">
            Work
          </a>
          <a href="#case-studies" className="text-primary-300 hover:text-gold text-sm transition-colors duration-200">
            Case Studies
          </a>
          <a href="#contact" className="text-primary-300 hover:text-gold text-sm transition-colors duration-200">
            Contact
          </a>
        </nav>

        {/* Bottom row: social + copyright */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-primary-600/30 pt-6">
          <a
            href="https://www.linkedin.com/in/shandonhicks/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-300 hover:text-gold transition-colors duration-200 flex items-center gap-2"
            aria-label="LinkedIn"
          >
            <AiFillLinkedin size={22} />
            <span className="text-sm">LinkedIn</span>
          </a>
          <p className="text-primary-300 text-sm">
            © 2024 Shandon Hicks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection

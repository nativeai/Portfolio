'use client'

import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const NavItem = ({ active, setActive, name, route }: {
  active: string
  setActive: Function
  name: string
  route: string
}) => {
  return active === name ? (
    <span className='inline-block py-3 px-4 text-center bg-primary-500 text-white font-bold rounded-md shadow-md text-base sm:text-lg whitespace-nowrap'>
      {name}
    </span>
  ) : (
    <Link href={route}>
      <motion.span
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className='inline-block py-3 px-4 text-center cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-md transition-colors duration-fast ease-smooth text-base sm:text-lg whitespace-nowrap'
        onClick={() => setActive(name)}>
        {name}
      </motion.span>
    </Link>
  )
}

const ResumeCard = () => {
  const pathname = usePathname()
  const [active, setActive] = useState('')

  useEffect(() => {
    if (pathname === '/') setActive('Skills')
    else if (pathname === '/projects') setActive('Projects')
    else if (pathname === '/resume') setActive('Experience')
    else if (pathname === '/support') setActive('Support')
  }, [pathname])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="w-full bg-white dark:bg-dark-200 rounded-lg shadow-lg border border-gray-300 dark:border-gray-600 p-4 mb-6"
    >
      {/* Navigation Buttons */}
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
        <NavItem
          active={active}
          setActive={setActive}
          name='Skills'
          route='/'
        />
        <NavItem
          active={active}
          setActive={setActive}
          name='Experience'
          route='/resume'
        />
        <NavItem
          active={active}
          setActive={setActive}
          name='Support'
          route='/support'
        />
        <NavItem
          active={active}
          setActive={setActive}
          name='Projects'
          route='/projects'
        />
      </div>
    </motion.div>
  )
}

export default ResumeCard;
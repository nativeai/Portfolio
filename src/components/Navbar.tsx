'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const Navbar = () => {
   const pathname = usePathname()
   const [active, setActive] = useState('')

   useEffect(() => {
      if (pathname === '/') setActive('Skills')
      else if (pathname === '/projects') setActive('Projects')
      else if (pathname === '/resume') setActive('Experience')
      else if (pathname === '/support') setActive('Support')
   }, [pathname])

   return (
      <div className='flex items-center justify-center px-5 py-3 my-3'>
         <span className='text-3xl font-bold border-b-4 md:text-2xl border-blue font-hpr'>
            {active}
         </span>
      </div>
   )
}

export default Navbar

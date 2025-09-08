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
         {/* Title removed per user request */}
      </div>
   )
}

export default Navbar

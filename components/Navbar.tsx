import { useState, useEffect, FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const NavItem: FunctionComponent<{
   active: string
   setActive: Function
   name: string
   route: string
}> = ({ active, setActive, name, route }) => {
   return active !== name ? (
      <Link href={route}>
         <a>
            <span
               className='mx-2 cursor-pointer hover:border-b-4 hover:text-blue'
               onClick={() => setActive(name)}>
               {name}
            </span>
         </a>
      </Link>
   ) : null
}

const Navbar = () => {
   const { pathname } = useRouter()

   const [active, setActive] = useState('')

   //later
   useEffect(() => {
      if (pathname === '/') setActive('Skills')
      else if (pathname === '/projects') setActive('Projects')
      else if (pathname === '/resume') setActive('Experience')
      // else if (pathname === '/snippets') setActive('Code Snippets')
      else if (pathname === '/support') setActive('Support')
   }, [])

   return (
      <div className='flex items-center justify-between px-5 py-3 my-3'>
         <span className='text-3xl font-bold border-b-4 md:text-2xl border-blue font-hpr'>
            {active}
         </span>

         <div className='text-base font-normal md:text-2xl font-bold font-hpr'>
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
            {/* <NavItem
               active={active}
               setActive={setActive}
               name='Snippets'
               route='/snippets'
            /> */}
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
      </div>
   )
}

export default Navbar

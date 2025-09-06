'use client'

import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { GiTie } from "react-icons/gi";
import { SiMinutemailer } from "react-icons/si";
import { GoLocation } from "react-icons/go";
import { useTheme } from "next-themes";
import Image from "next/image";
import { FaMobileAlt, FaRegMoon, FaRegSun } from "react-icons/fa";
import { barIcons } from "../data";
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
    <span className='inline-block py-2 px-3 text-center bg-blue text-dark-500 font-bold rounded-md shadow-md text-sm whitespace-nowrap'>
      {name}
    </span>
  ) : (
    <Link href={route}>
      <motion.span
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className='inline-block py-2 px-3 text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-300 rounded-md transition-colors text-sm whitespace-nowrap'
        onClick={() => setActive(name)}>
        {name}
      </motion.span>
    </Link>
  )
}

const Sidebar = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname()
  const [active, setActive] = useState('')

  useEffect(() => {
    if (pathname === '/') setActive('Skills')
    else if (pathname === '/projects') setActive('Projects')
    else if (pathname === '/resume') setActive('Experience')
    else if (pathname === '/support') setActive('Support')
  }, [pathname])

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <>
      <Image
        src="/images/Shandon-headshot.jpg"
        alt="avatar"
        className="mx-auto rounded-lg border-2 border-blue"
        height={128}
        width={128}
        quality={100}
      />

      <div className="px-2">
        {
          //Check if message failed
          theme === "light" ? (
            <motion.a
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
             onClick={changeTheme} className="inline-block">
              <FaRegMoon className="w-8 h-8 cursor-pointer" />
              {/* <span className="text-sm font-hpr">Dark</span> */}
            </motion.a>
          ) : (
            <motion.a
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            onClick={changeTheme} className="inline-block">
              <FaRegSun className="w-8 h-8 cursor-pointer" />
              {/* <span className="text-sm font-hpr">Light</span> */}
            </motion.a>
          )
        }
      </div>
      <h3 className="my-4 text-3xl font-medium tracking-wider font-semibold">
        <span className="text-blue">Shandon</span> Hicks
      </h3>
      <p className="px-2 py-1 my-3 text-xl dark:bg-dark-200 dark:bg-black-500">
        Sr Operations, RevOps & Hardware Manager 
      </p>
      <div className="flex justify-center flex-wrap gap-4 w-full mx-auto my-5 text-blue max-w-sm">
        <motion.a
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          href="/images/ShandonResume.pdf"
          download="ShandonResume.pdf"
          className="flex flex-col items-center"
        >
          <GiTie className="w-6 h-6 m-auto cursor-pointer" />
          <span className="text-xs mt-1">Resume</span>
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          href="https://www.linkedin.com/in/shandonhicks/"
          className="flex flex-col items-center"
        >
          <AiFillLinkedin className="w-6 h-6 m-auto cursor-pointer" />
          <span className="text-xs mt-1">LinkedIn</span>
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          href="https://github.com/nativeai"
          className="flex flex-col items-center"
        >
          <AiFillGithub className="w-6 h-6 m-auto cursor-pointer" />
          <span className="text-xs mt-1">Github</span>
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.open("mailto:shandonlee@proton.me")}
          className="flex flex-col items-center cursor-pointer"
        >
          <SiMinutemailer className="w-6 h-6 m-auto cursor-pointer" />
          <span className="text-xs mt-1">Email</span>
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          href="tel:+19103362213"
          className="flex flex-col items-center"
        >
          <FaMobileAlt className="w-6 h-6 m-auto cursor-pointer" />
          <span className="text-xs mt-1">Phone</span>
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          href="https://www.google.com/maps/place/Minneapolis,+MN/@44.9706114,-93.4015693,11z/data=!3m1!4b1!4b1!4m5!3m4!1s0x52b333909377bbbd:0x939fc9842f7aee07!8m2!3d44.977753!4d-93.2650108"
          className="flex flex-col items-center"
        >
          <GoLocation className="w-6 h-6 m-auto cursor-pointer" />
          <span className="text-xs mt-1">MN, USA</span>
        </motion.a>
      </div>
      <p className="px-2 py-1 my-3 dark:bg-dark-200 dark:bg-black-500 text-sm">
        Fallon Pauite Shoshone Tribe
      </p>
      <motion.a
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
        href="/images/ShandonResume.pdf"
        download="ShandonResume.pdf"
        className="flex items-center justify-center px-2 py-1 my-2 bg-gray-200 cursor-pointer dark:bg-dark-200 dark:bg-black-500"
      >
        <GiTie className="w-6 h-6" />
        <span>Download Resume</span>
      </motion.a>

      <div className="mt-4 mb-4 flex flex-wrap justify-center items-center gap-2 sm:gap-3 max-w-md mx-auto px-2">
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

      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-6 mx-auto max-w-sm sm:max-w-md px-2">
        {barIcons.map((icon, i) => (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={icon.title}
            className="flex justify-center items-center"
          >
            <a href={icon.url} className="flex justify-center items-center p-1 sm:p-1.5" title={icon.title}>
              <icon.Icon
                style={icon.style}
                className="w-9 h-9 sm:w-11 sm:h-11 text-blue hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200"
              />
            </a>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Sidebar;

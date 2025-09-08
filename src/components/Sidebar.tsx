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
const Sidebar = () => {
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <>
      <Image
        src="/images/Shandon-headshot.jpg"
        alt="avatar"
        className="mx-auto rounded-lg border-2 border-primary-500"
        height={128}
        width={128}
        quality={100}
      />

      <div className="px-2">
        {
          //Check if message failed
          theme === "light" ? (
            <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
             onClick={changeTheme} className="inline-block">
              <FaRegMoon className="w-8 h-8 cursor-pointer" />
              {/* <span className="text-sm font-hpr">Dark</span> */}
            </motion.a>
          ) : (
            <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.15 }}
            onClick={changeTheme} className="inline-block">
              <FaRegSun className="w-8 h-8 cursor-pointer" />
              {/* <span className="text-sm font-hpr">Light</span> */}
            </motion.a>
          )
        }
      </div>
      <h3 className="my-4 text-3xl font-medium tracking-wider font-semibold">
        <span className="text-primary-500">Shandon</span> Hicks
      </h3>
      <div className="my-3 text-xl text-center">
        Sr Operations, RevOps & Hardware Manager 
      </div>
      <div className="my-3 text-sm text-center">
        Fallon Pauite Shoshone Tribe
      </div>
      <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.15 }}
        href="/images/ShandonResume.pdf"
        download="ShandonResume.pdf"
        className="flex items-center justify-center px-4 py-2 my-4 bg-primary-500 text-white cursor-pointer hover:bg-primary-600 rounded-lg transition-colors duration-fast ease-smooth font-medium"
      >
        <GiTie className="w-5 h-5 mr-2" />
        <span>Download Resume</span>
      </motion.a>
      {/* Social Links Section */}
      <div className="w-full mx-auto my-6">
        <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-xs mx-auto">
          {/* <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            href="/images/ShandonResume.pdf"
            download="ShandonResume.pdf"
            className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-fast ease-smooth"
          >
            <GiTie className="w-6 h-6 sm:w-7 sm:h-7 text-primary-500 cursor-pointer mb-1" />
            <span className="text-xs sm:text-sm font-medium text-center">Resume</span>
          </motion.a> */}
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            href="https://www.linkedin.com/in/shandonhicks/"
            className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-fast ease-smooth"
          >
            <AiFillLinkedin className="w-6 h-6 sm:w-7 sm:h-7 text-primary-500 cursor-pointer mb-1" />
            <span className="text-xs sm:text-sm font-medium text-center">LinkedIn</span>
          </motion.a>
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            href="https://github.com/nativeai"
            className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-fast ease-smooth"
          >
            <AiFillGithub className="w-6 h-6 sm:w-7 sm:h-7 text-primary-500 cursor-pointer mb-1" />
            <span className="text-xs sm:text-sm font-medium text-center">Github</span>
          </motion.a>
          
          {/* <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            onClick={() => window.open("mailto:shandonlee@proton.me")}
            className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-fast ease-smooth cursor-pointer"
          >
            <SiMinutemailer className="w-6 h-6 sm:w-7 sm:h-7 text-primary-500 cursor-pointer mb-1" />
            <span className="text-xs sm:text-sm font-medium text-center">Email</span>
          </motion.a>
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            href="tel:+19103362213"
            className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-fast ease-smooth"
          >
            <FaMobileAlt className="w-6 h-6 sm:w-7 sm:h-7 text-primary-500 cursor-pointer mb-1" />
            <span className="text-xs sm:text-sm font-medium text-center">Phone</span>
          </motion.a> */}
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            href="https://www.google.com/maps/place/Minneapolis,+MN/@44.9706114,-93.4015693,11z/data=!3m1!4b1!4b1!4m5!3m4!1s0x52b333909377bbbd:0x939fc9842f7aee07!8m2!3d44.977753!4d-93.2650108"
            className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-fast ease-smooth"
          >
            <GoLocation className="w-6 h-6 sm:w-7 sm:h-7 text-primary-500 cursor-pointer mb-1" />
            <span className="text-xs sm:text-sm font-medium text-center">Location</span>
          </motion.a>
        </div>
      </div>


      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-6 mx-auto max-w-sm sm:max-w-md px-2">
        {barIcons.map((icon, i) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            key={icon.title}
            className="flex justify-center items-center"
          >
            <a href={icon.url} className="flex justify-center items-center p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-fast ease-smooth" title={icon.title}>
              <icon.Icon
                style={icon.style}
                className="w-8 h-8 sm:w-10 sm:h-10 text-primary-500 hover:text-primary-600 transition-colors duration-fast ease-smooth"
              />
            </a>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Sidebar;

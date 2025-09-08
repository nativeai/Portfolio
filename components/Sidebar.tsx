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
        className="mx-auto rounded-lg border-2 border-blue"
        height={128}
        width={128}
        quality={100}
      />

      <div className="px-2 overflow-hidden flex justify-center">
        <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
        {
          //Check if message failed
          theme === "light" ? (
            <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
             onClick={changeTheme} className="inline-block">
              <FaRegMoon className="w-8 h-8 cursor-pointer" />
              {/* <span className="text-sm font-hpr">Dark</span> */}
            </motion.a>
          ) : (
            <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={changeTheme} className="inline-block">
              <FaRegSun className="w-8 h-8 cursor-pointer" />
              {/* <span className="text-sm font-hpr">Light</span> */}
            </motion.a>
          )
        }
        </div>
      </div>
      <h3 className="my-4 text-3xl font-medium tracking-wider font-hpr font-semibold">
        <span className="text-blue">Shandon</span> Hicks
      </h3>
      <p className="px-2 py-1 my-3 text-xl font-hpr bg-transparent">
        Sr Operations, RevOps & Hardware Manager 
      </p>
      <div className="flex justify-center sm:justify-around w-full mx-auto my-3 sm:my-5 text-blue overflow-visible sm:overflow-hidden px-1 sm:px-2 gap-2 sm:gap-1 flex-wrap sm:flex-nowrap">
        <div className="flex flex-col items-center overflow-hidden">
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.99 }}
          href="/images/ShandonResume.pdf"
          download="ShandonResume.pdf"
          className="flex flex-col items-center"
        >
          <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
            <GiTie className="w-8 h-8 cursor-pointer" />
          </div>
          <span className="text-sm font-hpr">Resume</span>
        </motion.a>
        </div>
        <div className="flex flex-col items-center overflow-hidden">
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.99 }}
          href="https://www.linkedin.com/in/shandonhicks/"
          className="flex flex-col items-center"
        >
          <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
            <AiFillLinkedin className="w-8 h-8 cursor-pointer" />
          </div>
          <span className="text-sm font-hpr">LinkedIn</span>
        </motion.a>
        </div>
        <div className="flex flex-col items-center overflow-hidden">
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.99 }}
          href="https://github.com/nativeai"
          className="flex flex-col items-center"
        >
          <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
            <AiFillGithub className="w-8 h-8 cursor-pointer" />
          </div>
          <span className="text-sm font-hpr">Github</span>
        </motion.a>
        </div>
      </div>
      <div className="flex justify-center sm:justify-around w-full mx-auto my-3 sm:my-5 text-blue overflow-visible sm:overflow-hidden px-1 sm:px-2 gap-2 sm:gap-1 flex-wrap sm:flex-nowrap">
        <div className="flex flex-col items-center overflow-hidden">
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.99 }}
          onClick={() => window.open("mailto:shandonlee@proton.me")}
          className="flex flex-col items-center"
        >
          <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
            <SiMinutemailer className="w-8 h-8 cursor-pointer" />
          </div>
          <span className="text-sm font-hpr">Email</span>
        </motion.a>
        </div>
        <div className="flex flex-col items-center overflow-hidden">
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.99 }}
          href="tel:+19103362213"
          className="flex flex-col items-center"
        >
          <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
            <FaMobileAlt className="w-8 h-8 cursor-pointer" />
          </div>
          <span className="text-sm font-hpr">Phone</span>
        </motion.a>
        </div>
        <div className="flex flex-col items-center overflow-hidden">
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.99 }}
          href="https://www.google.com/maps/place/Minneapolis,+MN/@44.9706114,-93.4015693,11z/data=!3m1!4b1!4m5!3m4!1s0x52b333909377bbbd:0x939fc9842f7aee07!8m2!3d44.977753!4d-93.2650108"
          className="flex flex-col items-center"
        >
          <div className="w-10 h-10 flex items-center justify-center overflow-hidden">
            <GoLocation className="w-8 h-8 cursor-pointer" />
          </div>
          <span className="text-sm font-hpr">MN, USA</span>
        </motion.a>
        </div>
      </div>
      <p className="px-2 py-1 my-3 text-sm font-hpr bg-transparent">
        Fallon Pauite Shoshone Tribe
      </p>
      <div className="overflow-hidden px-2">
      <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.99 }}
        href="/images/ShandonResume.pdf"
        download="ShandonResume.pdf"
        className="flex items-center justify-center px-2 py-1 my-2 bg-gray-200 cursor-pointer dark:bg-dark-200 dark:bg-black-500 font-hpr overflow-hidden"
      >
        <GiTie className="w-6 h-6" />
        <span>Download Resume</span>
      </motion.a>
      </div>
      <div className="flex flex-wrap justify-center items-start gap-2 sm:gap-3 mt-3 sm:mt-4 mb-2 mx-auto max-w-xs sm:max-w-sm md:max-w-md px-1 sm:px-2 overflow-visible">
      {barIcons.map((icon, i) => (
        <div key={icon.title} className="flex flex-col items-center overflow-visible">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.99 }}
          className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center"
        >
          <a href={icon.url} className="w-full h-full flex items-center justify-center">
            <icon.Icon
              style={icon.style}
              className="w-10 h-10 sm:w-12 sm:h-12 text-blue hover:shadow-md transition-all duration-200 flex-shrink-0"
            />
          </a>
        </motion.div>
        <span className="text-xs font-hpr mt-1 text-center text-gray-700 dark:text-gray-300">{icon.title}</span>
        </div>
      ))}
      </div>
    </>
  );
};

export default Sidebar;

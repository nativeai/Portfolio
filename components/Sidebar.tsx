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
        height="128px"
        width="128px"
        layout="intrinsic"
        quality="100"
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
      <h3 className="my-4 text-3xl font-medium tracking-wider font-hpr font-semibold">
        <span className="text-blue">Shandon</span> Hicks
      </h3>
      <p className="px-2 py-1 my-3 text-xl dark:bg-dark-200 dark:bg-black-500 font-hpr">
        Customer Success
      </p>
      <div className="flex justify-around w-9/12 mx-auto my-5 text-blue md:w-full">
        <motion.a
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          href="/images/ShandonResume.pdf"
          download="ShandonResume.pdf"
        >
          <GiTie className="w-8 h-8 m-auto cursor-pointer" />
          <span className="text-sm font-hpr">Resume</span>
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          href="https://www.linkedin.com/in/shandonhicks/"
        >
          <AiFillLinkedin className="w-8 h-8 m-auto cursor-pointer" />
          <span className="text-sm font-hpr">LinkedIn</span>
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          href="https://github.com/nativeai"
        >
          <AiFillGithub className="w-8 h-8 m-auto cursor-pointer" />{" "}
          <span className="text-sm font-hpr">Github</span>
        </motion.a>
      </div>
      <div className="flex justify-around w-9/12 mx-auto my-5 text-blue md:w-full">
        <motion.a
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.open("mailto:shandonlee@proton.me")}
        >
          <SiMinutemailer className="w-8 h-8 m-auto cursor-pointer" />{" "}
          <span className="text-sm font-hpr">Email</span>
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          href="tel:+16129006357"
        >
          <FaMobileAlt className="w-8 h-8 m-auto cursor-pointer" />
          <span className="text-sm font-hpr">Phone</span>
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          href="https://www.google.com/maps/place/Minneapolis,+MN/@44.9706114,-93.4015693,11z/data=!3m1!4b1!4m5!3m4!1s0x52b333909377bbbd:0x939fc9842f7aee07!8m2!3d44.977753!4d-93.2650108"
        >
          <GoLocation className="w-8 h-8 m-auto cursor-pointer" />
          <span className="text-sm font-hpr">MN, USA</span>
        </motion.a>
      </div>
      <p className="px-2 py-1 my-3 dark:bg-dark-200 dark:bg-black-500 text-sm font-hpr">
        Fallon Pauite Shoshone Tribe
      </p>
      <motion.a
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
        href="/images/ShandonResume.pdf"
        download="ShandonResume.pdf"
        className="flex items-center justify-center px-2 py-1 my-2 bg-gray-200 cursor-pointer dark:bg-dark-200 dark:bg-black-500 font-hpr"
      >
        <GiTie className="w-6 h-6" />
        <span>Download Resume</span>
      </motion.a>
      {barIcons.map((icon, i) => (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          key={icon.title}
          className="mx-auto"
        >
          <a href={icon.url}>
            {/* {icon.title} */}
            <icon.Icon
              style={icon.style}
              className="w-12 h-12 float-left text-blue hover:shadow-md hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200"
            />
          </a>
        </motion.div>
      ))}
    </>
  );
};

export default Sidebar;

import { FunctionComponent } from "react";

import { Skill } from "../types";
import { motion } from "framer-motion"

const Bar: FunctionComponent<{ value: Skill }> = ({
  value: { Icon, level, name },
}) => {
  const bar_width = `${level}%`;
  const variants = { 
    initial: { 
      width: 0
    },
    animate: { 
      width: bar_width,
      transition: {
        duration: 0.4
      }
    }
  }
  return (
    <div className="my-2 text-white bg-gray-300 rounded-full dark:bg-dark-300 dark:bg-black-500">
      <motion.div
        className="flex items-center px-4 py-1 rounded-full"
        style={{
          width: bar_width,
          backgroundColor: '#163E6A'
        }}
        variants={variants}
        initial="initial"
        animate="animate"
      >
        <Icon className="mr-3 text-blue" /> {name}
      </motion.div>
    </div>
  );
};
export default Bar;

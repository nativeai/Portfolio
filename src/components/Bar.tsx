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
    <div className="text-white bg-gray-300 rounded-full dark:bg-dark-300 dark:bg-black-500 h-10">
      <motion.div
        className="flex items-center px-4 py-2 rounded-full h-full"
        style={{
          width: bar_width,
          backgroundColor: '#163E6A'
        }}
        variants={variants}
        initial="initial"
        animate="animate"
      >
        <Icon className="mr-3 text-white flex-shrink-0" /> 
        <span className="text-sm font-medium truncate">{name}</span>
      </motion.div>
    </div>
  );
};
export default Bar;

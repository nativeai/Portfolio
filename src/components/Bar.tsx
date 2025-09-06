import { FunctionComponent } from "react";

import { Skill } from "../types";
import { motion } from "framer-motion"

const Bar: FunctionComponent<{ value: Skill }> = ({
  value: { Icon, level, name },
}) => {
  const bar_width = `${level}%`;
  const numLevel = parseInt(level);
  
  // Determine bar height based on skill level for visual hierarchy
  const getBarHeight = (level: number) => {
    if (level >= 90) return "h-14"; // Expert level - tallest
    if (level >= 80) return "h-12"; // Advanced level
    return "h-10"; // Standard level
  };

  // Determine text size based on bar height
  const getTextSize = (level: number) => {
    if (level >= 90) return "text-base"; 
    if (level >= 80) return "text-sm";
    return "text-sm";
  };

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
    <div className={`text-white bg-gray-300 rounded-full dark:bg-dark-300 dark:bg-black-500 ${getBarHeight(numLevel)} mb-2`}>
      <motion.div
        className="flex items-center px-4 py-2 rounded-full h-full min-w-0"
        style={{
          width: bar_width,
          backgroundColor: '#163E6A'
        }}
        variants={variants}
        initial="initial"
        animate="animate"
      >
        <Icon className="mr-3 text-white flex-shrink-0" /> 
        <span className={`${getTextSize(numLevel)} font-medium text-white overflow-hidden text-ellipsis whitespace-nowrap`}>
          {name}
        </span>
        <span className="ml-auto text-xs font-bold text-white/90 flex-shrink-0">
          {level}%
        </span>
      </motion.div>
    </div>
  );
};
export default Bar;

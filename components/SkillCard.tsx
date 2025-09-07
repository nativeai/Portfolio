import { FunctionComponent } from "react";
import { Skill } from "../types";

const SkillCard: FunctionComponent<{ value: Skill }> = ({
  value: { Icon, level, name },
}) => {
  const numLevel = parseInt(level);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Icon className="w-6 h-6 mr-3 text-blue-600" />
          <span className="font-medium text-gray-900 dark:text-gray-100">{name}</span>
        </div>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${level}%` }}
        />
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-500">{level}% proficiency</span>
      </div>
    </div>
  );
};

export default SkillCard;
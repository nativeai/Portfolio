import { FunctionComponent } from "react";
import { Skill } from "../types";

const SkillBadge: FunctionComponent<{ value: Skill }> = ({
  value: { Icon, level, name },
}) => {
  const getSkillColor = (level: string) => {
    const numLevel = parseInt(level);
    if (numLevel >= 90) return "bg-green-100 text-green-800 border-green-200";
    if (numLevel >= 75) return "bg-blue-100 text-blue-800 border-blue-200";
    if (numLevel >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getSkillLevel = (level: string) => {
    const numLevel = parseInt(level);
    if (numLevel >= 90) return "Expert";
    if (numLevel >= 75) return "Advanced";
    if (numLevel >= 60) return "Intermediate";
    return "Beginner";
  };

  return (
    <div className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium border ${getSkillColor(level)} transition-all duration-200 hover:scale-105`}>
      <Icon className="w-4 h-4 mr-2" />
      <span className="font-semibold">{name}</span>
      <span className="ml-2 text-xs opacity-75">({getSkillLevel(level)})</span>
    </div>
  );
};

export default SkillBadge;
import { FunctionComponent } from "react";
import { Category } from "../types";

export const NavItem: FunctionComponent<{
  value: Category | "all";
  handlerFilterCategory: Function;
  active: string;
}> = ({ value, handlerFilterCategory, active }) => {
  let className = "capitalize cursor-pointer hover:text-blue whitespace-nowrap px-3 py-2 sm:px-2 sm:py-1 rounded-lg text-sm sm:text-base font-medium transition-colors";
  if (active === value) className += " text-blue bg-blue-50 dark:bg-blue-900/20";

  return (
    <li className={className} onClick={() => handlerFilterCategory(value)}>
      {value}
    </li>
  );
};

const ProjectsNavbar: FunctionComponent<{
  handlerFilterCategory: Function;
  active: string;
}> = (props) => {
  return (
    <div className="flex px-2 sm:px-3 py-3 sm:py-2 gap-2 sm:gap-3 overflow-x-auto list-none scrollbar-hide">
      <NavItem value="all" {...props} />
      <NavItem value="THREE.js" {...props} />
      <NavItem value="blockchain" {...props} />
      <NavItem value="ue5" {...props} />
      <NavItem value="Rokoko" {...props} />
      <NavItem value="YouTube" {...props} />
      <NavItem value="Ableton" {...props} />
      <NavItem value="Github" {...props} />
      <NavItem value="wordpress" {...props} />
    </div>
  );
};

export default ProjectsNavbar;

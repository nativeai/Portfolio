import { FunctionComponent } from "react";
import { Category } from "../types";

export const NavItem: FunctionComponent<{
  value: Category | "all";
  handlerFilterCategory: Function;
  active: string;
}> = ({ value, handlerFilterCategory, active }) => {
  let className = "capitalize cursor-pointer hover:text-blue";
  if (active === value) className += " text-blue";

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
    <div className="flex px-3 py-2 space-x-3 overflow-x-auto list-none">
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

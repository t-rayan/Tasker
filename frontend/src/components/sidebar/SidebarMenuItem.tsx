"use client";

import { useCallback } from "react";
import { IconType } from "react-icons";
import { HiOutlinePlusCircle, HiOutlinePlusSm } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface SidebarMenuItemsProps {
  icon: IconType;
  title: string;
  currentPath?: string;
  action?: () => void;
}

const SidebarMenuItem: React.FC<SidebarMenuItemsProps> = ({
  icon: Icon,
  title,
  currentPath,
  action,
}) => {
  const navigate = useNavigate();

  const clickHandler = useCallback(() => {
    navigate(`${currentPath}`);
  }, [currentPath, navigate]);

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <div className="flex-1">
          <NavLink
            to={`${currentPath}`}
            className={({ isActive }) =>
              isActive ? "text-black" : "text-gray-600"
            }
          >
            <div
              className="flex gap-2 items-center cursor-pointer"
              // onClick={clickHandler}
            >
              <div className="flex items-center justify-center ">
                <Icon />
              </div>
              <div>
                <h3 className=" text-[.8rem] font-normal">{title}</h3>
              </div>
            </div>
          </NavLink>
        </div>

        {action && (
          <div
            className="
          text-gray-500 
          bg-neutral-100 
          p-0.5 
          rounded-full 
          cursor-pointer"
            onClick={action}
          >
            <HiOutlinePlusSm />
          </div>
        )}
      </div>
    </>
  );
};

export default SidebarMenuItem;

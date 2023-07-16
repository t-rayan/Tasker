"use client";

import SidebarMenuItem from "./SidebarMenuItem";
import {
  HiOutlineClipboardList,
  HiOutlineHome,
  HiOutlineMinusCircle,
  HiOutlineViewGrid,
} from "react-icons/hi";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { useAppDispatch } from "../../app/hooks";
import { logoutAction } from "../../features/auth/authSlice";
import {
  openAddFolderModal,
  openAddTaskModal,
} from "../../features/ui/uiSlice";
import ThemeSwitcher from "../ThemeSwitcher";

interface SidebarProps {
  folders?: any;
}

const Sidebar: React.FC<SidebarProps> = ({ folders }) => {
  // const addFolderModal = useAddFolderModal();
  const dispatch = useAppDispatch();

  return (
    <div
      className="
        hidden 
        md:fixed 
        md:inset-y-0 
        md:left-0 
        md:z-20
        md:w-56 
        md:overflow-y-auto 
        bg-white
        dark:bg-darkBg
        dark:border-0
        md:pb-4
        md:flex
        md:flex-col
        justify-start
        px-6
        transition-colors duration-75 ease-in-out
        "
    >
      <div className="h-full flex flex-col gap-10 ">
        {/* logo */}
        <div className="py-5 ">
          <h1 className=" font-mono font-semibold text-md dark:text-neutral-400  dark:first-letter:text-gray-900 first-letter:text-[1.3rem] first-letter:bg-primaryColor first-letter:px-1.5 first-letter:mr-[5px] first-letter:rounded-md ">
            tasker
          </h1>
        </div>

        {/* main menu */}
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="flex flex-col gap-8">
              <SidebarMenuItem
                title="Home"
                currentPath={"/"}
                icon={HiOutlineHome}
              />
              <SidebarMenuItem
                title="Projects"
                currentPath="projects"
                action={() => dispatch(openAddFolderModal())}
                icon={HiOutlineViewGrid}
              />
              <SidebarMenuItem
                title="Tasks"
                currentPath="tasks"
                action={() => dispatch(openAddTaskModal())}
                icon={HiOutlineClipboardList}
              />
              <SidebarMenuItem
                currentPath="settings"
                title="Settings"
                icon={HiOutlineCog6Tooth}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div
              className="flex items-center gap-2 cursor-pointer text-neutral-500 hover:text-neutral-700"
              onClick={() => dispatch(logoutAction())}
            >
              <div className="">
                <HiOutlineMinusCircle />
              </div>
              <h3 className="text-sm">Logout</h3>
            </div>

            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

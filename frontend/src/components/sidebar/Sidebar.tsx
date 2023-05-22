"use client";

// import useAddFolderModal from "@/app/hooks/useAddFolderModal";
import Button from "../Button";
import SidebarMenuItem from "./SidebarMenuItem";
import { AiFillFolder, AiOutlineFolder, AiOutlinePlus } from "react-icons/ai";
import { useEffect } from "react";

interface SidebarProps {
  folders?: any;
}

const Sidebar: React.FC<SidebarProps> = ({ folders }) => {
  // const addFolderModal = useAddFolderModal();

  return (
    <div
      className="
        hidden 
        md:fixed 
        md:inset-y-0 
        md:left-0 
        md:z-0
        md:w-56 
        md:overflow-y-auto 
        bg-white
        md:border-r-[1px]
        md:pb-4
        md:flex
        md:flex-col
        justify-start
        pl-10
        pr-5
        "
    >
      <div className="h-full pt-24 flex flex-col justify-between ">
        <div>
          <h3 className="font-semibold text-md text-gray-400">My Projects</h3>
          <div className="mt-3">
            <SidebarMenuItem title="Reminders" icon={AiOutlineFolder} />
          </div>
        </div>
        <div className="">
          <Button fullWidth secondary onClick={() => {}}>
            <div className="flex justify-between gap-1 items-center">
              <div>
                <AiOutlinePlus size={20} />
              </div>
              <h3>Add Folder</h3>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

"use client";

import { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";

interface SidebarMenuItemsProps {
  icon: IconType;
  title: string;
}

const SidebarMenuItem: React.FC<SidebarMenuItemsProps> = ({
  icon: Icon,
  title,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex gap-2 items-stretch justify-between mb-3.5 cursor-pointer"
      onClick={() => navigate(`/dashboard/folders/${title}`)}
    >
      <div className="flex gap-2 items-center">
        <div>
          <Icon className="text-neutral-800" />
        </div>
        <div>
          <h3 className=" text-sm text-neutral-700 font-bold">{title}</h3>
        </div>
      </div>
      <div className="px-2 py-1 bg-neutral-100 rounded-lg">
        <h3 className="text-xs text-neutral-500 font-semibold">2</h3>
      </div>
    </div>
  );
};

export default SidebarMenuItem;

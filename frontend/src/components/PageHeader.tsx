"use client";

import { GoKebabVertical } from "react-icons/go";
import BackButton from "../components/BackButton";
import clsx from "clsx";
import { BsFolderPlus } from "react-icons/bs";

interface PageHeaderProps {
  title: string;
  isButtonHidden?: boolean;
  actionLabel?: string;
  action?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  isButtonHidden = false,
  actionLabel,
  action,
}) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div
          className={clsx(
            `flex items-center`,
            isButtonHidden ? "gap-0" : "gap-3"
          )}
        >
          <BackButton isHidden={isButtonHidden} />
          <h3 className="font-bold text-lg text-neutral-800">{title}</h3>
        </div>
        {actionLabel && (
          <div
            className="cursor-pointer flex items-center gap-2 text-xs hover:bg-gray-200 p-2 px-4 rounded-full"
            onClick={action}
          >
            <BsFolderPlus />
            <p>{actionLabel}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default PageHeader;

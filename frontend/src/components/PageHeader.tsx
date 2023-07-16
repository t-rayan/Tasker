"use client";

import { GoKebabVertical } from "react-icons/go";
import BackButton from "../components/BackButton";
import clsx from "clsx";
import { BsFolderPlus } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";

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
          <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-400">
            {title}
          </h3>
        </div>
        {actionLabel && (
          <div
            className="cursor-pointer dark:text-neutral-500 flex items-center gap-1 text-xs font-medium hover:text-neutral-600 hover:scale-105"
            onClick={action}
          >
            <FiPlus />
            <p>{actionLabel}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default PageHeader;

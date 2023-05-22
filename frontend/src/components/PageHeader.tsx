"use client";

import { GoKebabVertical } from "react-icons/go";
import BackButton from "../components/BackButton";
import clsx from "clsx";

interface PageHeaderProps {
  title: string;
  isButtonHidden?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  isButtonHidden = false,
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
        <div className="cursor-pointer hover:bg-gray-200 p-1.5 rounded-full">
          <GoKebabVertical />
        </div>
      </div>
    </>
  );
};

export default PageHeader;

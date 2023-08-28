"use client";

import { useNavigate } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";
import clsx from "clsx";

interface BackButtonProps {
  isHidden?: boolean;
}

const BackButton: React.FC<BackButtonProps> = ({ isHidden = false }) => {
  const navigate = useNavigate();

  const handleBackNavigation = (e: any) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <>
      <button
        onClick={handleBackNavigation}
        className={clsx(
          ` flex 
            justify-center 
            items-center 
            border-[2px] 
            bg-gray-900
            border-neutral-800 
            dark:bg-transparent
            dark:border-darkCardBg 
            dark:border-[3px]

            text-white
            dark:text-gray-500
            rounded-md h-7 w-7 
            hover:shadow-lg 
            transition `,
          isHidden && "hidden",
        )}
      >
        <BiChevronLeft />
      </button>
    </>
  );
};

export default BackButton;

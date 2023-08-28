import React, { useState } from "react";

import { IFolder } from "../../features/folder/folderSlice";
import Button from "../Button";
import { AiOutlineFolder, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { openAddFolderModal } from "../../features/ui/uiSlice";

interface ISelectBoxProps {
  options: IFolder[];
  label: string;
  action: (value: any) => void;
}

const SelectBox: React.FC<ISelectBoxProps> = ({ options, action, label }) => {
  const dispatch = useDispatch();

  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("Select Folder");

  const handleSelectChange = (folder: IFolder) => {
    // console.log(event.target.value);
    setSelectedOption(folder.name);
    setToggleMenu(false);
    action(folder._id);
  };

  return (
    <div className=" w-full">
      <div className="relative inline-block text-left w-full">
        <label
          className=" block
              text-sm
              font-semibold
              leading-6
              mb-1
              text-gray-700
              dark:text-neutral-500"
        >
          {label}
        </label>
        <div>
          <button
            type="button"
            className="inline-flex
            focus:ring-2
            focus:border-none
            focus:ring-blue-500
            bg-white
            text-neutral-500
             w-full 
             justify-between
            gap-x-1.5 
              rounded-lg
              border-[1px] 
              dark:bg-darkCardBg
               px-4 py-2.5 text-sm font-light
                hover:bg-gray-50"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            {selectedOption}
            <svg
              className="-mr-1 h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        {toggleMenu && (
          <div
            className="absolute 
            max-h-44 
            overflow-y-auto 
            right-0 
            z-10 
            mt-2 
            w-full 
            origin-top-right 
            rounded-md 
            bg-white 
            dark:bg-darkCardBg 
            dark:text-neutral-500 
            shadow-lg ring-1 
            ring-black 
            ring-opacity-5 
            focus:outline-none
            transition-transform
            ease-in-out
            "
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div
              className="py-5 px-2 flex flex-col gap-1 capitalize text-sm"
              role="none"
            >
              {options?.map((option: any) => (
                <div
                  className="text-sm text-neutral-600 px-3 rounded-md cursor-pointer hover:dark:bg-darkBg flex items-center gap-2 hover:bg-gray-200 "
                  key={option?._id}
                  onClick={() => handleSelectChange(option)}
                >
                  <AiOutlineFolder size={17} />
                  <p className="py-2">{option?.name}</p>
                </div>
              ))}
              <div className="px-3 mt-2">
                <div
                  className="bg-transparent ring-1 ring-gray-300 rounded-md flex gap-2 items-center justify-center px-4 py-2 cursor-pointer"
                  onClick={() => dispatch(openAddFolderModal())}
                >
                  <AiOutlinePlus />
                  <p>Add Folder</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectBox;

import React, { ChangeEvent, useState } from "react";
import Select from "react-select";

import axios from "axios";
import { IFolder } from "../../features/folder/folderSlice";

interface ISelectBoxProps {
  options: IFolder[];
  label: string;
  action: (value: any) => void;
}

const SelectBox: React.FC<ISelectBoxProps> = ({ options, action, label }) => {
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
      {/* <select
        name="folders"
        id="folder-select"
        classNameName="apperance-none w-full text-sm dark:bg-darkCardBg border-0 rounded-lg p-3 text-neutral-500"
        onChange={handleSelectChange}
      >
        <option value="" classNameName="mx-8">
          Please choose Folder
        </option>
        {options.map((option) => (
          <option value={option._id} key={option?._id}>
            {option.name}
          </option>
        ))}
      </select> */}

      <div className="relative inline-block text-left w-full">
        <p>{label}</p>
        <div>
          <button
            type="button"
            className="inline-flex
            text-neutral-500
             w-full 
             justify-between
            gap-x-1.5 
              rounded-md 
              border-[1px] 
              dark:bg-darkCardBg
               px-4 py-2 text-sm font-light
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
              className="py-3 px-1 flex flex-col gap-y-4 capitalize text-sm"
              role="none"
            >
              {options?.map((option: any) => (
                <div
                  className="px-3 py-2 rounded-md cursor-pointer hover:dark:bg-darkBg"
                  key={option?._id}
                  onClick={() => handleSelectChange(option)}
                >
                  <p>{option?.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectBox;

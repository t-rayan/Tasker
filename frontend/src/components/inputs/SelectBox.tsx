import React, { ChangeEvent, useState } from "react";
import Select from "react-select";

import axios from "axios";
import { IFolder } from "../../features/folder/folderSlice";

interface ISelectBoxProps {
  options: IFolder[];
  action: (value: any) => void;
}

const SelectBox: React.FC<ISelectBoxProps> = ({ options, action }) => {
  const [selectedOption, setSelectedOption] = useState<string>();

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    // console.log(event.target.value);
    action(event.target.value);
  };

  return (
    <div className=" w-full px-3 py-1 border-2  rounded-md">
      <select
        name="folders"
        id="folder-select"
        className="w-full bg-transparent border-0 rounded-md py-2 focus-visible:border-0 outline-none"
        onChange={handleSelectChange}
      >
        <option value="">Please choose Folder</option>
        {options.map((option) => (
          <option value={option._id} key={option?._id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../features/ui/uiSlice";
import { BsFillMoonStarsFill, BsMoonStars } from "react-icons/bs";

interface SwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}
const Switch: React.FC<SwitchProps> = ({ enabled, onChange }) => {
  const dispatch = useDispatch();

  const toggleSwitch = () => {
    dispatch(toggleTheme());
  };

  return (
    <label className="flex items-center justify-between cursor-pointer">
      <div className=" flex items-center gap-3 text-sm text-neutral-500 font-medium">
        <BsMoonStars />
        <p>Dark Mode</p>
      </div>

      <div className="relative ">
        <input
          type="checkbox"
          className="sr-only"
          checked={enabled}
          onChange={toggleSwitch}
        />
        <div className="block  border-[1px] border-neutral-300 dark:border-gray-800 dark:bg-none w-10 h-5 rounded-full"></div>
        <div
          className={`${
            enabled
              ? "translate-x-[1.42rem] bg-primaryColor"
              : "translate-x-1 bg-gray-300"
          } absolute mt-[4.23px]  top-0 left-0 right-0 w-3 h-3 transform transition-transform duration-300 ease-in-out rounded-full`}
        ></div>
      </div>
    </label>
  );
};

export default Switch;

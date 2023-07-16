import {
  HiOutlineClipboardList,
  HiOutlineHome,
  HiOutlineMinusCircle,
  HiOutlineViewGrid,
} from "react-icons/hi";
import { HiOutlineCog6Tooth } from "react-icons/hi2";

const MobileMenu = () => {
  return (
    <div className="fixed md:hidden  text-2xl bottom-5 ml-auto flex justify-between items-center  px-6 py-6  w-full h-16 z-30  text-neutral-600   dark:text-gray-400">
      <div className="backdrop-blur-sm bg-neutral-200/50 flex justify-between w-full py-5 px-8 rounded-full items-center bg-gray-300 dark:bg-darkCardBg">
        <HiOutlineHome />
        <HiOutlineViewGrid />
        <HiOutlineClipboardList />
        <HiOutlineCog6Tooth />
      </div>
    </div>
  );
};

export default MobileMenu;

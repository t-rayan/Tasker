import { IconType } from "react-icons";
import CircularProgress from "../../../components/CircularProgress";
import { useAppSelector } from "../../../app/hooks";
import { RootState } from "../../../app/store";

export interface MenuCardData {
  percent?: number | any;
  total?: number;
  completed?: number;
}

interface MenuCardsProps {
  icon: IconType;
  label: string;
  onClick: () => void;
  data?: MenuCardData;
}

const MenuCards: React.FC<MenuCardsProps> = ({
  icon: Icon,
  label,
  onClick,
  data,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex 
      flex-row 
      justify-between 
      items-end
      md:items-center
      w-full  
      cursor-pointer 
      backdrop-blur-sm bg-white/30
      dark:bg-transparent      
      border-[1px]
      dark:border-darkCardBg
      rounded-md
      hover:scale-105
      
      h-auto
      px-5
      py-5
      transition-all
      duration-500
      ease-in-out
      "
    >
      <div className="flex gap-5 flex-col justify-between">
        <div>
          <h3 className="font-semibold text-sm dark:text-gray-300">{label}</h3>
        </div>
        <div className="flex flex-col justify-between">
          <div className=" text-md text-gray-500 dark:text-gray-300 font-semibold">
            {data?.completed}/{data?.total}
          </div>
          {/* <p className="text-[.7rem] text-gray-400">Last month 64</p> */}
        </div>
      </div>
      <CircularProgress percentage={data?.percent} />
    </div>
  );
};

export default MenuCards;

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
      bg-white
      border-[1px]
      rounded-lg
      hover:scale-105
      h-auto
      px-5
      py-5
      backdrop-filter:blur(100px)
      transition
      "
    >
      <div className="flex gap-5 flex-col justify-between">
        <div>
          <h3 className="font-semibold text-sm">{label}</h3>
        </div>
        <div className="flex flex-col justify-between">
          <div className=" text-md text-gray-500 font-semibold">
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

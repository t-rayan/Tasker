import { IconType } from "react-icons";

interface MenuCardsProps {
  icon: IconType;
  label: string;
  onClick: () => void;
  taskCount?: number;
}

const MenuCards: React.FC<MenuCardsProps> = ({
  icon: Icon,
  label,
  onClick,
  taskCount = 0,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex 
      flex-col 
      justify-between 
      w-full  
      cursor-pointer 
      bg-white 
      shadow-sm
      rounded-md
      hover:scale-105
      h-28
      px-5
      py-4
      backdrop-filter:blur(100px)
      transition
      "
    >
      <div className="flex justify-between">
        <div className=" rounded-full">
          <Icon className="text-black" />
        </div>
        <div>{taskCount}</div>
      </div>
      <div>
        <h3 className="font-semibold text-sm">{label}</h3>
      </div>
    </div>
  );
};

export default MenuCards;

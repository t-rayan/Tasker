import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";

interface IPopMenuProps {
  onOpen?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const PopMenu: React.FC<IPopMenuProps> = ({ onEdit, onDelete }) => {
  const uiState = useAppSelector((state: RootState) => state.ui);
  const { isPopMenu } = uiState;

  // if (!isPopMenu) {
  //   return null;
  // }

  return (
    <div
      className="absolute 
    top-[-30px] 
    flex flex-col items-center justify-between z-30 py-2 right-[-35px] shadow-sm h-16 w-10 rounded-md bg-gray-900"
    >
      <div
        className="cursor-pointer text-white hover:text-green-600"
        onClick={onEdit}
      >
        <AiOutlineEdit size={17} onClick={onEdit} />
      </div>
      {/* <div className="w-full h-0.5 bg-gray-300"></div> */}
      <div className="cursor-pointer text-white hover:text-red-600">
        <AiOutlineDelete size={17} onClick={onDelete} />
      </div>
    </div>
  );
};

export default PopMenu;

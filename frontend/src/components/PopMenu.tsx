import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { ReactNode, useEffect, useRef } from "react";
import { closePopMenu } from "../features/ui/uiSlice";
import { clearCurrentFolder } from "../features/folder/folderSlice";

interface IPopMenuProps {
  children?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const PopMenu: React.FC<IPopMenuProps> = ({ children, onClose, isOpen }) => {
  const popmenuRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        popmenuRef.current &&
        !popmenuRef.current.contains(event.target as Node)
      ) {
        onClose();
        dispatch(clearCurrentFolder());
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
  }, [dispatch, isOpen, popmenuRef]);

  return (
    <div
      className={`absolute top-[40px]  ${
        isOpen ? "flex" : "hidden"
      } flex-col gap-y-4 z-30 py-4  -right-[.5rem] shadow-sm ring-1 ring-gray-200 h-auto min-h-24 w-auto min-w-[13rem] rounded-md bg-white  `}
      ref={popmenuRef}
    >
      {children}
    </div>
  );
};

export default PopMenu;

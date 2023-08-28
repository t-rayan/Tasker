import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineFolder,
} from "react-icons/ai";
import { GoKebabVertical } from "react-icons/go";
import PopMenu from "../../../components/PopMenu";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  closePopMenu,
  openAddFolderModal,
  openAddTaskModal,
  openEditFolderModal,
  openPopMenu,
  togglePopMenu,
} from "../../../features/ui/uiSlice";
import { useEffect, useState } from "react";
import {
  clearCurrentFolder,
  deleteFolderAction,
  getSingleFolderAction,
  setCurrentFolderId,
} from "../../../features/folder/folderSlice";
import { useNavigate } from "react-router-dom";
import { ITask } from "../../../features/task/taskSlice";
import { RootState } from "../../../app/store";
import AddFolderModal from "../../../components/modals/AddFolderModal";
import EditFolderModal from "../../../components/modals/EditFolderModal";
import {
  HiDocumentAdd,
  HiOutlineBadgeCheck,
  HiOutlineDocumentAdd,
  HiOutlinePencil,
  HiOutlineTrash,
  HiPencilAlt,
  HiTrash,
} from "react-icons/hi";

interface ISingleFolderProps {
  title: String;
  tasks?: ITask[];
  id?: String;
  color?: String;
}

const SingleFolder: React.FC<ISingleFolderProps> = ({
  title,
  id,
  tasks,
  color = "black",
}) => {
  const data = {
    id,
    title,
    tasks,
    color,
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { folders, currentFolder: folderId } = useAppSelector(
    (state: RootState) => state.folder,
  );
  const [currentFolder, setCurrentFolder] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const completedTasks = tasks?.filter((task: any) => task.isCompleted === true)
    .length;

  const handleFolderClick = () => {
    if (!currentFolder) {
      setCurrentFolder(id);
      dispatch(setCurrentFolderId(id));
    } else {
      setCurrentFolder(null);
    }
  };

  const handleOnCloseMenu = () => {
    setCurrentFolder(null);
    setIsOpen(false);
  };

  const handleOpenFolderEditModal = () => {
    setIsOpen(true);
  };

  const handleFolderDelete = () => {
    dispatch(deleteFolderAction(currentFolder));
    dispatch(closePopMenu());
    setCurrentFolder(null);
  };

  // calculate percentage
  const getPercentage = () => {
    const cFolder = folders?.find((folder: any) => folder?._id === id);

    const totalTasksCount: any = cFolder?.tasks?.length;
    const completedTasksCount: any = cFolder?.tasks?.filter(
      (task: any) => task.isCompleted === true,
    ).length;

    const projectCompletePercent: number =
      (completedTasksCount / totalTasksCount) * 100;
    return Math.ceil(projectCompletePercent);
  };

  const PopMenuBody = (
    <>
      <div className="text-gray-600 flex items-center gap-1  pb-2 px-2 border-b-[1px] border-b-gray-100">
        <p className="text-sm">File menu</p>
      </div>
      <div
        className="px-2 cursor-pointer font-light text-[0.8rem] text-neutral-600 hover:text-green-600 flex items-center gap-2"
        onClick={() => dispatch(openAddTaskModal())}
      >
        <HiOutlineDocumentAdd size={15} />
        <p>Create new task</p>
      </div>
      <div
        className="px-2 cursor-pointer font-light text-[0.8rem] text-neutral-600 hover:text-green-600 flex items-center gap-2"
        onClick={handleOpenFolderEditModal}
      >
        <HiOutlinePencil size={15} />
        <p>Edit folder</p>
      </div>

      <div className="px-2 cursor-pointer font-light text-[0.8rem] text-neutral-600 hover:text-red-600 flex items-center gap-2">
        <HiOutlineBadgeCheck size={15} />
        <p>Mark as complete</p>
      </div>
      <div
        className="px-2 border-t-[1px] border-t-gray-100 pt-2 cursor-pointer text-[0.8rem] font-light text-neutral-600 hover:text-red-600 flex items-center gap-2"
        onClick={handleFolderDelete}
      >
        <HiOutlineTrash size={15} />
        <p>Delete folder</p>
      </div>
    </>
  );

  return (
    <div className="relative bg-white w-56 shadow-sm rounded-md py-4 px-4">
      <EditFolderModal
        data={data}
        isOpen={isOpen}
        onClose={handleOnCloseMenu}
      />
      <PopMenu
        isOpen={id === currentFolder}
        onClose={() => setCurrentFolder(null)}
      >
        {PopMenuBody}
      </PopMenu>

      <div className="flex justify-between">
        <div
          className="flex flex-col gap-6 w-24 cursor-pointer"
          onClick={() => navigate(`${id}`)}
        >
          <div style={{ color: `${color}` }}>
            <AiOutlineFolder size={28} />
          </div>
          <div className="flex flex-col">
            <h3 className="font-medium text-xs text-neutral-600 text-left">
              {title}
            </h3>
            <h3 className="text-gray-400 text-sm font-medium mt-1">
              {tasks?.length}/{completedTasks}
            </h3>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center">
          <div
            className="hover:bg-neutral-200 p-1 rounded-full cursor-pointer text-gray-500"
            onClick={handleFolderClick}
          >
            <GoKebabVertical size={15} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFolder;

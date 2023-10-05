import {
  AiFillFolder,
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
import { useCallback, useEffect, useState } from "react";
import {
  clearCurrentFolder,
  deleteFolderAction,
  getSingleFolderAction,
  markFolderAsCompleteAction,
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
import Spinner from "../../../components/Spinner";

interface ISingleFolderProps {
  title: string;
  tasks?: ITask[];
  id?: string;
  color?: string;
  isComplete: boolean;
}

const SingleFolder: React.FC<ISingleFolderProps> = ({
  title,
  id,
  tasks,
  isComplete,
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
  const { folders, isLoading, loading } = useAppSelector(
    (state: RootState) => state.folder,
  );
  const [currentFolder, setCurrentFolder] = useState<any | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const completedTasks = tasks?.filter((task: any) => task.isCompleted === true)
    .length;

  const handleFolderClick = useCallback(
    (clickedId: any) => {
      if (currentFolder === clickedId) {
        setCurrentFolder(null);
      } else {
        setCurrentFolder(clickedId);
      }
    },
    [currentFolder],
  );

  const handleOnCloseMenu = () => {
    setCurrentFolder(null);
    setIsOpen(false);
  };

  const handleOpenFolderEditModal = () => {
    setIsOpen(true);
  };

  const handleFolderDelete = useCallback(() => {
    dispatch(deleteFolderAction({ id: id, cb: closePopMenu }));
  }, [dispatch, id]);

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
        className="px-2 cursor-pointer font-light text-[0.8rem] text-neutral-600 hover:text-neutral-800 flex items-center gap-2"
        onClick={handleOpenFolderEditModal}
      >
        <HiOutlinePencil size={15} />
        <p>Edit folder</p>
      </div>

      <div
        className={`px-2 ${
          isComplete || tasks?.length === 0
            ? "cursor-not-allowed text-neutral-400"
            : "cursor-pointer text-neutral-600 hover:text-neutral-800"
        } font-light text-[0.8rem]   flex items-center justify-between`}
        onClick={() => dispatch(markFolderAsCompleteAction({ id: id }))}
      >
        <div className="flex items-start gap-2">
          <HiOutlineBadgeCheck size={15} />
          <p>Mark as complete</p>
        </div>
        {loading?.update && <Spinner />}
      </div>
      <div
        className={`px-2 border-t-[1px] border-t-gray-100 pt-2  
        ${
          loading?.delete
            ? "cursor-not-allowed text-neutral-500"
            : "cursor-pointer text-neutral-600 hover:text-red-600"
        }
        text-[0.8rem] font-light flex items-center justify-between gap-2`}
        onClick={handleFolderDelete}
      >
        <div className="flex items-center gap-2">
          <HiOutlineTrash size={15} />
          <p>{!loading?.delete ? "Delete folder" : "Deleting"}</p>
        </div>
        {loading?.delete && <Spinner />}
      </div>
    </>
  );

  return (
    <div className="relative bg-white w-56 shadow-sm rounded-md py-4 px-4">
      <div className="flex justify-between">
        <div
          className="flex flex-col gap-6 w-24 cursor-pointer"
          onClick={() => navigate(`${id}`)}
        >
          <div style={{ color: `${color}` }}>
            <AiFillFolder size={28} />
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
            onClick={() => handleFolderClick(id)}
          >
            <GoKebabVertical size={15} />
          </div>
          <div
            className={` ${
              isComplete ? "text-emerald-400" : "text-neutral-400"
            } mb-1`}
          >
            <HiOutlineBadgeCheck size={18} />
          </div>
        </div>
      </div>

      {/* child components */}
      <EditFolderModal
        data={data}
        isOpen={isOpen}
        onClose={handleOnCloseMenu}
      />
      <PopMenu
        isOpen={currentFolder === id}
        onClose={() => setCurrentFolder(null)}
      >
        {PopMenuBody}
      </PopMenu>
    </div>
  );
};

export default SingleFolder;

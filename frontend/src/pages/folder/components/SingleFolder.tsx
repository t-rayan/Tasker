import { AiOutlineFolder } from "react-icons/ai";
import { GoKebabVertical } from "react-icons/go";
import PopMenu from "../../../components/PopMenu";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  closePopMenu,
  openEditFolderModal,
  openPopMenu,
} from "../../../features/ui/uiSlice";
import { useEffect, useState } from "react";
import {
  deleteFolderAction,
  getSingleFolderAction,
} from "../../../features/folder/folderSlice";
import { useNavigate } from "react-router-dom";
import { ITask } from "../../../features/task/taskSlice";
import PercentageMeter from "../../../components/CircularProgress";
import CircularProgress from "../../../components/CircularProgress";
import { RootState } from "../../../app/store";

interface ISingleFolderProps {
  title: String;
  tasks?: ITask[];
  id?: String;
}

const SingleFolder: React.FC<ISingleFolderProps> = ({ title, id, tasks }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { folders } = useAppSelector((state: RootState) => state.folder);
  const [currentFolder, setCurrentFolder] = useState<any | null>(null);

  const completedTasks = tasks?.filter(
    (task: any) => task.isCompleted === true
  ).length;

  const handleFolderClick = () => {
    if (!currentFolder) {
      setCurrentFolder(id);
    } else if (id) {
      setCurrentFolder(null);
      dispatch(closePopMenu());
    }
  };

  const handleOpenFolderEditModal = () => {
    dispatch(openEditFolderModal());
    dispatch(getSingleFolderAction(currentFolder));
    dispatch(closePopMenu());
    setCurrentFolder(null);
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
      (task: any) => task.isCompleted === true
    ).length;

    const projectCompletePercent: number =
      (completedTasksCount / totalTasksCount) * 100;
    return Math.ceil(projectCompletePercent);
  };

  useEffect(() => {
    currentFolder === id && dispatch(openPopMenu());
  }, [currentFolder, id, dispatch]);

  return (
    <div className="relative flex">
      {/* pop menu */}
      {currentFolder && (
        <PopMenu
          onEdit={() => handleOpenFolderEditModal()}
          onDelete={() => handleFolderDelete()}
        />
      )}

      {/* <div
        className="
        flex 
        justify-between 
        py-5
        px-4
        md:px-6
        h-32
        shadow-sm
        w-auto
        bg-white
        border-gray-300
        rounded-lg"
      >
        <div
          className="flex-1 flex flex-col justify-between cursor-pointer"
          onClick={() => navigate(`${id}`)}
        >
          <div className="text-neutral-500 flex items-cent justify-center bg-gray-200 h-7 w-7 p-1 rounded-full ">
            <AiOutlineFolder size={18} />
          </div>
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-sm text-neutral-600">{title}</h3>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center">
          <div
            className="hover:bg-neutral-200 p-1 rounded-full cursor-pointer"
            onClick={handleFolderClick}
          >
            <GoKebabVertical size={15} />
          </div>
          <div>
            <h3 className="text-gray-400 text-sm font-medium">
              {tasks?.length}/{completedTasks}
            </h3>
          </div>
        </div>
      </div> */}

      <div
        className="
        flex 
        justify-start
        items-center
        flex-col
        w-24
        p-2
        cursor-pointer
      "
        onClick={() => navigate(`${id}`)}
      >
        <div className="text-gray-700">
          <AiOutlineFolder size={48} />
        </div>
        <div className="flex justify-between items-center mt-2">
          <h3 className="font-medium text-sm text-neutral-600">{title}</h3>
        </div>
        <h3 className="text-gray-400 text-sm font-medium mt-1">
          {tasks?.length}/{completedTasks}
        </h3>
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
  );
};

export default SingleFolder;

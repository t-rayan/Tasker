import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Checkbox from "../inputs/Checkbox";
import {
  AiOutlineDelete,
  AiOutlineCalendar,
  AiOutlineEdit,
} from "react-icons/ai";
import { TbClock2 } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ChangeEvent, useState } from "react";
import {
  ITask,
  deleteTaskAction,
  updateTaskAction,
} from "../../features/task/taskSlice";
import { getDateWithHyphens } from "../../helpers/DateHelper";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { RiFileEditLine } from "react-icons/ri";
import { RootState } from "../../app/store";
import Spinner from "../Spinner";
import LoadingScreen from "../LoadingScreen";

interface TaskProps {
  task: ITask;
  folderName?: string;
}

const SingleTask: React.FC<TaskProps> = ({ task, folderName }) => {
  const dispatch = useAppDispatch();
  const [isTaskPopMenu, setIsTaskPopMenu] = useState<boolean>(false);
  const { isLoading, isDeleting } = useAppSelector(
    (state: RootState) => state.task,
  );
  const [currentId, setCurrentId] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  const handleTaskCompleted = () => {
    setCurrentId(task?._id);
    dispatch(
      updateTaskAction({ _id: task._id, isCompleted: !task.isCompleted }),
    );
  };

  const handleTaskDelete = () => {
    dispatch(deleteTaskAction(task._id));
  };

  const handlePopMenu = () => {
    setCurrentId(task?._id);
    // if (currentId === task?._id) {
    //   setIsTaskPopMenu(true);
    // } else {
    //   setIsTaskPopMenu(false);
    // }
    setIsTaskPopMenu(!isTaskPopMenu);
  };

  return (
    <div
      className="mb-5 
        flex
        bg-transparent
        justify-between 
        items-center 
        py-3 
        p-3 
        gap-1
        border-0
        ring-[1px]
        ring-neutral-200
        dark:ring-[1px]
        dark:border-0
        dark:ring-neutral-900
        rounded-lg
    "
    >
      <div className="flex gap-3 w-full">
        <div className="flex justify-center items-center basis-10">
          {isLoading && task?._id === currentId ? (
            <Spinner />
          ) : (
            <Checkbox
              register={register}
              name="status"
              defaultValue={task?.isCompleted}
              isCompleted={task?.isCompleted}
              action={() => handleTaskCompleted()}
            />
          )}
        </div>
        <div className="flex flex-col justify-start w-60 basis-1/2">
          <h3 className="text-xs text-netural-600 font-semibold ">
            {folderName ? folderName : task?.folder?.name}
          </h3>

          <h3 className="text-sm font-normal lowercase text-neutral-600 dark:text-neutral-500">
            {task.title}
          </h3>
          <div className="flex mt-1.5 gap-2">
            <div className=" flex items-stretch justify-start gap-1 text-neutral-600">
              <AiOutlineCalendar size={14} />
              <h3 className="text-xs">{getDateWithHyphens(task?.dueDate)}</h3>
            </div>
            <div className=" flex items-stretch justify-start text-neutral-600 gap-1">
              <TbClock2 size={14} />
              <h3 className="text-xs ">10:00</h3>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex items-center justify-center basis-1/4 ">
        <div
          className="border-neutral-200 border-[2px] dark:bg-transparent dark:border-darkBg
         px-2 py-0.5 rounded-md"
        >
          <h3 className="text-[.7rem] font-normal text-gray-600 dark:text-neutral-500">
            High
          </h3>
        </div>
      </div>
      <div>
        {isDeleting && currentId ? (
          <Spinner />
        ) : (
          <div className="basis-10 cursor-pointer text-neutral-400 relative">
            <div className="cursor-pointer" onClick={handlePopMenu}>
              <HiOutlineDotsVertical />
            </div>

            {/* pop menu */}
            {isTaskPopMenu && (
              <div className="absolute top-[-50px] rounded  left-4 bg-neutral-100 p-2 shadow-lg flex flex-col text-gray-500 gap-2">
                <div
                  className="cursor-pointer hover:text-red-500"
                  onClick={handleTaskDelete}
                >
                  <AiOutlineDelete size={17} />
                </div>
                <div className="cursor-pointer hover:text-green-600">
                  <AiOutlineEdit size={17} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleTask;

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Checkbox from "../inputs/Checkbox";
import { AiOutlineDelete, AiOutlineCalendar } from "react-icons/ai";
import { TbClock2 } from "react-icons/tb";
import { useAppDispatch } from "../../app/hooks";
import { ChangeEvent, useState } from "react";
import {
  ITask,
  deleteTaskAction,
  updateTaskAction,
} from "../../features/task/taskSlice";
import { getDateWithHyphens } from "../../helpers/DateHelper";

interface TaskProps {
  task: ITask;
  folderName?: string;
}

const SingleTask: React.FC<TaskProps> = ({ task, folderName }) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  const handleTaskCompleted = () => {
    dispatch(
      updateTaskAction({ _id: task._id, isCompleted: !task.isCompleted })
    );
  };

  const handleTaskDelete = () => {
    dispatch(deleteTaskAction(task._id));
  };

  return (
    <div
      className="mb-5 
        flex
        bg-neutral-100
        justify-between 
        items-center 
        py-3 
        p-3 
        gap-5  
        border-gray-400
        rounded-md
    "
    >
      <div className="flex justify-center items-center basis-10">
        <Checkbox
          register={register}
          name="status"
          defaultValue={task?.isCompleted}
          isCompleted={task?.isCompleted}
          action={() => handleTaskCompleted()}
        />
      </div>

      <div className="flex flex-col justify-start w-60 basis-1/2">
        <h3 className="text-xs text-netural-600 font-semibold ">
          {folderName ? folderName : task?.folder?.name}
        </h3>

        <h3 className="text-sm font-normal lowercase text-neutral-600 ">
          {task.title}
        </h3>
        <div className="flex mt-1.5 gap-2">
          <div className=" flex items-stretch justify-start gap-1">
            <AiOutlineCalendar size={14} className="text-gray-400" />
            <h3 className="text-xs text-gray-400">
              {getDateWithHyphens(task?.dueDate)}
            </h3>
          </div>
          <div className=" flex items-stretch justify-start gap-1">
            <TbClock2 size={14} className="text-gray-400" />
            <h3 className="text-xs text-gray-400">10:00</h3>
          </div>
        </div>
      </div>

      <div className=" flex items-center justify-center basis-1/4">
        <div className="bg-neutral-200 px-2 py-0.5 rounded-md">
          <h3 className="text-[.7rem] font-normal text-gray-600">High</h3>
        </div>
      </div>

      <div
        className="basis-10 cursor-pointer text-rose-400"
        onClick={handleTaskDelete}
      >
        <AiOutlineDelete />
      </div>
    </div>
  );
};

export default SingleTask;

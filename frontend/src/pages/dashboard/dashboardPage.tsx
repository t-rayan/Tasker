"use client";

import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Button from "../../components/Button";
import { useEffect } from "react";
import { getFoldersAction } from "../../features/folder/folderSlice";
import { getAllTasksAction } from "../../features/task/taskSlice";
import { RootState } from "../../app/store";
import Stats from "../../components/Stats";
import {
  openAddFolderModal,
  openAddTaskModal,
} from "../../features/ui/uiSlice";
import ChartLine from "../../components/charts/ChartLine";
import DueToday from "../../components/DueToday";
import { GrFormAdd } from "react-icons/gr";

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);
  const { folders } = useAppSelector((state: RootState) => state.folder);
  const { tasks } = useAppSelector((state: RootState) => state.task);

  useEffect(() => {
    if (currentUser) {
      dispatch(getFoldersAction());
      dispatch(getAllTasksAction());
    }
  }, [currentUser, dispatch]);

  return (
    <div className="flex flex-col gap-10">
      {/* <PageHeader isButtonHidden title="Dashboard" /> */}
      <div>
        <div className=" flex flex-col gap-2">
          <h1 className="antialiased font-semibold text-2xl text-black dark:text-neutral-300">
            Simplify your workflow with efficient <br /> task management
          </h1>
          {/* <h1 className="font-bold text-2xl">Narayan Thapa</h1> */}
        </div>
        <p className="antialiased mt-2 mb-8 text-gray-400 text-sm">
          {" "}
          Stay Organized, Boost Productivity, and Accomplish More with Tasker
        </p>
        <div
          className=" py-4 px-4 cursor-pointer bg-white dark:bg-darkCardBg dark:text-neutral-600 w-56 flex justify-between items-center gap-0 rounded-xl shadow-sm"
          onClick={() => dispatch(openAddTaskModal())}
        >
          <p>Create New Task</p>
          <div className="h-9 w-9 bg-blue-500 rounded-full flex items-center justify-center">
            <GrFormAdd size="20" />
          </div>
        </div>
        {/* <Button onClick={() => dispatch(openAddFolderModal())}>
          Add new project
        </Button> */}
      </div>
      <Stats />
      <ChartLine />
      <DueToday />
    </div>
  );
};

export default DashboardPage;

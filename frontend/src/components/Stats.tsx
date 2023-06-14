import { MdOutlineToday } from "react-icons/md";
import MenuCards, {
  MenuCardData,
} from "../pages/dashboard/components/MenuCards";
import { HiCalendarDays } from "react-icons/hi2";
import { RiFoldersFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { ITask } from "../features/task/taskSlice";

const Stats = () => {
  const navigate = useNavigate();
  const { folders } = useAppSelector((state: RootState) => state.folder);
  const { tasks, todaysTasks } = useAppSelector(
    (state: RootState) => state.task
  );

  // calculate task completed in percentage
  const getTaskDonePercentage = () => {
    const tasksNum: number = tasks.length;
    const completedTaskNum: number = tasks.filter(
      (task: ITask) => task.isCompleted === true
    ).length;

    const percentage = (completedTaskNum / tasksNum) * 100;

    return {
      percent: Math.ceil(percentage),
      total: tasksNum,
      completed: completedTaskNum,
    };
  };

  // calculate todaystask completed in percentage
  const getTodaysTaskDonePercentage = () => {
    const todaysTasksNum: number = todaysTasks.length;
    const completedTaskNum: number = todaysTasks.filter(
      (task: ITask) => task.isCompleted === true
    ).length;

    const percentage = (completedTaskNum / todaysTasksNum) * 100;

    return {
      percent: Math.ceil(percentage),
      total: todaysTasksNum,
      completed: completedTaskNum,
    };
  };

  const taskData = getTaskDonePercentage();
  const todaysTaskData = getTodaysTaskDonePercentage();

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full md:w-auto gap-5 md:gap-10  ">
      <div className="">
        <MenuCards
          icon={MdOutlineToday}
          label="Projects"
          dataSize={folders?.length}
          onClick={() => navigate("projects")}
        />
      </div>

      <MenuCards
        icon={HiCalendarDays}
        data={taskData}
        label="Tasks"
        onClick={() => {}}
      />
      <MenuCards
        icon={RiFoldersFill}
        label="Today"
        data={todaysTaskData}
        onClick={() => {}}
      />
      {/* <MenuCards icon={AiOutlineCheck} label="Completed" onClick={() => {}} /> */}
    </div>
  );
};

export default Stats;

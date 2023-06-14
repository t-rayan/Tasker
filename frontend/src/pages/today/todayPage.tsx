import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import PageHeader from "../../components/PageHeader";
import SingleTask from "../../components/Task/SingleTask";
import { openAddTaskModal } from "../../features/ui/uiSlice";
import { ITask } from "../../features/task/taskSlice";
import Accordion from "../../components/Accordion";

const TodayPage = () => {
  const dispatch = useAppDispatch();

  const taskState = useAppSelector((state: RootState) => state.task);
  const { todaysTasks } = taskState;

  return (
    <div>
      <PageHeader
        title={"Due Today"}
        actionLable={"Add task"}
        action={() => dispatch(openAddTaskModal())}
      />
      <div className="mt-7">
        <Accordion data={todaysTasks} />
        {/* {todaysTasks?.map((task: any) => (
          <div key={task._id}>
            <SingleTask task={task} folderName={task.folder?.name} />
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default TodayPage;

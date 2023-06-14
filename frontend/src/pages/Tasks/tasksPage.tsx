import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Accordion from "../../components/Accordion";
import PageHeader from "../../components/PageHeader";
import { openAddTaskModal } from "../../features/ui/uiSlice";

const TasksPage = () => {
  const dispatch = useAppDispatch();
  const taskState = useAppSelector((state: RootState) => state.task);
  const { tasks } = taskState;
  return (
    <div>
      <PageHeader
        title={"All Tasks"}
        actionLabel="New Task"
        action={() => dispatch(openAddTaskModal())}
      />
      <div className="mt-10">
        <Accordion data={tasks} />
      </div>
    </div>
  );
};

export default TasksPage;

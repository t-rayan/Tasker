import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getTodaysTasksAction } from "../features/task/taskSlice";
import { RootState } from "../app/store";
import Accordion from "./Accordion";

const DueToday = () => {
  const dispatch = useAppDispatch();
  const { todaysTasks } = useAppSelector((state: RootState) => state.task);

  useEffect(() => {
    dispatch(getTodaysTasksAction());
  }, [dispatch]);

  return (
    <div>
      <h1 className="mb-5 font-semibold">Due Today</h1>
      <Accordion data={todaysTasks} />
    </div>
  );
};

export default DueToday;

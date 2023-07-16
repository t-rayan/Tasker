import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { ITask } from "../features/task/taskSlice";
import SingleTask from "./Task/SingleTask";

interface AccordionProps {
  data: ITask[];
}

const Accordion: React.FC<AccordionProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  // const completedTask = () ={}
  const getInCompletedTask = () => {
    const inCompleteTasks = data?.filter(
      (task: any) => task?.isCompleted === false
    );
    return inCompleteTasks;
  };
  const getCompletedTask = () => {
    const completedTasks = data?.filter(
      (task: any) => task?.isCompleted === true
    );
    return completedTasks;
  };
  const inCompleteTasks = getInCompletedTask();
  const completedTasks = getCompletedTask();

  return (
    <>
      <div className="w-full mb-4 ">
        <div
          className="
          flex 
          justify-between 
          pb-3 
          items-center 
          border-b-[1px] 
          dark:border-darkCardBg
          cursor-pointer"
          onClick={toggleAccordion}
        >
          <div className="flex gap-1 text-sm text-neutral-600">
            <h3 className="font-medium">Incomplete</h3>
            <h3 className="font-medium">{inCompleteTasks?.length}</h3>
          </div>
          <div>{isOpen ? <FiChevronUp /> : <FiChevronDown />}</div>
        </div>

        {/* children */}
        {isOpen && (
          <div className="mt-5 transition">
            <div>
              {inCompleteTasks?.map((task: any) => (
                <div key={task._id}>
                  <SingleTask task={task} folderName={task.name} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-full mb-4 ">
        <div
          className="
        flex 
        justify-between 
        pb-3 
        border-b-[1px] 
          dark:border-darkCardBg
        border-gray-200
        cursor-pointer
        items-center"
          onClick={toggleAccordion}
        >
          <div className="flex gap-1 text-sm text-neutral-600">
            <h3 className="font-medium">Completed</h3>
            <h3 className="font-medium">{completedTasks?.length}</h3>
          </div>
          <div>{isOpen ? <FiChevronUp /> : <FiChevronDown />}</div>
        </div>

        {/* children */}
        {isOpen && (
          <div className="mt-5 transition">
            <div>
              {completedTasks?.map((task: any) => (
                <div key={task._id}>
                  <SingleTask task={task} folderName={task.name} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Accordion;

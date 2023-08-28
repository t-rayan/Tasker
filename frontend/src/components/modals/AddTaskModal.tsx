import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";
import Input from "../inputs/Input";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { closeAddTaskModal } from "../../features/ui/uiSlice";
import { createTaskAction } from "../../features/task/taskSlice";
import SelectBox from "../inputs/SelectBox";
import { useEffect, useState } from "react";

const AddTaskModal = () => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<string>("");

  const uiState = useAppSelector((state: RootState) => state.ui);
  const { isAddTaskModal } = uiState;

  const { isLoading } = useAppSelector((state: RootState) => state.task);

  const folderState = useAppSelector((state: RootState) => state.folder);
  const { folders, isError, message, currentFolder } = folderState;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
    },
  });

  console.log(currentFolder);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(
      createTaskAction({
        title: data.title,
        dueDate: data.dueDate,
        folder: currentFolder ? currentFolder : value,
      }),
    );
    reset();
  };

  const handleAddTaskModalClose = () => {
    dispatch(closeAddTaskModal());
  };

  const getFodlerValue = (folderId: string) => {
    setValue(folderId);
  };

  const bodyContent = (
    <div className="flex flex-col gap-3">
      <Input
        label="Task title"
        id="title"
        type="text"
        register={register}
        errors={errors}
        placeholder="My task"
        required
      />
      {!currentFolder && (
        <SelectBox
          label="Choose Folder"
          options={folders}
          action={getFodlerValue}
        />
      )}
      <Input
        label="Due date"
        id="dueDate"
        type="date"
        register={register}
        errors={errors}
        placeholder="Due on"
        required
      />
      {isError && <h3 className="text-red-500 text-xs">{message}</h3>}
    </div>
  );

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <div>
      <Modal
        // disabled={isLoading}
        isOpen={isAddTaskModal}
        title="Add new task"
        actionLabel="Add task"
        onClose={handleAddTaskModalClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        disabled={isLoading}
      />
    </div>
  );
};

export default AddTaskModal;

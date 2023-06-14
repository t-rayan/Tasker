import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  closeAddFolderModal,
  openAddFolderModal,
} from "../../features/ui/uiSlice";
import { createFolderAction } from "../../features/folder/folderSlice";

const AddFolderModal = () => {
  const dispatch = useAppDispatch();

  const uiState = useAppSelector((state: RootState) => state.ui);
  const { isAddFolderModal } = uiState;

  const folderState = useAppSelector((state: RootState) => state.folder);
  const { isLoading, isError, message } = folderState;

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(createFolderAction(data));
    reset();
  };

  const handleAddFolderModalClose = () => {
    dispatch(closeAddFolderModal());
  };

  const bodyContent = (
    <div className="flex flex-col gap-3">
      <Input
        label="Folder Name"
        id="name"
        type="text"
        register={register}
        errors={errors}
        placeholder="My Folder"
        required
      />
      {isError && <h3 className="text-red-500 text-xs">{message}</h3>}
    </div>
  );

  return (
    <div>
      <Modal
        // disabled={isLoading}
        isOpen={isAddFolderModal}
        title="Add Folder"
        actionLabel="Add Folder"
        onClose={handleAddFolderModalClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        disabled={isLoading}
      />
    </div>
  );
};

export default AddFolderModal;

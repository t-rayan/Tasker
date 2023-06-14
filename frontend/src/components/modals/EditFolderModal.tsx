import axios from "axios";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  closeAddFolderModal,
  closeEditFolderModal,
  openAddFolderModal,
} from "../../features/ui/uiSlice";
import {
  clearCurrentFolder,
  createFolderAction,
  updateFolderAction,
} from "../../features/folder/folderSlice";

interface IEditFolderModalProps {
  value?: String;
}

const EditFolderModal: React.FC<IEditFolderModalProps> = ({ value }) => {
  const dispatch = useAppDispatch();

  const uiState = useAppSelector((state: RootState) => state.ui);
  const { isEditFolderModal } = uiState;

  const folderState = useAppSelector((state: RootState) => state.folder);
  const { isLoading, isError, message, currentFolder } = folderState;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FieldValues>({
    // defaultValues: {
    //   name: '',
    // },
  });

  useEffect(() => {
    setValue("name", currentFolder?.name);
  }, [currentFolder, setValue]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    dispatch(updateFolderAction(data));
    reset();
  };

  const handleEditFolderModalClose = () => {
    dispatch(clearCurrentFolder());
    dispatch(closeEditFolderModal());
  };

  // getting current folder details

  // useEffect(() => {

  // }, []);

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
        disabled={isLoading}
        isOpen={isEditFolderModal}
        title="Edit Folder"
        actionLabel="Update Folder"
        onClose={handleEditFolderModalClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
      />
    </div>
  );
};

export default EditFolderModal;

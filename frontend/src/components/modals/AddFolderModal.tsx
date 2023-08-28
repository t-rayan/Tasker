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
  openAddFolderModal,
} from "../../features/ui/uiSlice";
import { createFolderAction } from "../../features/folder/folderSlice";

import { FOLDER_COLORS } from "../../assets/colors";

type AddFolderModalProps = {
  folderId?: string;
};

const AddFolderModal: React.FC<AddFolderModalProps> = ({ folderId }) => {
  const dispatch = useAppDispatch();

  const [selectedColor, setSelectedColor] = useState<string>();

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
    let formData = {
      name: data.name,
      color: selectedColor,
    };
    dispatch(createFolderAction(formData));
    setSelectedColor("");
    reset();
  };

  const handleAddFolderModalClose = () => {
    dispatch(closeAddFolderModal());
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
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
      <div>
        <p>Color</p>
        <div className="flex gap-2 flex-wrap">
          {FOLDER_COLORS?.map((color) => (
            <div
              key={color.colorId}
              style={{ background: color.colorName }}
              className={`w-6 h-6 rounded-full mt-3 cursor-pointer hover:ring-2 border-none hover:ring-neutral-600 ${
                selectedColor === color.colorName && `ring-2 ring-black`
              } `}
              onClick={() => handleColorSelect(color.colorName)}
            ></div>
          ))}
        </div>
      </div>
      {isError && <h3 className="text-red-500 text-xs">{message}</h3>}
    </div>
  );

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

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

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
import { FOLDER_COLORS } from "../../assets/colors";

interface IFolderData {
  id: String;
  title: String;
  tasks: [];
}

interface IEditFolderModalProps {
  data: any;
  isOpen: Boolean;
  onClose: () => void;
}

const EditFolderModal: React.FC<IEditFolderModalProps> = ({
  isOpen,
  data,
  onClose,
}) => {
  const dispatch = useAppDispatch();

  const [selectedColor, setSelectedColor] = useState<string>(data?.color);
  console.log(selectedColor);
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

  const onSubmit: SubmitHandler<FieldValues> = (value) => {
    dispatch(
      updateFolderAction({
        name: value.name,
        color: selectedColor,
        id: data.id,
        onClose: onClose,
      }),
    );
    reset();
  };

  const handleEditFolderModalClose = () => {
    dispatch(clearCurrentFolder());
    dispatch(closeEditFolderModal());
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  useEffect(() => {
    setValue("name", data?.title);
  }, [setValue, data]);

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
              className={`p-1.5  cursor-pointer hover:border-[1px] hover:border-gray-300 rounded-md ${
                color.colorName === selectedColor &&
                "border-[1px] border-gray-300 rounded-md"
              } `}
              onClick={() => handleColorSelect(color.colorName)}
            >
              <div
                key={color.colorId}
                style={{ background: color.colorName }}
                className={`w-5 h-5 rounded-full   border-none  `}
              ></div>
            </div>
          ))}
        </div>
      </div>
      {isError && <h3 className="text-red-500 text-xs">{message}</h3>}
    </div>
  );

  return (
    <div>
      <Modal
        disabled={isLoading}
        isOpen={data && isOpen ? true : false}
        title="Edit Folder"
        actionLabel="Update Folder"
        onClose={onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
      />
    </div>
  );
};

export default EditFolderModal;

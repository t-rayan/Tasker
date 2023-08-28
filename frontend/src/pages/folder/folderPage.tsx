import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import PageHeader from "../../components/PageHeader";
import SingleFolder from "./components/SingleFolder";
import { openAddFolderModal } from "../../features/ui/uiSlice";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { GrFormAdd } from "react-icons/gr";

const FolderPage = () => {
  const dispatch = useAppDispatch();

  const folderState = useAppSelector((state: RootState) => state.folder);
  const { folders } = folderState;

  if (folders.length === 0) {
    return (
      <div className="grid place-items-center">
        <div className="flex flex-col items-center">
          <div className="text-gray-400">
            <AiOutlineFolderAdd size="30" />
          </div>
          <div className="text-gray-600 text-sm">
            <p>There are no folders.</p>
          </div>
          <div className="mt-4 ">
            <div
              className="cursor-pointer bg-yellow-300 text-black py-1.5 rounded-lg px-4 text-xs flex items-center justify-center gap-1"
              onClick={() => dispatch(openAddFolderModal())}
            >
              <GrFormAdd size="20" />
              <p className="font-semibold">Add folder</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="My Folders"
        actionLabel={"Add folder"}
        action={() => dispatch(openAddFolderModal())}
      />
      <div className="mt-12 grid justify-between grid-cols-4 gap-10">
        {folders?.map((folder: any) => (
          <div key={folder?._id}>
            <SingleFolder
              title={folder?.name}
              tasks={folder?.tasks}
              id={folder?._id}
              color={folder?.color}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderPage;

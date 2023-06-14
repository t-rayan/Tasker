import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import Button from "../../components/Button";
import PageHeader from "../../components/PageHeader";
import SingleFolder from "./components/SingleFolder";
import { openAddFolderModal } from "../../features/ui/uiSlice";
import { getProjectCompletionProgress } from "../../helpers/dataGenerator";

const FolderPage = () => {
  const dispatch = useAppDispatch();

  const folderState = useAppSelector((state: RootState) => state.folder);
  const { folders } = folderState;

  return (
    <div>
      <PageHeader
        title="My Folders"
        actionLabel={"Add folder"}
        action={() => dispatch(openAddFolderModal())}
      />

      <div className="mt-12 grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-10">
        {folders?.map((folder: any) => (
          <div key={folder?._id}>
            <SingleFolder
              title={folder?.name}
              tasks={folder?.tasks}
              id={folder?._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FolderPage;

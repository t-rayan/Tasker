import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  clearCurrentFolder,
  getSingleFolderAction,
} from "../../features/folder/folderSlice";
import { RootState } from "../../app/store";
import Accordion from "../../components/Accordion";
import SingleTask from "../../components/Task/SingleTask";
import {
  openAddFolderModal,
  openAddTaskModal,
} from "../../features/ui/uiSlice";

const SingleFolderPage = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const { currentFolder, isLoading } = useAppSelector(
    (state: RootState) => state.folder,
  );

  useEffect(() => {
    if (id) {
      dispatch(getSingleFolderAction(id));
    }
    return () => {
      dispatch(clearCurrentFolder());
    };
  }, [id, dispatch]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="">
      <PageHeader
        title={currentFolder?.name}
        actionLabel={"Add Task"}
        action={() => dispatch(openAddTaskModal())}
      />

      <div className=" h-full mt-10 flex flex-col gap-5">
        <Accordion data={currentFolder?.tasks} />
      </div>
    </div>
  );
};

export default SingleFolderPage;

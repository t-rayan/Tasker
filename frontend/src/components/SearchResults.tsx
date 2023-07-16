import { AiOutlineFolder } from "react-icons/ai";
import { MdOutlineTask } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { IFolder, clearSearchResults } from "../features/folder/folderSlice";
import { useEffect } from "react";
import { ITask } from "../features/task/taskSlice";
import { useNavigate } from "react-router-dom";

interface SearchResultsProps {
  action?: any;
}

const SearchResults: React.FC<SearchResultsProps> = ({ action }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { searchResults } = useAppSelector((state: RootState) => state.folder);

  useEffect(() => {
    dispatch(clearSearchResults());
  }, [dispatch]);

  const handleClearResult = () => {
    action();
  };

  const handleFolderNavigation = (id: any) => {
    handleClearResult();
    navigate(`projects/${id}`);
  };

  return (
    <>
      {searchResults && (
        <div className="absolute left-0 top-12 rounded-md shadow-lg w-full md:w-96 lg:w-[30rem] min-h-[15rem] bg-gray-100 dark:bg-darkCardBg p-5">
          <div className="">
            <h1 className="text-sm font-semibold mb-2 text-gray-500">
              Folders
            </h1>
            {searchResults?.folders?.length === 0 ? (
              <p className="text-sm font-medium text-neutral-500">
                No results found
              </p>
            ) : (
              searchResults?.folders?.map((folder: IFolder) => (
                <div
                  key={folder?._id}
                  onClick={() => handleFolderNavigation(folder?._id)}
                  className="flex items-center gap-3 cursor-pointer text-sm text-gray-500 hover:bg-gray-200 dark:hover:bg-darkBg rounded-sm p-3"
                >
                  <AiOutlineFolder size={20} />
                  <div>
                    <p className="">{folder?.name}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-6">
            <h1 className="text-sm font-semibold mb-2 text-gray-500">Tasks</h1>
            {searchResults?.tasks?.map((task: ITask) => (
              <div
                key={task?._id}
                onClick={() => {
                  let folder: IFolder = task.folder;

                  handleFolderNavigation(folder?._id);
                }}
                className="flex 
                items-center 
                gap-3 
                text-gray-500  
                cursor-pointer 
                hover:bg-gray-200 
                dark:hover:bg-darkBg
                rounded-sm 
                p-3"
              >
                <MdOutlineTask size={20} />
                <div>
                  <p className="text-sm ">{task?.title}</p>
                </div>
              </div>
            ))}
            {searchResults?.tasks?.length === 0 && (
              <p className="text-sm font-medium text-neutral-500">
                No results found
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResults;

import { AiOutlineFolder } from "react-icons/ai";
import { MdOutlineTask } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { IFolder, clearSearchResults } from "../features/folder/folderSlice";
import { useEffect } from "react";
import { ITask } from "../features/task/taskSlice";

interface SearchResultsProps {
  searchQuery?: any;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchQuery }) => {
  const dispatch = useAppDispatch();
  const { searchResults } = useAppSelector((state: RootState) => state.folder);

  useEffect(() => {
    dispatch(clearSearchResults());
  }, [dispatch]);

  return (
    <>
      {searchResults && (
        <div className="absolute top-10 rounded-md shadow-lg w-full min-h-[15rem] bg-gray-50 p-5">
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
                  className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 rounded-sm p-3"
                >
                  <AiOutlineFolder size={20} />
                  <div>
                    <p className="text-sm text-gray-600">{folder?.name}</p>
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
                className="flex items-center gap-3 text-gray-700 cursor-pointer hover:bg-gray-200 rounded-sm p-3"
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

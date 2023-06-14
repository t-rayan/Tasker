import { ChangeEvent, useState } from "react";
import { ImSearch } from "react-icons/im";
import SearchResults from "../SearchResults";
import { useAppDispatch } from "../../app/hooks";
import { searchFoldersAndTasksAction } from "../../features/folder/folderSlice";

const Search = () => {
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    dispatch(searchFoldersAndTasksAction(e.target.value));
  };

  return (
    <div className="relative w-full">
      {searchText && <SearchResults searchQuery={searchText} />}
      <div className="md:w-full mx-auto flex-initial">
        <div className="absolute top-[10px] left-4">
          <ImSearch className="text-gray-400" />
        </div>
        <input
          className="text-sm text-gray-500 px-10 py-2 w-full placeholder:text-sm focus-visible:outline-0"
          type="text"
          placeholder="Search for projects and tasks"
          name="searchText"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Search;

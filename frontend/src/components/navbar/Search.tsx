import { ChangeEvent, useState } from "react";
import { ImSearch } from "react-icons/im";
import SearchResults from "../SearchResults";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  clearSearchResults,
  searchFoldersAndTasksAction,
} from "../../features/folder/folderSlice";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RootState } from "../../app/store";
import Spinner from "../Spinner";

const Search = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state: RootState) => state.folder);

  const [searchText, setSearchText] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    dispatch(searchFoldersAndTasksAction(e.target.value));
  };

  const handleClearSearchText = () => {
    setSearchText("");
    dispatch(clearSearchResults());
  };

  return (
    <div className="w-full md:relative md:w-96 ">
      {searchText && <SearchResults action={handleClearSearchText} />}
      <div
        className=" 
          px-3
          rounded-lg 
          flex
          items-center 
          justify-between 
          border-[1px] 
          dark:border-0 
          dark:bg-darkCardBg 
          w-full 
          md:w-96 
          lg:w-[30rem]
          "
      >
        <div className=" ">
          <ImSearch className="   dark:text-neutral-600" />
        </div>
        <input
          className="text-sm 
          bg-transparent
           text-gray-500 
           px-1 
           py-2
            w-full 
           md:w-96 
           placeholder:text-sm 
           dark:placeholder:text-neutral-600
           focus-visible:outline-0"
          type="text"
          value={searchText}
          placeholder="Search for projects and tasks"
          name="searchText"
          onChange={handleChange}
        />
        <div className="w-8 cursor-pointer text-gray-500 hover:text-gray-700">
          {searchText && (
            <>
              {isLoading ? (
                <Spinner />
              ) : (
                <AiOutlineCloseCircle onClick={handleClearSearchText} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;

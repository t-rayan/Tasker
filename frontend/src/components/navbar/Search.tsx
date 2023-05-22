import {
  FieldValue,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { ImSearch } from "react-icons/im";

const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchtext: "",
    },
  });

  return (
    <div className="w-80 md:w-80 mx-auto flex-initial relative">
      <div className="absolute top-3 right-5">
        <ImSearch className="text-gray-400" />
      </div>
      <input
        className="text-sm border-[1px] px-5 py-2 w-full rounded-full placeholder:text-sm"
        type="text"
        placeholder="Search for projects and tasks"
      />
    </div>
  );
};

export default Search;

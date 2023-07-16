import { AiOutlineMenu } from "react-icons/ai";

const Logo = () => {
  return (
    <div className="flex md:hidden items-center gap-2">
      <div className="cursor-pointer block md:hidden">
        <AiOutlineMenu size={14} />
      </div>
      <h2 className="hidden font-bold text-lg md:text-2xl dark:text-neutral-800 ">
        Tasker
      </h2>
    </div>
  );
};

export default Logo;

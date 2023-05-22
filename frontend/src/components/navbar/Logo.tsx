import { AiOutlineMenu } from "react-icons/ai";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="cursor-pointer block md:hidden">
        <AiOutlineMenu />
      </div>
      <h2 className="font-bold text-2xl">Tasker</h2>
    </div>
  );
};

export default Logo;

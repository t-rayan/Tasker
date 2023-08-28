import { Outlet } from "react-router-dom";

const FolderLayout = () => {
  return (
    <div className="h-screen bg-purple-400">
      <Outlet />
    </div>
  );
};

export default FolderLayout;

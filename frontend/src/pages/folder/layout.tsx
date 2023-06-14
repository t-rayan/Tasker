import { Outlet } from "react-router-dom";
import Container from "../../components/Container";

const FolderLayout = () => {
  return (
    <div className="h-full">
      <Outlet />
    </div>
  );
};

export default FolderLayout;

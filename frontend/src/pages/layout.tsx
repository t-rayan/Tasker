import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Container from "../components/Container";
import Sidebar from "../components/sidebar/Sidebar";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import { getProfileAction } from "../features/user/userSlice";
import AddFolderModal from "../components/modals/AddFolderModal";
import AddTaskModal from "../components/modals/AddTaskModal";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((state) => state.user);
  const { token } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (token) {
  //     dispatch(getProfileAction(token));
  //   }
  // }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    }
  }, [currentUser, navigate]);

  return (
    <div>
      <AddFolderModal />
      <AddTaskModal />
      <Navbar />
      <Toaster />

      <Sidebar />
      <div className="pt-24 pb-5 pl-0 md:pl-56 min-h-screen bg-white">
        <div className="md:w-full mr-auto h-full">
          <Container>
            <Outlet />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Layout;

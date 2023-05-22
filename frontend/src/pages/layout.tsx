import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Container from "../components/Container";
import Sidebar from "../components/sidebar/Sidebar";
import { useAppSelector } from "../app/hooks";
import { useEffect } from "react";

const Layout = () => {
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user) {
      navigate("/");
    }
  }, [auth.user, navigate]);

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="py-24 pl-0 md:pl-52 bg-zinc-100 h-screen">
        <div className="md:w-full lg:w-[33rem] mx-auto">
          <Container>
            <Outlet />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Layout;

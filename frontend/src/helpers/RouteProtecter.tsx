import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.user);
  // const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    !currentUser && navigate("/auth");
  }, [currentUser, navigate]);

  // !currentUser ? <Navigate to="/auth" /> : <Navigate to="/" />;
  return children;
};

export default PrivateRoute;

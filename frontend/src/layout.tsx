import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";

const RootLayout = () => {
  return <>{<Outlet />}</>;
};

export default RootLayout;

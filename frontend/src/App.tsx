import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./helpers/RouteProtecter";
import Layout from "./pages/layout";
import DashboardPage from "./pages/dashboard/dashboardPage";
import AuthPage from "./pages/auth/authPage";
import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { getProfileAction } from "./features/auth/authSlice";

function App() {
  const dispatch = useAppDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    token && dispatch(getProfileAction());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route
            index
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

import { Routes, Route, useNavigate } from "react-router-dom";
import PrivateRoute from "./helpers/RouteProtecter";
import Layout from "./pages/layout";
import DashboardPage from "./pages/dashboard/dashboardPage";
import AuthPage from "./pages/auth/authPage";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import RootLayout from "./layout";
import FolderPage from "./pages/folder/folderPage";
import { getProfileAction } from "./features/user/userSlice";
import { RootState } from "./app/store";
import TasksPage from "./pages/Tasks/tasksPage";
import SettingsPage from "./pages/settings/settingsPage";
import SingleFolderPage from "./pages/folder/singleFolderPage";
import ForgetPasswordPage from "./pages/auth/ForgetPasswordpage";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, currentUser } = useAppSelector(
    (state: RootState) => state.user
  );
  const token = localStorage.getItem("token");

  useEffect(() => {
    token && dispatch(getProfileAction(token));
  }, [dispatch, token]);

  // useEffect(() => {
  //   if (currentUser) {
  //     navigate("/");
  //   }
  // }, [currentUser, navigate]);

  if (isLoading) {
    return (
      <div className="h-screen neutral-100 flex justify-center items-center">
        <h2 className="font-medium text-sm text-neutral-700">
          Validating user....
        </h2>
      </div>
    );
  }

  return (
    <div className="h-full">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<FolderPage />} />
          <Route path="projects/:id" element={<SingleFolderPage />} />

          <Route path="tasks" element={<TasksPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/forget-password" element={<ForgetPasswordPage />} />
      </Routes>
    </div>
  );
}

export default App;

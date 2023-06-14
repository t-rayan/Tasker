import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  BrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App.tsx";
import "./index.css";

import { store } from "./app/store.ts";
import Layout from "./pages/layout.tsx";
import AuthPage from "./pages/auth/authPage.tsx";
import ErrorPage from "./pages/error-page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* <RouterProvider router={router} /> */}
    </Provider>
  </React.StrictMode>
);

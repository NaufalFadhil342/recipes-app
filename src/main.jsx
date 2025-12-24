import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import UserProfile from "./pages/userProfile";
import PersonalInformation from "./pages/userProfile/personalInformation.jsx";
import UserDisplay from "./pages/userProfile/userDisplay.jsx";
import Article from "./components/article";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppRoutes />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
        children: [
          {
            path: "/profile/edit/userDisplay",
            element: <UserDisplay />,
          },
          {
            path: "/profile/edit/personal",
            element: <PersonalInformation />,
          },
        ],
      },
      {
        path: "/create",
        element: <Article />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

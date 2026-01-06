import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App";
import AppRoutes from "./routes/AppRoutes";
import UserProfile from "./pages/userProfile";
import PersonalInformation from "./pages/userProfile/personalInformation";
import UserDisplay from "./pages/userProfile/userDisplay";
import Article from "./components/article";
import Error from "./UI/error";
import Recipes from "./pages/recipes";
import RecipeDetail from "./pages/recipes/recipeDetail";
import Saved from "./pages/saved";

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
        path: "/recipes",
        element: <Recipes />,
        children: [
          {
            path: "/recipes/:slug",
            element: <RecipeDetail />,
          },
          {
            path: "/recipes/create",
            element: <Article />,
          },
        ],
      },
      {
        path: "/saved",
        element: <Saved />,
      },
      {
        path: "/*",
        element: <Error />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

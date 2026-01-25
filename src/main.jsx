import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import App from "./App";
import UserProfile from "./pages/userProfile";
import PersonalInformation from "./pages/userProfile/personalInformation";
import UserDisplay from "./pages/userProfile/userDisplay";
import Recipes from "./pages/recipes";
import RecipeDetail from "./pages/recipes/recipeDetail";
import Saved from "./pages/saved";
import Stories from "./pages/ourStory";
import Article from "./components/article";
import Error from "./UI/error";
import {
  globalLoader,
  recipeDetailLoader,
  savedRecipesLoader,
} from "./routes/loaders";
import Loading from "./UI/loading";

const AppRoutes = lazy(() => import("./routes/AppRoutes"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div className="w-full h-auto my-28 flex items-center justify-center">
            <Loading />
          </div>
        }
      >
        <AppRoutes />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <App />,
        loader: globalLoader,
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
        loader: globalLoader,
      },
      {
        path: "/recipes/:slug",
        element: <RecipeDetail />,
        loader: recipeDetailLoader,
      },
      {
        path: "/recipes/create",
        element: <Article />,
      },
      {
        path: "/saved",
        element: <Saved />,
        loader: savedRecipesLoader,
      },
      {
        path: "/about",
        element: <Stories />,
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
  </StrictMode>,
);

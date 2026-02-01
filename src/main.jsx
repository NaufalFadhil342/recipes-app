import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import Error from "./UI/error";
import {
  globalLoader,
  recipeDetailLoader,
  savedRecipesLoader,
} from "./routes/loaders";
import AppRoutes from "./routes/AppRoutes";

const App = lazy(() => import("./App"));
const UserProfile = lazy(() => import("./pages/userProfile"));
const PersonalInformation = lazy(
  () => import("./pages/userProfile/personalInformation"),
);
const UserDisplay = lazy(() => import("./pages/userProfile/userDisplay"));
const Recipes = lazy(() => import("./pages/recipes"));
const RecipeDetail = lazy(() => import("./pages/recipes/recipeDetail"));
const Saved = lazy(() => import("./pages/saved"));
const Stories = lazy(() => import("./pages/ourStory"));
const ContactUs = lazy(() => import("./pages/contact"));
const Article = lazy(() => import("./pages/article"));

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <AppRoutes />,
    loader: globalLoader,
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
        path: "/contact",
        element: <ContactUs />,
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

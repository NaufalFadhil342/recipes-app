import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import {
  globalLoader,
  recipeDetailLoader,
  savedRecipesLoader,
} from "./routes/loaders";
import AppRoutes from "./routes/AppRoutes";
import { ErrorBoundary } from "./components/errorBoundary";

const App = lazy(() => import("./App"));
const UserProfile = lazy(() => import("./pages/userProfile"));
const PersonalInformation = lazy(
  () => import("./pages/userProfile/personalInformation"),
);
const UserDisplay = lazy(() => import("./pages/userProfile/userDisplay"));
const Recipes = lazy(() => import("./pages/recipes"));
const RecipeDetail = lazy(() => import("./pages/recipes/recipeDetail"));
const MyRecipes = lazy(() => import("./pages/myRecipes"));
const Draft = lazy(() => import("./pages/myRecipes/draft"));
const Published = lazy(() => import("./pages/myRecipes/published"));
const Saved = lazy(() => import("./pages/saved"));
const Stories = lazy(() => import("./pages/ourStory"));
const ContactUs = lazy(() => import("./pages/contact"));
const CreateArticle = lazy(() => import("./pages/article/create"));
const EditArticle = lazy(() => import("./pages/article/edit"));
const Preview = lazy(() => import("./pages/article/preview"));
const Auth = lazy(() => import("./pages/auth"));
const Activities = lazy(() => import("./pages/activities"));
const FAQ = lazy(() => import("./pages/faq"));
const Error = lazy(() => import("./pages/error"));

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <AppRoutes />,
    errorElement: <ErrorBoundary />,
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
        path: "/create",
        element: <CreateArticle />,
      },
      {
        path: "/edit/:authorId/:slug",
        element: <EditArticle />,
      },
      {
        path: "/my-recipes",
        element: <MyRecipes />,
        children: [
          {
            path: "/my-recipes/draft",
            element: <Draft />,
          },
          {
            path: "/my-recipes/publish",
            element: <Published />,
          },
        ],
      },
      {
        path: "/my-recipes/draft/preview/:slug",
        element: <Preview />,
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
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/galleries",
        element: <Activities />,
      },
      {
        path: "/faq",
        element: <FAQ />,
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

import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/header/navbar";
import Info from "../components/header/info";
import { UserAuthProvider } from "../context/userAuthCtx";
import { CategoryProvider } from "../context/categoryCtx";
import { RecipesProvider } from "../context/recipesCtx";
import Footer from "../components/footer";
import { Icons } from "../icons";
import { recipeIcons } from "../data/recipeIconsData";

const AppRoutes = () => {
  const [showToTopBtn, setShowToTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1000) {
        setShowToTopBtn(true);
      } else {
        setShowToTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollBtnToTop = showToTopBtn && (
    <button
      type="button"
      className="fixed bottom-12 right-12 size-10 rounded flex items-center justify-center bg-primary hover:bg-dark hover:cursor-pointer transition-all duration-150 ease-in-out"
      onClick={scrollToTop}
    >
      <Icons
        iconsName={recipeIcons.oirArrowTop}
        className="size-8 text-inherit"
      />
    </button>
  );

  return (
    <UserAuthProvider>
      <CategoryProvider>
        <RecipesProvider>
          <Info />
          <Navbar />
          <main>
            <Outlet />
            <>{scrollBtnToTop}</>
          </main>
          <Footer />
        </RecipesProvider>
      </CategoryProvider>
    </UserAuthProvider>
  );
};

export default AppRoutes;

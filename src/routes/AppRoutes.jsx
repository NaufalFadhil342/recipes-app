import { useEffect, useState, Suspense } from "react";
import { Outlet } from "react-router";
import Navbar from "../components/header/navbar";
import Info from "../components/header/info";
import { UserAuthProvider } from "../context/userAuthCtx";
import { RegionProvider } from "../context/regionCtx";
import { RecipesProvider } from "../context/recipesCtx";
import Footer from "../components/footer";
import { Icons } from "../icons";
import { recipeIcons } from "../data/recipeIconsData";
import Loading from "../UI/loading";

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
      <RegionProvider>
        <RecipesProvider>
          <Info />
          <Navbar />
          <main>
            <Suspense
              fallback={
                <div className="w-full h-auto my-28 flex items-center justify-center">
                  <Loading />
                </div>
              }
            >
              <Outlet />
            </Suspense>
            <>{scrollBtnToTop}</>
          </main>
          <Footer />
        </RecipesProvider>
      </RegionProvider>
    </UserAuthProvider>
  );
};

export default AppRoutes;

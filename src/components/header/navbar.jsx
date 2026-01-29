import { useRef, useEffect, useState } from "react";
import Bookmark from "../../UI/bookmark";
import GlobalSearch from "./globalSearch";
import MenuLinks from "./menuLinks";
import { AnimatePresence, easeInOut, motion } from "motion/react";
import { useRecipes } from "../../hooks/useRecipes";
import { Icons } from "../../icons";
import { recipeIcons } from "../../data/recipeIconsData";

const navbar = [
  { name: "Home", path: "/", icon: recipeIcons.mysHome },
  { name: "Recipes", path: "/recipes", icon: recipeIcons.paRecipe },
  { name: "About", path: "/about", icon: recipeIcons.mdiCompany },
  { name: "Contact", path: "/contact", icon: recipeIcons.hugeContact },
];

const Navbar = () => {
  const {
    bookmarkIsOpen,
    setBookmarkIsOpen,
    handleSaveItem,
    user,
    savedRecipesPreview,
    savedCount,
    loading,
  } = useRecipes();
  const [showSidebarMenu, setShowSidebarMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const bookmarkRef = useRef();
  const searchRef = useRef();
  const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bookmarkRef.current && !bookmarkRef.current.contains(e.target)) {
        setBookmarkIsOpen(false);
      }

      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
      }

      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setShowSidebarMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setBookmarkIsOpen]);

  return (
    <section className="w-full h-24 flex items-center bg-primary px-12 md:px-20">
      <div className="w-full h-auto relative flex items-center justify-between gap-6">
        <nav className="w-auto md:w-full h-auto relative">
          <MenuLinks display="hidden md:flex flex-row" navbar={navbar} />
          <button
            type="button"
            className="w-auto h-auto block md:hidden"
            onClick={() => setShowSidebarMenu(true)}
            aria-label="sidebar menu"
          >
            <Icons
              iconsName={recipeIcons.icMenu}
              className="size-7 text-white"
            />
          </button>
          <div ref={sidebarRef}>
            <AnimatePresence>
              {showSidebarMenu && (
                <motion.div
                  className="w-1/2 sm:w-1/3 h-auto fixed z-20 top-0 bottom-0 left-0 bg-white shadow-[5px_0_10px_rgba(41,37,36,0.1)]"
                  initial={{ opacity: 0, x: -250 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -250 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <MenuLinks
                    display="flex flex-col md:hidden"
                    navbar={navbar}
                    setShowSidebarMenu={setShowSidebarMenu}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
        <div className="w-full h-auto flex items-center gap-4 sm:gap-6 justify-end">
          <div className="hidden xs:block w-full">
            <GlobalSearch />
          </div>
          <div className="block xs:hidden" ref={searchRef}>
            <button
              type="button"
              className="flex xs:hidden bg-white w-auto h-8 rounded-full px-1 items-center justify-center"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Icons iconsName={recipeIcons.bitcoinSearch} className="size-6" />
            </button>
            <AnimatePresence>
              {showSearch && (
                <motion.div
                  className="min-w-full h-auto absolute z-10 top-full left-0 translate-y-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: easeInOut }}
                >
                  <GlobalSearch />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div ref={bookmarkRef}>
            <div
              className="relative hover:cursor-pointer"
              onClick={() => setBookmarkIsOpen((prev) => !prev)}
            >
              <Icons
                iconsName={recipeIcons.majestBookmark}
                className="size-7 text-stone-600"
              />
              <div className="absolute -top-2 -right-1.5 z-2 bg-stone-100 rounded-full size-5 flex items-center justify-center">
                <span className="text-sm text-stone-600 font-medium">
                  {savedCount > 10 ? "10+" : savedCount}
                </span>
              </div>
            </div>
            <Bookmark
              bookmarkIsOpen={bookmarkIsOpen}
              setBookmarkIsOpen={setBookmarkIsOpen}
              handleSaveItem={handleSaveItem}
              currentUser={user}
              savedRecipes={savedRecipesPreview}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;

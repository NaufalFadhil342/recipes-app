import { useRef, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useSaveItem } from "../../hooks/useSaveItem";
import Bookmark from "../../UI/bookmark";
import Search from "../../UI/search";
import MenuLinks from "./menuLinks";
import { AnimatePresence, motion } from "motion/react";

const navbar = [
  { name: "Home", path: "/", icon: "material-symbols:home-outline-rounded" },
  { name: "Recipes", path: "/recipes", icon: "pajamas:recipe" },
  { name: "About", path: "/about", icon: "mdi:company" },
  { name: "Contact", path: "/contact", icon: "hugeicons:contact-02" },
];

const Navbar = () => {
  const {
    bookmarkIsOpen,
    setBookmarkIsOpen,
    savedItems,
    handleSaveItem,
    savedRecipes,
    currentUser,
  } = useSaveItem();
  const bookmarkRef = useRef();
  const [showSidebarMenu, setShowSidebarMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (bookmarkRef.current && !bookmarkRef.current.contains(e.target)) {
        setBookmarkIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const itemsCount = Object.values(savedItems).filter(Boolean).length;

  return (
    <section className="w-full h-24 bg-primary flex items-center justify-between gap-6 px-12 md:px-20">
      <nav className="w-auto md:w-full h-auto relative">
        <MenuLinks display="hidden md:flex flex-row" navbar={navbar} />
        <button
          type="button"
          className="w-auto h-auto block md:hidden"
          onClick={() => setShowSidebarMenu(true)}
          aria-label="sidebar menu"
        >
          <Icon icon="ic:round-menu" className="size-7 text-white" />
        </button>
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
      </nav>
      <div className="w-full h-auto flex items-center gap-6 justify-end">
        <div className="w-full h-auto bg-stone-100 rounded-full flex items-center">
          <Search placeholder="Find a recipe" />
        </div>
        <div className="relative" ref={bookmarkRef}>
          <div
            className="relative hover:cursor-pointer"
            onClick={() => setBookmarkIsOpen((prev) => !prev)}
          >
            <Icon icon="majesticons:bookmark" className="size-7 text-stone-" />
            <div className="absolute -top-2 -right-1.5 z-2 bg-stone-100 rounded-full size-5 flex items-center justify-center">
              <span className="text-sm text-stone-600 font-medium">
                {itemsCount}
              </span>
            </div>
          </div>
          <Bookmark
            bookmarkIsOpen={bookmarkIsOpen}
            savedRecipes={savedRecipes}
            handleSaveItem={handleSaveItem}
            currentUser={currentUser}
          />
        </div>
      </div>
    </section>
  );
};

export default Navbar;

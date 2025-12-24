import { useRef, useEffect } from "react";
import { NavLink } from "react-router";
import { Icon } from "@iconify/react";
import { useSaveItem } from "../../hooks/useSaveItem";
import Bookmark from "../../UI/bookmark";

const navbar = [
  { name: "Home", path: "/" },
  { name: "Recipes", path: "/recipes" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
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
    <section className="w-full h-24 bg-primary flex items-center justify-between gap-6 px-20">
      <nav className="w-full h-auto">
        <ul className="w-auto h-auto flex items-center gap-6">
          {navbar.map((nav, index) => (
            <li key={index}>
              <NavLink
                to={nav.path}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-white" : "hover:text-white"
                  } group font-medium transition-colors duration-150 ease-in-out`
                }
              >
                {({ isActive }) => (
                  <span className="block">
                    <>{nav.name}</>
                    <div
                      className={`w-0 h-0.5 group-hover:w-1/2 bg-white ${
                        isActive ? "w-1/2" : "w-0 group-hover:w-1/2"
                      } transition-all duration-150 ease-in-out`}
                    />
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="w-full h-auto flex items-center gap-6 justify-end">
        <div className="w-full h-auto bg-stone-100 rounded-full flex items-center">
          <input
            type="text"
            className="border-none w-full h-12 pl-4 outline-none text-stone-800"
            placeholder="Find a recipe"
          />
          <Icon
            icon="bitcoin-icons:search-filled"
            className="size-8 mr-2 hover:cursor-pointer"
          />
        </div>
        <div className="relative" ref={bookmarkRef}>
          <section
            className="relative hover:cursor-pointer"
            onClick={() => setBookmarkIsOpen((prev) => !prev)}
          >
            <Icon icon="majesticons:bookmark" className="size-7 text-stone-" />
            <div className="absolute -top-2 -right-1.5 z-2 bg-stone-100 rounded-full size-5 flex items-center justify-center">
              <span className="text-sm text-stone-600 font-medium">
                {itemsCount}
              </span>
            </div>
          </section>
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

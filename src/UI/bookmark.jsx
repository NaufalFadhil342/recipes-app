import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import Loading from "./loading";

const Bookmark = ({
  bookmarkIsOpen,
  setBookmarkIsOpen,
  handleSaveItem,
  currentUser,
  savedRecipes,
  loading,
}) => {
  if (!bookmarkIsOpen) return null;

  return (
    <AnimatePresence>
      {bookmarkIsOpen && (
        <motion.section
          className="w-full sm:max-w-104 h-auto absolute z-10 top-full right-0 translate-y-8 bg-white shadow-[0_3px_6px_rgba(41,37,36,0.08)] p-6 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {loading && (
            <div className="w-full h-14 flex items-center justify-center">
              <Loading />
            </div>
          )}
          {!loading && (!currentUser || savedRecipes.length === 0) && (
            <p className="text-gray-500 mx-auto text-center">
              {!currentUser
                ? "Please sign in to save recipes!"
                : "You are not saved any items yet."}
            </p>
          )}
          {!loading && currentUser && savedRecipes.length > 0 && (
            <ul className="w-full h-auto flex flex-col items-start gap-6">
              {savedRecipes.map((item) => {
                const recipe = item.recipes;
                const author = recipe?.users?.author || "Unknown";

                return (
                  <li
                    key={item.id}
                    className="w-full h-auto flex gap-4 items-start xs:items-center"
                  >
                    <div className="w-full h-auto flex flex-col items-start gap-4 xs:items-center xs:flex-row">
                      <div className="w-full h-28 xs:w-20 xs:h-16 rounded-md overflow-hidden">
                        <img
                          className="w-full h-full object-cover object-center"
                          src={recipe?.img_cover}
                          alt={recipe?.alt_text}
                          loading="lazy"
                        />
                      </div>
                      <div className="w-full h-auto">
                        <h3 className="text-lg font-medium text-inherit">
                          {recipe?.title}
                        </h3>
                        <p className="text-sm text-stone-500">by {author}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="w-8 h-6 rounded-full flex items-center justify-center bg-stone-600/10 text-stone-800 font-medium hover:bg-stone-600 hover:text-white hover:cursor-pointer transition-all duration-150 ease-in-out"
                      title="Unsave recipe"
                      onClick={() =>
                        handleSaveItem(item.recipe.id, recipe.title)
                      }
                    >
                      <span className="block -mt-0.5">x</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          {savedRecipes.length >= 3 && (
            <div className="w-full h-auto mt-6 flex justify-center">
              <Link
                to="/saved"
                className="text-stone-600 font-medium hover:text-primary transition-colors duration-150 ease-in-out"
                onClick={() => setBookmarkIsOpen(false)}
              >
                View all saved
              </Link>
            </div>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Bookmark;

import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";

const Bookmark = ({
  bookmarkIsOpen,
  savedRecipes,
  handleSaveItem,
  currentUser,
}) => {
  const splitRecipes = savedRecipes.slice(0, 3);

  return (
    <AnimatePresence>
      {bookmarkIsOpen && (
        <motion.section
          className="min-w-104 h-auto absolute z-10 top-full right-0 translate-y-8 bg-white shadow-[0_3px_6px_rgba(41,37,36,0.08)] p-6 rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {savedRecipes.length === 0 ? (
            <p className="w-fit text-gray-500 mx-auto text-center">
              {!currentUser
                ? "Please sign in to save recipes!"
                : "No saved recipes yet."}
            </p>
          ) : (
            <ul className="w-full h-auto flex flex-col items-start gap-6">
              {splitRecipes.map((recipe) => (
                <li
                  key={recipe.id}
                  className="w-full h-auto flex gap-4 items-center"
                >
                  <div className="w-20 h-16 rounded-md overflow-hidden">
                    <img
                      className="w-full h-full object-cover object-center"
                      src={recipe.img_cover}
                      alt={recipe.alt_text}
                      loading="lazy"
                    />
                  </div>
                  <div className="w-full h-auto">
                    <h3 className="text-lg font-medium text-inherit">
                      {recipe.title}
                    </h3>
                    <p className="text-sm text-stone-500">
                      {recipe.users?.author}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="w-8 h-6 rounded-full flex items-center justify-center bg-stone-600/10 text-stone-800 font-medium hover:bg-stone-600 hover:text-white hover:cursor-pointer transition-all duration-150 ease-in-out"
                    title="Remove recipe item"
                    onClick={() => handleSaveItem(recipe.id)}
                  >
                    <span className="block -mt-0.5">x</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
          {savedRecipes.length > 3 && (
            <div className="w-full h-auto mt-6 flex justify-center">
              <Link
                to="/saved"
                className="text-stone-600 font-medium hover:text-primary transition-colors duration-150 ease-in-out"
              >
                See More
              </Link>
            </div>
          )}
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default Bookmark;

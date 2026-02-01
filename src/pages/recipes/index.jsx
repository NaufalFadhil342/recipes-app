import recipesCover from "../../assets/recipes.webp";
import { useRecipes } from "../../hooks/useRecipes";
import Recipe from "../../components/recipe";
import Filters from "../../components/filters";
import { useRouteLoaderData } from "react-router";
import { useFilters } from "../../hooks/useFilters";
import { useSearch } from "../../hooks/useSearch";
import Loading from "../../UI/loading";
import { Icons } from "../../icons";
import { recipeIcons } from "../../data/recipeIconsData";

const Recipes = () => {
  const { handleSaveItem, isRecipeSaved } = useRecipes();
  const { recipes } = useRouteLoaderData("root");
  const { isSearching } = useSearch({
    path: "/recipes",
    preserveOtherParams: true,
    redirectOnSearch: true,
  });
  const {
    filteredRecipes,
    showFilters,
    handleOpen,
    handleClose,
    tempFilters,
    setTempFilters,
    handleApply,
    handleClear,
    appliedFilters,
    getEmptyStateMessage,
    searchQuery,
  } = useFilters(recipes);

  const hasActiveSearch = searchQuery.trim();
  const hasActiveFilters =
    searchQuery.trim() ||
    appliedFilters.sortBy !== "popular" ||
    (appliedFilters.category && appliedFilters.category.length > 0) ||
    (appliedFilters.countries && appliedFilters.countries.length > 0);

  const showHero = !hasActiveFilters && !hasActiveSearch;

  return (
    <section className="w-full h-auto">
      {showHero && (
        <div className="w-full h-[80vh] relative">
          <div className="w-full h-full overflow-hidden">
            <img
              className="w-full h-full object-cover object-center"
              src={recipesCover}
              width={1000}
              height={1000}
              alt="Recipes Pages"
              loading="lazy"
            />
          </div>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-6 bg-stone-900/65 px-12 md:px-20">
            <h1 className="text-4xl font-bold text-white leading-none uppercase text-center">
              Recipes
            </h1>
            <p className="text-stone-200 text-medium text-center">
              The recipes all you need can be found right here.
            </p>
          </div>
        </div>
      )}
      <div className="w-full h-auto my-28 px-12 md:px-20 relative">
        <div className="w-full h-auto flex items-start justify-between gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold text-inherit flex items-center gap-2 capitalize">
              {searchQuery ? searchQuery : "What to Cook?"}
            </h2>
            <div className="w-14 h-0.5 bg-primary" />
          </div>
          <button
            type="button"
            className="w-auto h-10 px-2.5 rounded-md bg-white flex items-center gap-2 shadow-[2px_2px_4px_rgba(41,37,36,0.07)] hover:cursor-pointer"
            onClick={handleOpen}
            aria-label="Filter recipes"
          >
            <Icons
              iconsName={recipeIcons.myuiFilter}
              className="text-stone-600 size-6.5"
            />
            <p className="text-stone-600 font-medium hidden xs:block">
              Filters
            </p>
          </button>
          {showFilters && (
            <div
              className="fixed left-0 top-0 z-10 w-full h-screen py-20 bg-stone-900/70 flex items-center justify-center"
              onClick={handleClose}
            >
              <Filters
                tempFilters={tempFilters}
                setTempFilters={setTempFilters}
                handleApply={handleApply}
                handleClear={handleClear}
                recipes={recipes}
              />
            </div>
          )}
        </div>
        <div className="w-full h-auto mt-10">
          {isSearching ? (
            <div className="w-full h-auto flex items-center justify-center">
              <Loading />
            </div>
          ) : filteredRecipes.length > 0 ? (
            <ul className="w-full h-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredRecipes.map((recipe) => {
                const isSaved = isRecipeSaved(recipe.id);

                return (
                  <Recipe
                    key={recipe.id}
                    recipe={recipe}
                    savedItems={isSaved}
                    handleSaveItem={handleSaveItem}
                  />
                );
              })}
            </ul>
          ) : (
            <div className="w-full h-auto my-28 flex flex-col items-center justify-center">
              <h3 className="text-xl text-inherit">
                {getEmptyStateMessage()} Try another filter or clear all.
              </h3>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="w-auto h-10 px-4 mt-4 rounded-md bg-white flex items-center gap-2 shadow-[2px_2px_4px_rgba(41,37,36,0.07)] hover:cursor-pointer"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Recipes;

import { useMemo } from "react";
import Recipe from "../../components/recipe";
import { useCategory } from "../../hooks/useCategory";
import { useItemsPerViewport } from "../../hooks/useItemsPerViewport";
import { useRecipes } from "../../hooks/useRecipes";

const Cooking = ({ recipes }) => {
  const { selectRegion } = useCategory();
  const { isRecipeSaved, handleSaveItem } = useRecipes();
  const itemsToShow = useItemsPerViewport();

  const filterRecipes = useMemo(() => {
    if (selectRegion === "") {
      return recipes;
    }

    return recipes.filter((recipe) => recipe.country?.region === selectRegion);
  }, [selectRegion, recipes]);

  const sliceRecipes = filterRecipes.slice(0, itemsToShow);

  return (
    <section className="w-full h-auto my-28 px-12 md:px-20">
      <ul className="w-full h-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {sliceRecipes.map((recipe) => {
          const isSaved = isRecipeSaved(recipe.id);

          return (
            <Recipe
              key={recipe.id}
              recipe={recipe}
              savedItem={isSaved}
              handleSaveItem={handleSaveItem}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Cooking;

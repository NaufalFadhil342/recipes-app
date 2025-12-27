import { useMemo } from "react";
import chefImg from "../../assets/chef.jpg";
import Recipes from "../../components/recipes";
import { useCategory } from "../../hooks/useCategory";
import { useSaveItem } from "../../hooks/useSaveItem";
import { useItemsPerViewport } from "../../hooks/useItemsPerViewport";

const Cooking = ({ recipes }) => {
  const { selectCategory } = useCategory();
  const { savedItems, handleSaveItem } = useSaveItem();
  const itemsToShow = useItemsPerViewport();

  const filterRecipes = useMemo(() => {
    if (selectCategory === "") {
      return recipes;
    }

    return recipes.filter((recipe) => recipe.category === selectCategory);
  }, [selectCategory, recipes]);

  const sliceRecipes = filterRecipes.slice(0, itemsToShow);

  return (
    <section className="w-full h-auto my-28 px-12 md:px-20">
      <ul className="w-full h-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {sliceRecipes.map((recipe) => {
          return (
            <Recipes
              key={recipe.id}
              recipe={recipe}
              avatar={chefImg}
              savedItems={savedItems}
              handleSaveItem={handleSaveItem}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Cooking;

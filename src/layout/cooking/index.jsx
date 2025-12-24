import { useMemo } from "react";
import chefImg from "../../assets/chef.jpg";
import Recipes from "../../components/recipes";
import { useCategory } from "../../hooks/useCategory";
import { useSaveItem } from "../../hooks/useSaveItem";

const Cooking = ({ recipes }) => {
  const { selectCategory } = useCategory();
  const { savedItems, handleSaveItem } = useSaveItem();

  const filterRecipes = useMemo(() => {
    if (selectCategory === "") {
      return recipes;
    }

    return recipes.filter((recipe) => recipe.category === selectCategory);
  }, [selectCategory, recipes]);

  const sliceRecipes = filterRecipes.slice(0, 6);

  return (
    <section className="w-full h-auto my-28 px-20">
      <ul className="w-full h-auto grid grid-cols-3 gap-10">
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

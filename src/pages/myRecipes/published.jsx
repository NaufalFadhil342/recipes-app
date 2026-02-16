import { useRouteLoaderData } from "react-router";
import { useRecipes } from "../../hooks/useRecipes";
import Recipe from "../../components/recipe";

const Published = () => {
  const { recipes } = useRouteLoaderData("root");
  const { isRecipeSaved, handleSaveItem } = useRecipes();

  return (
    <div className="w-full h-auto">
      {recipes.length === 0 ? (
        <div className="text-xl font-semibold text-gray-500 text-center mt-10">
          No published recipes available..
        </div>
      ) : (
        <ul className="w-full h-auto grid grid-cols-3 gap-8 mt-14">
          {recipes.map((recipe) => {
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
      )}
    </div>
  );
};

export default Published;

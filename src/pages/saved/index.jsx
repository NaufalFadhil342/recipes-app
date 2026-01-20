import { useLoaderData } from "react-router";
import Recipe from "../../components/recipe";
import { useRecipes } from "../../hooks/useRecipes";

const Saved = () => {
  const { isRecipeSaved, handleSaveItem } = useRecipes();
  const { savedRecipes } = useLoaderData();

  return (
    <section className="w-full h-auto my-28 px-12 md:px-20 flex flex-col gap-14">
      <div className="w-full h-auto">
        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-semibold text-inherit capitalize">
            your saves
          </h2>
          <span className="text-3xl font-medium text-stone-600/50">
            ({savedRecipes.length})
          </span>
        </div>
        <div className="mt-4 w-full sm:max-w-sm h-0.5 bg-stone-500/25" />
      </div>
      <ul className="w-full h-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {savedRecipes.map((savedItem) => {
          const isSaved = isRecipeSaved(savedItem.recipes.id);

          return (
            <Recipe
              key={savedItem.id}
              recipe={savedItem.recipes}
              savedItems={isSaved}
              handleSaveItem={handleSaveItem}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Saved;

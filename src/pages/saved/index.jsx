import { useLoaderData } from "react-router";
import Recipe from "../../components/recipe";
import { useRecipes } from "../../hooks/useRecipes";

const Saved = () => {
  const { isRecipeSaved, handleSaveItem } = useRecipes();
  const { savedRecipes } = useLoaderData();

  return (
    <section className="w-full h-auto my-28 px-12 md:px-20 flex flex-col gap-10">
      <div className="w-full h-auto flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-inherit text-center leading-none">
          All Saved
        </h1>
        <div className="w-20 h-0.5 bg-primary" />
      </div>
      <div className="w-full h-auto">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold text-inherit">Your saves</h3>
          <span className="text-block text-xl text-stone-600">
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

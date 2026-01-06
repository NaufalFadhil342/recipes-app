import Loading from "../../UI/loading";
import Recipe from "../../components/recipe";
import { useRecipes } from "../../hooks/useRecipes";
import { useSaveItem } from "../../hooks/useSaveItem";

const Saved = () => {
  const { data, isLoading, error } = useRecipes();
  const { savedItems, handleSaveItem } = useSaveItem();

  if (isLoading)
    return (
      <div className="w-full h-auto flex items-center justify-center my-20">
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="mx-auto max-w-md h-auto p-6 rounded-2xl bg-white shadow-[2px_4px_8px_rgba(41,37,36,0.1)] text-red-500 text-4xl font-bold">
        {error}
      </div>
    );

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
            ({data.savedRecipes.length})
          </span>
        </div>
        <div className="mt-4 w-full sm:max-w-sm h-0.5 bg-stone-500/25" />
      </div>
      <ul className="w-full h-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.savedRecipes?.map((savedItem) => (
          <Recipe
            key={savedItem.id}
            recipe={savedItem.recipes}
            savedItems={savedItems}
            handleSaveItem={handleSaveItem}
          />
        ))}
      </ul>
    </section>
  );
};

export default Saved;

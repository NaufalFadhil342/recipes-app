const Ingredients = ({ ingredients, setCreateArticle, handleIngredient }) => {
  return (
    <div className="w-auto h-auto">
      <h3 className="text-xl text-inherit font-medium leading-none">
        Ingredients
      </h3>
      {ingredients.map((ingredient, index) => (
        <div className="flex items-center gap-3 mt-5" key={index}>
          <input
            type="text"
            className="w-full border-b border-gray-400 py-2 pl-2 outline-none focus:border-primary"
            placeholder="Enter ingredient"
            value={ingredient}
            onChange={(e) => {
              const updatedIngredients = [...ingredients];
              updatedIngredients[index] = e.target.value;
              setCreateArticle((prev) => ({
                ...prev,
                ingredients: updatedIngredients,
              }));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleIngredient();
              }
            }}
          />
          {ingredient.trim() && (
            <button
              type="button"
              onClick={() => {
                const updatedIngredients = ingredients.filter(
                  (_, i) => i !== index,
                );
                setCreateArticle((prev) => ({
                  ...prev,
                  ingredients: updatedIngredients,
                }));
              }}
              className="size-8 rounded-md border border-gray-400 flex items-center justify-center text-stone-600"
            >
              -
            </button>
          )}
        </div>
      ))}
      <div className="w-full h-auto flex justify-end">
        <button
          type="button"
          className="size-8 rounded-md mt-5 border border-gray-400 flex items-center justify-center text-stone-600"
          onClick={handleIngredient}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Ingredients;

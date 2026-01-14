const Category = ({ recipes, tempFilters, setTempFilters }) => {
  const categories = [...new Set(recipes.map((recipe) => recipe.category))];

  const changeCategory = (category) => {
    setTempFilters((prev) => {
      const crrCategories = prev.category || [];

      if (crrCategories.includes(category)) {
        return {
          ...prev,
          category: crrCategories.filter((cat) => cat !== category),
        };
      } else {
        return {
          ...prev,
          category: [...crrCategories, category],
        };
      }
    });
  };

  const selectedCategories = tempFilters.category || [];

  return (
    <div className="w-full h-auto px-4">
      <div className="font-medium text-inherit pb-2.5 border-b border-stone-500/20">
        Category
      </div>
      <ul className="mt-2 flex flex-col gap-1.5">
        {categories.map((category) => (
          <li key={category} className="flex items-center gap-2">
            <input
              type="checkbox"
              className="size-3.5 accent-primary hover:cursor-pointer"
              checked={selectedCategories.includes(category)}
              onChange={() => changeCategory(category)}
            />
            <p className="capitalize">{category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;

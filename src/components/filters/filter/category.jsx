const categories = [
  { name: "foods", value: "food" },
  { name: "beverages", value: "beverage" },
];

const Category = ({ tempFilters, setTempFilters }) => {
  const changeCategory = (categoryValue) => {
    setTempFilters((prev) => ({
      ...prev,
      category: categoryValue === "all" ? "" : categoryValue,
    }));
  };

  const selectedCategory = tempFilters.category || "";

  return (
    <div className="w-full h-auto px-4">
      <div className="font-medium text-inherit pb-2.5 border-b border-stone-500/20">
        Category
      </div>
      <ul className="mt-2 flex flex-col gap-1.5">
        <li className="flex items-center gap-2">
          <input
            type="radio"
            name="category"
            className="size-3.5 accent-primary hover:cursor-pointer outline-none"
            checked={selectedCategory === ""}
            onChange={() => changeCategory("all")}
          />
          <p className="capitalize">All</p>
        </li>

        {categories.map((category, index) => (
          <li key={index} className="flex items-center gap-2">
            <input
              type="radio"
              name="category"
              className="size-3.5 accent-primary hover:cursor-pointer outline-none"
              checked={selectedCategory === category.value}
              onChange={() => changeCategory(category.value)}
            />
            <p className="capitalize">{category.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;

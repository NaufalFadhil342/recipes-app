const categoriesOption = [
  {
    label: "Foods",
    key: "food",
  },
  {
    label: "Beverages",
    key: "beverage",
  },
];

const Categories = ({ recipes }) => {
  const categoryCounts = recipes.reduce((acc, recipe) => {
    const category = recipe.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="w-full h-auto">
      <div className="w-full">
        <h4 className="text-xl text-inherit font-semibold mb-2">Categories</h4>
        <div className="w-full h-0.5 bg-stone-600/15" />
      </div>
      <ul className="w-full h-auto mt-6 flex flex-col gap-2">
        {categoriesOption.map((option, index) => {
          const count = categoryCounts[option.key] || 0;

          return (
            <li
              key={index}
              className="w-full text-stone-600 hover:text-primary flex items-center gap-2 transition-colors duration-150 ease-in-out hover:cursor-default"
            >
              <p className="capitalize">{option.label}</p>
              <span className="block">({count})</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;

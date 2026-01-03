import React from "react";

const Categories = ({ recipes }) => {
  const categoryCounts = recipes.reduce((acc, recipe) => {
    const category = recipe.category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const uniqueCategories = Object.entries(categoryCounts).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  return (
    <div className="w-full h-auto">
      <div className="w-full">
        <h4 className="text-xl text-inherit font-semibold mb-2">Categories</h4>
        <div className="w-full h-0.5 bg-stone-600/15" />
      </div>
      <ul className="w-full h-auto mt-6 flex flex-col gap-2">
        {uniqueCategories.map(([category, count]) => {
          return (
            <li
              key={category}
              className="w-full text-stone-600 hover:text-primary flex items-center gap-2 transition-colors duration-150 ease-in-out hover:cursor-default"
            >
              <p className="capitalize">{category}</p>
              <span className="block">({count})</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;

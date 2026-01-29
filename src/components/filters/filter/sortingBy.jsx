import { Icons } from "../../../icons";
import { recipeIcons } from "../../../data/recipeIconsData";

const sortings = [
  { name: "Newest", label: "newest" },
  { name: "Popular", label: "popular" },
];

const SortingBy = ({ sortBy, setSortBy }) => {
  const handleSorting = (label) => {
    setSortBy(label);
  };

  return (
    <section className="w-full h-auto px-4">
      <div className="font-medium text-inherit pb-2.5 border-b border-stone-500/20">
        Sort by
      </div>
      <ul className="mt-2 flex flex-col gap-1.5">
        {sortings.map((sort, index) => {
          return (
            <li key={index}>
              <button
                type="button"
                className="grid grid-cols-[0.5fr_1fr] gap-1"
                onClick={() => handleSorting(sort.label)}
              >
                <Icons
                  iconsName={recipeIcons.mysCheck}
                  className={`text-stone-800 size-6 ${
                    sortBy === sort.label ? "opacity-100" : "opacity-0"
                  }`}
                />
                <p
                  className={
                    sortBy === sort.label
                      ? "text-inherit font-medium cursor-pointer"
                      : "text-stone-600 font-medium hover:text-inherit hover:cursor-pointer"
                  }
                >
                  {sort.name}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SortingBy;

import { Icon } from "@iconify/react";
import { Link } from "react-router";

const Recipe = ({ recipe, savedItems, handleSaveItem }) => {
  return (
    <li
      className="w-full h-72 rounded-3xl overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${recipe.img_cover})` }}
    >
      <div className="w-full h-full bg-stone-800/50 p-6 flex flex-col justify-between gap-4">
        <div className="w-full h-auto flex justify-between items-center gap-3">
          <span className="px-3 py-1.5 rounded-md bg-primary text-sm font-medium capitalize">
            {recipe.category}
          </span>
          <Icon
            icon={
              savedItems[recipe.id]
                ? "majesticons:bookmark"
                : "majesticons:bookmark-line"
            }
            className="text-white size-7 hover:cursor-pointer"
            onClick={() => handleSaveItem(recipe.id)}
          />
        </div>
        <div className="w-full h-auto">
          <h3 className="text-xl font-semibold text-white">{recipe.title}</h3>
          <div className="w-full h-auto flex items-center justify-between gap-3 mt-4">
            <span className="w-auto h-auto flex items-center gap-4">
              <div className="size-14 rounded-full border-[3px] border-white overflow-hidden">
                <img
                  className="w-full h-full object-cover object-[-1rem_0]"
                  width={1000}
                  height={600}
                  src={recipe?.users?.avatar_url}
                  alt="chef"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-white font-medium">
                  {recipe?.users?.author}
                </p>
                <span className="text-sm text-stone-200 italic">Chef</span>
              </div>
            </span>
            <Link className="group size-11 bg-primary flex items-center justify-center rounded-full relative hover:bg-dark transtion-colors duration-150 ease-in-out">
              <Icon
                icon="ri:arrow-right-fill"
                className="size-6 rotate-90 group-hover:rotate-0 transition-all duration-150 ease-in-out"
              />
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Recipe;

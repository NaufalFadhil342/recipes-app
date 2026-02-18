import { Link } from "react-router";

const TopViews = ({ recipes, currentRecipeId }) => {
  const sortByViews = [...recipes]
    .filter((recipe) => recipe.id !== currentRecipeId)
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  return (
    <div className="w-full h-auto">
      <div className="w-full h-auto">
        <h4 className="text-xl font-semibold text-inherit mb-2">Top Views</h4>
        <div className="w-full h-0.5 bg-stone-600/15" />
      </div>
      <ul className="w-full h-auto flex flex-col gap-6 mt-8">
        {sortByViews.map((recipe) => {
          const timeStampz = new Date(recipe.updated_at);
          const date = timeStampz.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });

          return (
            <li
              key={recipe.id}
              className="w-full h-auto flex items-stretch justify-start gap-3"
            >
              <div className="flex-[0_0_35%] w-auto h-22 rounded-lg overflow-hidden">
                <img
                  className="w-full h-full object-cover object-center"
                  src={recipe.img_cover}
                  alt={recipe.alt_text}
                  loading="lazy"
                  width={800}
                />
              </div>
              <div className="flex-[0_0_65%] w-auto h-auto flex flex-col justify-center">
                <div className="text-sm text-stone-500 leading-none">
                  {date}
                </div>
                <Link
                  to={`/recipes/${recipe.slug}`}
                  className="text-lg font-semibold text-inherit leading-none mt-2"
                  onClick={() => scrollTo({ top: true })}
                >
                  {recipe.title}
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TopViews;

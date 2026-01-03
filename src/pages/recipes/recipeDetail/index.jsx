import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { dummyArticle } from "../../../data/dummyArticle";
import { useRecipeArticle } from "../../../hooks/useRecipeArticle";
import { useRecipes } from "../../../hooks/useRecipes";
import DefaultArticle from "./defaultArticle";
import ShareIt from "./sideContent/shareIt";
import TopViews from "./sideContent/topViews";
import Categories from "./sideContent/category";
import Tags from "./sideContent/tags";
import Loading from "../../../UI/loading";
import Comments from "../../../components/comments";

const shareArticle = [
  { icon: "devicon:facebook", name: "facebook" },
  { icon: "logos:twitter", name: "twitter" },
  { icon: "ic:round-share", name: "share" },
];

const RecipeDetail = () => {
  const { recipe, date, error, loading } = useRecipeArticle();
  const { data } = useRecipes();

  useEffect(() => {
    console.log("recipes data:", data.recipes);
  }, [data.recipes]);

  if (loading)
    return (
      <div className="w-full h-auto flex items-center justify-center my-20">
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-4xl font-bold">Error: {error}</div>
    );

  if (!recipe)
    return (
      <div className="text-center text-4xl font-bold text-inherit my-28 px-20">
        Selected Recipe is not Found!
      </div>
    );

  return (
    <section className="w-full h-auto py-28 px-20">
      <div className="w-full h-full flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold text-inherit leading-none">
          {recipe.title}
        </h1>
        <span className="w-auto h-auto px-3 rounded-full border-2 border-primary text-primary font-semibold block capitalize">
          {recipe.category}
        </span>
        <div className="w-full h-[75vh] rounded-3xl overflow-hidden">
          <img
            className="w-full h-full object-cover object-center"
            src={recipe.img_cover}
            alt={recipe.alt_text}
            loading="lazy"
          />
        </div>
      </div>
      <div className="w-full h-auto grid grid-cols-[2fr_0.8fr] mt-10 gap-8">
        <div className="w-full h-auto">
          <div className="w-full h-auto flex items-start justify-between gap-4">
            <div className="w-auto h-auto flex items-center gap-4">
              <div className="size-12 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-center object-cover"
                  src={recipe?.users.avatar_url}
                  alt={recipe?.users.author}
                />
              </div>
              <div className="w-auto h-auto">
                <h3 className="text-lg font-medium text-inherit leading-none">
                  {recipe?.users.author}
                </h3>
                <p className="text-stone-500">{recipe?.users.profession}</p>
              </div>
            </div>
            <div className="w-auto h-auto flex items-center gap-2">
              <Icon
                icon="solar:calendar-bold"
                className="size-5 text-stone-500"
              />
              <p className="text-stone-500 font-medium">{date}</p>
            </div>
          </div>
          <div className="mt-8 w-full h-auto">
            {!recipe.content ? (
              <ul className="w-full h-auto">
                {dummyArticle.map((article) => (
                  <DefaultArticle key={article.id} article={article} />
                ))}
              </ul>
            ) : null}
          </div>
          <div className="w-full h-auto mt-8">
            <Comments />
          </div>
        </div>
        <div className="w-full h-auto flex flex-col gap-8">
          <ShareIt shareArticle={shareArticle} />
          <TopViews recipes={data.recipes} />
          <Categories recipes={data.recipes} />
          <Tags recipe={recipe} />
        </div>
      </div>
    </section>
  );
};

export default RecipeDetail;

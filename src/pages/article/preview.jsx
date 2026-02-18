import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Loading from "../../UI/loading";
import { supabase } from "../../utils/supabase";
import { Icons } from "../../icons";
import { recipeIcons } from "../../data/recipeIconsData";
import { formatDistanceToNow } from "date-fns";
import DOMPurify from "dompurify";

const Preview = () => {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("recipes")
          .select(
            "title, introduction, author_id, ingredients, instructions, category, img_cover, video_url, created_at, updated_at, additional_info, users (author, avatar_url, profession)",
          )
          .eq("slug", slug)
          .eq("is_draft", true)
          .single();

        if (error) {
          console.error("Error fetching recipe for preview:", error);
          navigate("/my-recipes/draft");
          return;
        }

        setRecipe(data);
        setLoading(false);
      } catch (error) {
        console.error("Unexpected error fetching recipe:", error);
        setLoading(false);
        navigate("/my-recipes/draft");
      }
    };

    fetchRecipe();
  }, [navigate, slug]);

  if (loading)
    return (
      <div className="my-28 w-full h-auto flex items-center justify-center">
        <Loading />
      </div>
    );

  const formattedDate = formatDistanceToNow(new Date(recipe.created_at), {
    addSuffix: true,
  });

  const introduction = DOMPurify.sanitize(recipe.introduction);
  const additionalInfo = DOMPurify.sanitize(recipe.additional_info);

  return (
    <section className="w-full h-auto my-28 px-12 md:px-20 flex flex-col items-center gap-10 relative">
      <div className="absolute top-0 right-20">
        <Link
          to={`/edit/${recipe.author_id}/${slug}`}
          className="w-auto h-8 rounded-full px-3 border border-primary bg-primary/25 text-stone-600 font-medium flex items-center gap-2"
        >
          <Icons
            iconsName={recipeIcons.riEdit}
            className="size-5 text-stone-600"
          />
          <>Edit</>
        </Link>
      </div>
      <div className="w-full h-auto flex flex-col gap-6 items-center">
        <h1 className="text-4xl font-bold text-center text-inherit leading-none">
          {recipe.title}
        </h1>
        <span className="w-fit h-7 px-4 rounded-full border border-primary text-primary font-medium flex items-center">
          {recipe.category}
        </span>
        <div className="w-full h-[80vh] rounded-3xl overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${recipe.img_cover})` }}
            aria-label={recipe.title}
          />
        </div>
      </div>
      <div className="w-full h-auto">
        <div className="w-full flex justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover object-center"
                src={recipe.users?.avatar_url}
                alt={recipe.users?.author}
                referrerPolicy="no-referrer"
                width={500}
                height={500}
              />
            </div>
            <div className="w-auto h-auto">
              <p className="font-medium text-inherit">{recipe.users?.author}</p>
              <span className="block text-sm text-stone-500">
                {recipe.users?.profession}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Icons
              iconsName={recipeIcons.solarCalendar}
              className="text-gray-500 size-5"
            />
            <p className="text-stone-500">{formattedDate}</p>
          </div>
        </div>
      </div>
      <div className="w-full h-auto flex flex-col gap-6">
        <div>
          <div
            className="text-stone-600"
            dangerouslySetInnerHTML={{ __html: introduction }}
          />
        </div>
        <div className="w-full h-auto">
          <div className="flex items-center gap-3">
            <Icons
              className="size-10 text-primary -ml-2"
              iconsName={recipeIcons.healthVege}
            />
            <h3 className="text-2xl font-medium text-inherit">Ingredients</h3>
          </div>
          <ul className="list-disc list-inside mt-4 space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-stone-600">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full h-auto">
          <div className="flex items-center gap-3">
            <Icons
              iconsName={recipeIcons.ipsCook}
              className="size-10 text-primary -ml-2"
            />
            <h3 className="text-2xl font-medium text-inherit">Instructions</h3>
          </div>
          <ol className="list-inside list-decimal space-y-2 mt-4">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="text-stone-600">
                {instruction}
              </li>
            ))}
          </ol>
        </div>
        <div className="w-full h-auto">
          <div
            className="text-stone-600"
            dangerouslySetInnerHTML={{ __html: additionalInfo }}
          />
        </div>
      </div>
    </section>
  );
};

export default Preview;

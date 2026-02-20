import { useRecipes } from "../../hooks/useRecipes";
import Recipe from "../../components/recipe";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import Loading from "../../UI/loading";

const Published = () => {
  const { isRecipeSaved, handleSaveItem } = useRecipes();
  const { user } = useAuth();
  const [published, setPublished] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPublished = async () => {
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("recipes")
          .select(`*, users (author, avatar_url, profession)`)
          .eq("is_draft", false)
          .eq("author_id", user.id);

        if (error) {
          console.error("Error fetching published data:", error.message);
          throw error;
        }

        console.log("fetching published data:", data);
        setPublished(data);
      } catch (error) {
        console.error("Failed to fetching published data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublished();
  }, [user.id]);

  if (loading)
    return (
      <div className="w-full h-auto my-14 flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <div className="w-full h-auto">
      {published.length === 0 ? (
        <div className="text-xl font-semibold text-gray-500 text-center mt-10">
          No published recipes available..
        </div>
      ) : (
        <ul className="w-full h-auto grid grid-cols-3 gap-8 mt-14">
          {published.map((recipe) => {
            const isSaved = isRecipeSaved(recipe.id);

            return (
              <Recipe
                key={recipe.id}
                recipe={recipe}
                savedItem={isSaved}
                handleSaveItem={handleSaveItem}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Published;

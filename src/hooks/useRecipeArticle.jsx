import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { supabase } from "../api/supabase";

export const useRecipeArticle = () => {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeSlug = async () => {
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("recipes")
          .select(`*, users (*)`)
          .eq("slug", slug)
          .single();

        if (error) {
          setError(error.message);
          setLoading(false);
          return;
        }

        setRecipe(data);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };

    fetchRecipeSlug();
  }, [slug]);

  const timeStampz = new Date(recipe?.updated_at);
  const date = timeStampz.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return {
    recipe,
    error,
    loading,
    date,
  };
};

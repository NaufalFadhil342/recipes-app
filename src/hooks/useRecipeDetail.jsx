import { useMemo } from "react";
import { useLoaderData } from "react-router";

export const useRecipeDetail = () => {
  const { recipe, allRecipes } = useLoaderData();

  const date = useMemo(() => {
    if (!recipe?.updated_at) return null;

    const timestamp = new Date(recipe?.updated_at);
    return timestamp.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, [recipe?.updated_at]);

  return {
    recipe,
    allRecipes,
    date,
  };
};

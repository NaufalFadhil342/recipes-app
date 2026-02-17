import { useMemo } from "react";
import { useLoaderData, useRouteLoaderData } from "react-router";
import { formatDistanceToNow } from "date-fns";

export const useRecipeDetail = () => {
  const { recipe } = useLoaderData();
  const { recipes } = useRouteLoaderData("root");

  const date = useMemo(() => {
    if (!recipe?.updated_at) return null;

    const timestamp = new Date(recipe?.updated_at);
    return formatDistanceToNow(timestamp, { addSuffix: true });
  }, [recipe?.updated_at]);

  return {
    recipe,
    allRecipes: recipes,
    date,
  };
};

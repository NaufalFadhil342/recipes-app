import { useContext } from "react";
import { RecipesCtx } from "../context/recipesCtx";

export const useRecipes = () => {
  const context = useContext(RecipesCtx);
  if (!context) {
    throw new Error("useRecipes must be used within a RecipesProvider");
  }

  return context;
};

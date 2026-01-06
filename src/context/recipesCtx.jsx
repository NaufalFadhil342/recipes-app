import { createContext, useState, useEffect } from "react";
import { supabase } from "../api/supabase";

const RecipesCtx = createContext();

const RecipesProvider = (props) => {
  const [data, setData] = useState({
    images: [],
    recipes: [],
    savedRecipes: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAllData() {
      setIsLoading(true);
      try {
        const [storageFiles, recipesRes, savedRecipesRes] = await Promise.all([
          supabase.storage.from("assets").list("", { limit: 100 }),
          supabase
            .from("recipes")
            .select(
              `
                *,
                users (
                  author,
                  avatar_url
                )`
            )
            .order("created_at", { ascending: false }),
          supabase.from("saved_recipes").select(
            `*,
              recipes (
               *,
               users (
                author,
                avatar_url
               )
              )   
              `
          ),
        ]);

        const imageUrls = storageFiles?.data.map((file) => {
          const { data: urlData } = supabase.storage
            .from("assets")
            .getPublicUrl(file.name);

          return {
            name: file.name,
            url: urlData.publicUrl,
          };
        });

        setData({
          images: imageUrls,
          recipes: recipesRes.data || [],
          savedRecipes: savedRecipesRes.data || [],
        });

        if (storageFiles.error) {
          console.error("Images error:", storageFiles.error);
          setError(storageFiles.error);
        }
        if (recipesRes.error) {
          console.error("Cooks error:", recipesRes.error);
          setError(recipesRes.error);
        }
        if (savedRecipesRes.error) {
          console.log("Saved items error:", savedRecipesRes.error);
          setError(savedRecipesRes.error);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllData();
  }, []);

  return (
    <RecipesCtx.Provider value={{ data, isLoading, error }}>
      {props.children}
    </RecipesCtx.Provider>
  );
};

export { RecipesCtx, RecipesProvider };

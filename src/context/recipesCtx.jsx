import { createContext, useState, useEffect } from "react";
import { supabase } from "../api/supabase";

const RecipesCtx = createContext();

const RecipesProvider = (props) => {
  const [data, setData] = useState({
    images: [],
    recipes: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAllData() {
      setIsLoading(true);
      try {
        const [storageFiles, recipesRes] = await Promise.all([
          supabase.storage.from("assets").list("", { limit: 100 }),
          supabase
            .from("recipes")
            .select(
              `
                *,
                users (
                  author
                )`
            )
            .order("created_at", { ascending: false }),
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
        });

        if (storageFiles.error)
          console.error("Images error:", storageFiles.error);
        if (recipesRes.error) console.error("Cooks error:", recipesRes.error);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllData();
  }, []);

  return (
    <RecipesCtx.Provider value={{ data, isLoading }}>
      {props.children}
    </RecipesCtx.Provider>
  );
};

export { RecipesCtx, RecipesProvider };

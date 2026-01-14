import { redirect } from "react-router";
import { supabase } from "../api/supabase";

export const globalLoader = async () => {
  try {
    const [storageFiles, recipesRes] = await Promise.all([
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
    ]);

    const imageUrls =
      storageFiles?.data?.map((file) => {
        const { data: urlData } = supabase.storage
          .from("assets")
          .getPublicUrl(file.name);

        return {
          name: file.name,
          url: urlData.publicUrl,
        };
      }) || [];

    if (recipesRes.error) {
      throw new Response("Failed to load recipes", { status: 500 });
    }

    return {
      images: imageUrls,
      recipes: recipesRes.data || [],
    };
  } catch (error) {
    console.error("Loader error:", error);
    throw new Response("Failed to load data", { status: 500 });
  }
};

export const savedRecipesLoader = async () => {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user || authError) {
      return redirect("/");
    }

    const { data, error } = await supabase
      .from("saved_recipes")
      .select(
        `
              *,
              recipes (
                *,
                users (
                  author,
                  avatar_url
                )
              )   
            `
      )
      .eq("user_id", user.id)
      .order("saved_at", { ascending: false });

    if (error) {
      throw new Response("Failed to load saved recipes", { status: 500 });
    }

    return {
      savedRecipes: data || [],
    };
  } catch (error) {
    console.error("Saved recipes loader error:", error);
    if (error instanceof Response) {
      throw error;
    }
    throw new Response("Failed to load saved recipes", { status: 500 });
  }
};

export const recipeDetailLoader = async ({ params }) => {
  const { slug } = params;

  if (!slug) {
    throw new Response("Recipe not found", { status: 404 });
  }

  try {
    const [recipeRes, allRecipesRes] = await Promise.all([
      supabase
        .from("recipes")
        .select(`*, users (author, avatar_url, profession)`)
        .eq("slug", slug)
        .single(),
      supabase.from("recipes").select("*"),
    ]);

    if (recipeRes.error || !recipeRes.data) {
      throw new Response("Recipe not found", { status: 404 });
    }

    if (allRecipesRes.error) {
      throw new Response("Failed to load all recipes", allRecipesRes.error);
    }

    return {
      recipe: recipeRes.data,
      allRecipes: allRecipesRes.data || [],
    };
  } catch (error) {
    console.error("Recipe detail loader error:", error);
    if (error instanceof Response) throw error;
    throw new Response("Recipe not found", { status: 404 });
  }
};

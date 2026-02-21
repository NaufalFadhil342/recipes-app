import { redirect } from "react-router";
import { requireAuth, supabase } from "../utils/supabase";

export const globalLoader = async () => {
  try {
    const [storageFiles, recipesRes] = await Promise.all([
      supabase.storage.from("assets").list(""),
      supabase
        .from("recipes")
        .select(
          `
                *,
                users (
                  author,
                  avatar_url,
                  profession
                ),
                countries (
                  region
                )`,
        )
        .eq("is_draft", false)
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
    const session = await requireAuth();

    if (!session) {
      return redirect("/auth");
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
            `,
      )
      .eq("user_id", session.user.id)
      .order("saved_at", { ascending: false });

    if (error) {
      console.error("Saved recipes error:", error);

      if (error.code === "PGRST301" || error.message?.includes("JWT")) {
        await supabase.auth.signOut();
        return redirect("/auth");
      }

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
    const { data, error } = await supabase
      .from("recipes")
      .select(`*, users (author, avatar_url, profession)`)
      .eq("slug", slug)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        throw new Response("Recipe not found", { status: 404 });
      }

      throw new Response("Failed to load recipe details", { status: 500 });
    }

    return {
      recipe: data,
    };
  } catch (error) {
    if (error instanceof Response) throw error;
    throw new Response("Internal server error", { status: 500 });
  }
};

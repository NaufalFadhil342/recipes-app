import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "../api/supabase";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import { useRevalidator } from "react-router";

const RecipesCtx = createContext();

const RecipesProvider = (props) => {
  const [bookmarkIsOpen, setBookmarkIsOpen] = useState(false);
  const [savedRecipesCache, setSavedRecipesCache] = useState(new Set());
  const [savedRecipesPreview, setSavedRecipesPreview] = useState([]);
  const [savedCount, setSavedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const revalidator = useRevalidator();

  const hasReloadPreview = useRef(false);

  useEffect(() => {
    if (user && isAuthenticated) {
      loadSavedRecipesCache();
    } else {
      setSavedRecipesCache(new Set());
      setSavedRecipesPreview([]);
      setSavedCount(0);
    }
  }, [user?.id, isAuthenticated]);

  useEffect(() => {
    if (bookmarkIsOpen && user && !hasReloadPreview.current) {
      loadSavedRecipesPreview();
      hasReloadPreview.current = true;
    }

    if (!bookmarkIsOpen) {
      hasReloadPreview.current = false;
    }
  }, [bookmarkIsOpen, user?.id]);

  useEffect(() => {
    if (
      revalidator.state === "idle" &&
      user &&
      revalidator.state === "loading"
    ) {
      loadSavedRecipesCache();

      if (bookmarkIsOpen) {
        loadSavedRecipesPreview();
      }
    }
  }, [revalidator.state, user?.id]);

  const loadSavedRecipesCache = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error, count } = await supabase
        .from("saved_recipes")
        .select("recipe_id", { count: "exact", head: false })
        .eq("user_id", user.id);

      if (error) throw error;

      const ids = new Set(data?.map((item) => item.recipe_id) || []);
      setSavedRecipesCache(ids);
      setSavedCount(count || 0);
    } catch (error) {
      console.error("Error loading saved recipes cache:", error);
    }
  }, [user?.id]);

  const loadSavedRecipesPreview = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("saved_recipes")
        .select(`*, recipes (*, users (author))`)
        .eq("user_id", user.id)
        .order("saved_at", { ascending: false })
        .limit(3);

      if (error) throw error;

      setSavedRecipesPreview(data || []);
    } catch (error) {
      console.error("Error loading saved recipes preview:", error);
      setSavedRecipesPreview([]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const handleSaveItem = async (recipeId, recipeTitle = "Recipe") => {
    if (!user || !isAuthenticated) {
      toast.error("Please sign in to save recipes");
      return;
    }

    const isSaved = savedRecipesCache.has(recipeId);

    try {
      if (isSaved) {
        setSavedRecipesCache((prev) => {
          const newSet = new Set(prev);
          newSet.delete(recipeId);
          return newSet;
        });
        setSavedCount((prev) => Math.max(0, prev - 1));

        const { error } = await supabase
          .from("saved_recipes")
          .delete()
          .eq("user_id", user.id)
          .eq("recipe_id", recipeId);

        if (error) throw error;
        toast.success(`${recipeTitle} unsaved`);
      } else {
        setSavedRecipesCache((prev) => new Set([recipeId, ...prev]));
        setSavedCount((prev) => prev + 1);
        const { error } = await supabase.from("saved_recipes").insert({
          user_id: user.id,
          recipe_id: recipeId,
        });

        if (error) throw error;
        toast.success(`${recipeTitle} saved`);
      }
      revalidator.revalidate();
      if (bookmarkIsOpen) {
        loadSavedRecipesPreview();
      }
    } catch (error) {
      console.error("Error saving item:", error);
      toast.error(`Failed to ${isSaved ? "unsave" : "save"} ${recipeTitle}`);

      if (isSaved) {
        setSavedRecipesCache((prev) => new Set([recipeId, ...prev]));
        setSavedCount((prev) => prev + 1);
      } else {
        setSavedRecipesCache((prev) => {
          const newSet = new Set(prev);
          newSet.delete(recipeId);
          return newSet;
        });
        setSavedCount((prev) => Math.max(0, prev - 1));
      }
    }
  };

  const isRecipeSaved = (recipeId) => {
    return savedRecipesCache.has(recipeId);
  };

  const value = {
    handleSaveItem,
    isRecipeSaved,
    bookmarkIsOpen,
    setBookmarkIsOpen,
    savedRecipesPreview,
    savedCount,
    loading,
    user,
    refreshSavedRecipes: loadSavedRecipesCache,
  };

  return (
    <RecipesCtx.Provider value={value}>{props.children}</RecipesCtx.Provider>
  );
};

export { RecipesCtx, RecipesProvider };

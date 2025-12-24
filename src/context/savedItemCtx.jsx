import {
  createContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { useRecipes } from "../hooks/useRecipes";
import { supabase } from "../api/supabase";
import { toast } from "react-hot-toast";

const SavedItemCtx = createContext();

const SavedItemProvider = (props) => {
  const { data } = useRecipes();
  const [savedItems, setSavedItems] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [bookmarkIsOpen, setBookmarkIsOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: userData } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .single();

        const currentUser = userData || user;
        setCurrentUser(userData || user);

        const { data: saved } = await supabase
          .from("saved_recipes")
          .select("recipe_id, saved_at")
          .eq("user_id", currentUser.id);

        const items = {};
        saved?.forEach((item) => {
          items[item.recipe_id] = new Date(item.saved_at).getTime();
        });

        setSavedItems(items);
      }
    };

    getUser();
  }, []);

  const handleSaveItem = async (itemId) => {
    if (!currentUser) {
      console.error("Please sign in to save recipes.");
      return;
    }

    const recipe = data.recipes.find((r) => r.id === itemId);
    const recipeTitle = recipe?.title || "Recipe";
    const isSaved = savedItems[itemId];

    if (isSaved) {
      setSavedItems((prev) => {
        const { [itemId]: removed, ...rest } = prev;
        return rest;
      });
    } else {
      setSavedItems((prev) => ({
        ...prev,
        [itemId]: Date.now(),
      }));
    }

    try {
      if (isSaved) {
        setSavedItems((prev) => {
          const { [itemId]: removed, ...rest } = prev;
          return rest;
        });

        const { error } = await supabase
          .from("saved_recipes")
          .delete()
          .eq("user_id", currentUser.id)
          .eq("recipe_id", itemId);

        if (error) throw error;

        toast.success(`${recipeTitle} is unsaved`);
      } else {
        setSavedItems((prev) => ({
          ...prev,
          [itemId]: Date.now(),
        }));

        const { error } = await supabase.from("saved_recipes").insert({
          user_id: currentUser.id,
          recipe_id: itemId,
        });

        if (error) throw error;

        toast.success(`${recipeTitle} is saved`);
      }
    } catch (error) {
      console.error("Error saving item:", error);
      toast.error(`Failed to save ${recipeTitle}. Please try again.`);
      if (isSaved) {
        setSavedItems((prev) => ({
          ...prev,
          [itemId]: Date.now(),
        }));
      } else {
        setSavedItems((prev) => {
          const { [itemId]: removed, ...rest } = prev;
          return rest;
        });
      }
    }
  };

  const savedRecipes = useMemo(() => {
    return data.recipes
      .filter((recipe) => savedItems[recipe.id])
      .sort((a, b) => savedItems[b.id] - savedItems[a.id]);
  }, [data.recipes, savedItems]);

  const value = {
    savedItems,
    handleSaveItem,
    bookmarkIsOpen,
    setBookmarkIsOpen,
    savedRecipes,
    currentUser,
  };

  return (
    <SavedItemCtx.Provider value={value}>
      {props.children}
    </SavedItemCtx.Provider>
  );
};

export { SavedItemCtx, SavedItemProvider };

import { Icon } from "@iconify/react";
import { Icons } from "../../../icons";
import { recipeIcons } from "../../../data/recipeIconsData";

const RecipeBtn = () => {
  return (
    <>
      <button
        type="button"
        className="w-auto h-auto flex items-center gap-2 hover:cursor-pointer"
      >
        <Icons
          iconsName={recipeIcons.moonEyeLight}
          className="size-5 text-stone-600"
        />
        <p>Preview</p>
      </button>
      <button
        type="submit"
        className="w-auto h-12 flex items-center gap-2 px-4 rounded-md bg-primary hover:bg-dark hover:cursor-pointer transition-all duration-150 ease-in-out"
      >
        <Icons
          iconsName={recipeIcons.lucideSave}
          className="size-5 text-stone-600"
        />
        <p>Publish</p>
      </button>
    </>
  );
};

export default RecipeBtn;

import React from "react";
import { Icon } from "@iconify/react";

const RecipeBtn = () => {
  return (
    <>
      <button
        type="button"
        className="w-auto h-auto flex items-center gap-2 hover:cursor-pointer"
      >
        <Icon icon="iconamoon:eye-light" className="size-5 text-stone-600" />
        <p>Preview</p>
      </button>
      <button
        type="submit"
        className="w-auto h-12 flex items-center gap-2 px-4 rounded-md bg-primary hover:bg-dark hover:cursor-pointer transition-all duration-150 ease-in-out"
      >
        <Icon icon="lucide:save" className="size-5 text-stone-600" />
        <p>Publish</p>
      </button>
    </>
  );
};

export default RecipeBtn;

import React from "react";
import DOMPurify from "dompurify";
import { Icons } from "../../../icons";
import { recipeIcons } from "../../../data/recipeIconsData";

const RecipeContent = ({ recipe }) => {
  const introduction = DOMPurify.sanitize(recipe.introduction);
  const additionalInfo = DOMPurify.sanitize(recipe.additional_info);

  return (
    <article className="w-full h-auto flex flex-col gap-6">
      <div className="w-full h-auto">
        <p
          className="text-stone-600"
          dangerouslySetInnerHTML={{ __html: introduction }}
        />
      </div>
      <div className="w-full h-auto">
        <div className="flex items-center gap-3 -ml-2">
          <Icons
            iconsName={recipeIcons.healthVege}
            className="size-10 text-primary"
          />
          <h3 className="text-2xl font-medium text-inherit">Ingredients</h3>
        </div>
        <ul className="list-disc list-inside mt-4 space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="text-stone-600">
              {ingredient}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full h-auto">
        <div className="flex items-center gap-3 -ml-2">
          <Icons
            iconsName={recipeIcons.ipsCook}
            className="size-10 text-primary"
          />
          <h3 className="text-2xl font-medium text-inherit">Instructions</h3>
        </div>
        <ul className="list-decimal list-inside mt-4 space-y-2">
          {recipe.instructions.map((instruction, index) => (
            <li key={index} className="text-stone-600">
              {instruction}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p
          className="text-stone-600"
          dangerouslySetInnerHTML={{ __html: additionalInfo }}
        />
      </div>
    </article>
  );
};

export default RecipeContent;

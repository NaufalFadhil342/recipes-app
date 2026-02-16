import { Icons } from "../../../icons";
import { recipeIcons } from "../../../data/recipeIconsData";
import { useEffect, useRef, useState } from "react";

const RecipeBtn = ({ options, handleSubmit, isSubmitting, currentAction }) => {
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const publishBtnRef = useRef();

  useEffect(() => {
    const outsideClick = (e) => {
      if (publishBtnRef.current && !publishBtnRef.current.contains(e.target)) {
        setShowActionsMenu(false);
      }
    };

    document.addEventListener("mousedown", outsideClick);
    return () => document.removeEventListener("mousedown", outsideClick);
  }, []);

  const handleClickOption = async (option, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isSubmitting) return;

    const isDraft = option.action === "draft";

    await handleSubmit(isDraft);
    setShowActionsMenu(false);
  };

  return (
    <div className="w-fit h-auto relative flex justify-end" ref={publishBtnRef}>
      <button
        type="button"
        className="w-auto h-auto flex justify-between bg-primary rounded-md border-none hover:cursor-pointer"
        onClick={() => setShowActionsMenu(!showActionsMenu)}
      >
        <div className="w-auto h-10 flex items-center gap-2 px-3">
          <Icons
            iconsName={recipeIcons.lucideSave}
            className="size-5 text-stone-600"
          />
          <p className="text-inherit">Submit</p>
        </div>
        <div className="w-8 h-auto flex items-center justify-center">
          <Icons
            iconsName={recipeIcons.tablerChevDown}
            className={`text-stone-600 size-5 ${showActionsMenu ? "rotate-180" : "rotate-0"} transition-all duration-150`}
          />
        </div>
      </button>
      {showActionsMenu && (
        <ul className="w-auto h-auto absolute z-10 top-full sm:right-0 bg-white rounded-md overflow-hidden shadow-md mt-2">
          {options.map((option) => (
            <li
              key={option.action}
              className="w-full h-auto flex items-center justify-center bg-transparent hover:bg-primary/15"
            >
              <button
                type="button"
                className={`w-full h-auto flex items-center justify-center px-4 py-2 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"}`}
                aria-label={option.label}
                onClick={(e) => handleClickOption(option, e)}
                disabled={isSubmitting}
              >
                {isSubmitting && currentAction === option.action
                  ? `${option.action === "draft" ? "Saving" : "Publishing"}...`
                  : option.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeBtn;

import { Icons } from "../../../icons";
import { recipeIcons } from "../../../data/recipeIconsData";
import { useEffect, useRef, useState } from "react";

const RecipeBtn = ({ publishOptions, handleSave, handlePublish }) => {
  const [showPublishMenu, setShowPublishMenu] = useState(false);
  const publishBtnRef = useRef();

  useEffect(() => {
    const outsideClick = (e) => {
      if (publishBtnRef.current && !publishBtnRef.current.contains(e.target)) {
        setShowPublishMenu(false);
      }
    };

    document.addEventListener("mousedown", outsideClick);
    return () => document.removeEventListener("mousedown", outsideClick);
  }, []);

  const handleOptionClick = (option, e) => {
    if (option.action === "draft") {
      handleSave(e);
    } else if (option.action === "publish") {
      handlePublish(e);
    }

    setShowPublishMenu(false);
  };

  return (
    <div className="w-full h-auto flex items-center gap-4">
      <button
        type="button"
        className="w-auto h-auto flex items-center gap-2 hover:cursor-pointer transition-all"
      >
        <Icons
          iconsName={recipeIcons.moonEyeLight}
          className="size-5 text-stone-600"
        />
        <p>Preview</p>
      </button>
      <div className="w-auto h-auto relative" ref={publishBtnRef}>
        <button
          type="button"
          className="w-auto h-auto flex justify-between bg-primary rounded-md border-none hover:cursor-pointer"
          onClick={() => setShowPublishMenu(!showPublishMenu)}
        >
          <div className="w-auto h-10 flex items-center gap-2 px-3">
            <Icons
              iconsName={recipeIcons.lucideSave}
              className="size-5 text-stone-600"
            />
            <p className="text-inherit">Publish</p>
          </div>
          <div className="w-8 h-auto flex items-center justify-center">
            <Icons
              iconsName={recipeIcons.tablerChevDown}
              className={`text-stone-600 size-5 ${showPublishMenu ? "rotate-180" : "rotate-0"} transition-all duration-150`}
            />
          </div>
        </button>
        {showPublishMenu && (
          <ul className="w-full h-auto absolute z-10 top-full right-0 bg-white rounded-md overflow-hidden shadow-md mt-2">
            {publishOptions.map((option) => (
              <li
                key={option.action}
                className="w-full h-10 flex items-center justify-center bg-transparent hover:bg-primary/15"
              >
                <button
                  type="submit"
                  className="w-full h-auto flex items-center px-3 hover:cursor-pointer"
                  aria-label={option.label}
                  onClick={(e) => handleOptionClick(option, e)}
                >
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RecipeBtn;

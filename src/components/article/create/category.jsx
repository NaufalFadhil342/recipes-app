import { Icon } from "@iconify/react";

const Category = ({
  categoryRef,
  isCategoryOpen,
  createArticle,
  categorySelection,
  setIsCategoryOpen,
  getSelectedCategoryName,
  handleCategorySelect,
}) => {
  return (
    <>
      <label className="font-medium">Category</label>
      <div className="w-full h-auto relative mt-2" ref={categoryRef}>
        <button
          type="button"
          className={`w-full py-3 border-b-2 text-left flex items-center justify-between transition-all hover:cursor-pointer ${
            isCategoryOpen
              ? "border-primary"
              : "border-stone-600/15 hover:border-primary"
          } ${!createArticle.category ? "text-stone-300" : "text-stone-600"}`}
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          <span className="font-medium">
            {getSelectedCategoryName(categorySelection)}
          </span>
          <Icon
            icon="tabler:chevron-down"
            className={`size-5 text-stone-600 transition-transform duration-150 ease-in-out ${
              isCategoryOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isCategoryOpen && (
          <ul className="w-full h-auto absolute right-0 top-full mt-2 bg-white shadow-md rounded-md overflow-x-hidden">
            {categorySelection.map((category) => (
              <li key={category.id} className="w-full h-auto">
                <button
                  type="button"
                  className={`w-full px-4 py-3 text-left hover:bg-primary/15 text-inherit font-medium transition-colors flex items-center justify-between
                          ${
                            createArticle.category === category.value
                              ? "bg-primary/15"
                              : "bg-transparent"
                          }
                        `}
                  onClick={() => handleCategorySelect(category.value)}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Category;

import Category from "./create/category";
import Country from "./create/country";

const ArticleDetail = ({
  categoryRef,
  createArticle,
  getSelectedCategoryName,
  getSelectedCountryName,
  countryRef,
  handleCategorySelect,
  handleCountrySelect,
  isCategoryOpen,
  isCountryOpen,
  setIsCategoryOpen,
  setIsCountryOpen,
  onCreateChange,
  inputTag,
  setInputTag,
  canEnterTag,
  handleAddTag,
  handleRemoveTag,
}) => {
  return (
    <div className="w-full h-auto bg-white p-6 px-8 rounded-xl lg:max-h-[90vh] lg:overflow-y-auto lg:scrollbar-thin">
      <h2 className="text-xl font-semibold">Article Details</h2>
      <div className="mt-6 flex flex-col w-full h-auto gap-6">
        <div className="w-full h-auto">
          <Category
            categoryRef={categoryRef}
            createArticle={createArticle}
            getSelectedCategoryName={getSelectedCategoryName}
            handleCategorySelect={handleCategorySelect}
            isCategoryOpen={isCategoryOpen}
            setIsCategoryOpen={setIsCategoryOpen}
          />
        </div>
        <div className="w-full h-auto">
          <Country
            countryRef={countryRef}
            createArticle={createArticle}
            getSelectedCountryName={getSelectedCountryName}
            setIsCountryOpen={setIsCountryOpen}
            handleCountrySelect={handleCountrySelect}
            isCountryOpen={isCountryOpen}
          />
        </div>
        <div className="w-full h-auto">
          <label className="font-medium">Slug</label>
          <input
            type="text"
            placeholder="Enter-recipe-slug"
            className="border-b-2 border-stone-600/15 w-full py-3 mt-2 placeholder:text-stone-300 outline-none hover:border-primary focus:border-primary"
            name="slug"
            value={createArticle.slug}
            onChange={onCreateChange}
          />
        </div>
        <div className="w-full h-auto">
          <label className="font-medium">Tags</label>
          <div className="w-full flex items-end justify-between gap-4 mt-2">
            <input
              type="text"
              placeholder="pasta, barbeque, rendang"
              className="w-full py-3 border-b-2 border-stone-600/15 outline-none hover:border-primary focus:border-primary"
              value={inputTag}
              onChange={(e) => setInputTag(e.target.value)}
              onKeyDown={canEnterTag}
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="w-auto h-10 px-4 rounded-md bg-stone-300 hover:bg-[#c2bebb] transition-all duration-150"
            >
              Generate
            </button>
          </div>
          <div className="w-full h-auto flex gap-2 mt-4 flex-wrap">
            {createArticle.tags.length > 0 &&
              createArticle.tags.map((tag, index) => (
                <div
                  key={index}
                  className="w-auto h-6 rounded-full px-3 py-4 bg-primary/20 flex items-center gap-2"
                >
                  <span className="text-sm capitalize">{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    className="text-xs hover:text-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;

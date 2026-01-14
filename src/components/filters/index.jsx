import Category from "./filter/category";
import Countries from "./filter/countries";
import SortingBy from "./filter/sortingBy";

const Filters = ({
  tempFilters,
  setTempFilters,
  handleApply,
  handleClear,
  recipes,
}) => {
  return (
    <section
      className="min-w-[85%] h-auto bg-white rounded-xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="py-2.5 px-4">
        <h4 className="text-lg font-semibold">Filters</h4>
      </div>
      <div className="w-full h-[55vh] flex flex-col gap-6 mt-6 overflow-auto scrollbar-none">
        <SortingBy
          sortBy={tempFilters.sortBy}
          setSortBy={(value) =>
            setTempFilters((prev) => ({ ...prev, sortBy: value }))
          }
        />
        <Category
          tempFilters={tempFilters}
          setTempFilters={setTempFilters}
          recipes={recipes}
        />
        <Countries tempFilters={tempFilters} setTempFilters={setTempFilters} />
      </div>
      <div className="w-full h-auto py-4 px-4 flex flex-col-reverse xs:flex-row items-center gap-4">
        <button
          type="button"
          className="w-full h-10 rounded-md border border-stone-500/50 hover:cursor-pointer"
          onClick={handleClear}
        >
          Clear
        </button>
        <button
          type="button"
          className="w-full h-10 rounded-md bg-primary font-medium hover:cursor-pointer hover:bg-dark transition-colors duration-150 ease-in-out"
          onClick={handleApply}
        >
          Apply
        </button>
      </div>
    </section>
  );
};

export default Filters;

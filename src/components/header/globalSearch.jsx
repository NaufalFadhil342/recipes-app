import Search from "../../UI/search";
import { useSearch } from "../../hooks/useSearch";

const GlobalSearch = () => {
  const {
    searchQuery,
    handleSearchChange,
    handleSearchKeydown,
    handleSearchSubmit,
  } = useSearch({
    path: "/recipes",
    preserveOtherParams: true,
    redirectOnSearch: true,
  });

  return (
    <div className="w-full h-14 xs:h-auto bg-white rounded-full flex items-center shadow-[0_2px_5px_rgba(41,37,36,0.1)] xs:shadow-none">
      <Search
        placeholder="Find a recipe"
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleSearchKeydown}
        onSubmit={handleSearchSubmit}
      />
    </div>
  );
};

export default GlobalSearch;

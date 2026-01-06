import Search from "../../UI/search";

const GlobalSearch = () => {
  return (
    <div className="w-full h-14 xs:h-auto bg-white rounded-full flex items-center shadow-[0_2px_5px_rgba(41,37,36,0.1)] xs:shadow-none">
      <Search placeholder="Find a recipe" />
    </div>
  );
};

export default GlobalSearch;

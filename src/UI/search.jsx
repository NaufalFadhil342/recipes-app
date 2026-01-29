import { Icons } from "../icons";
import { recipeIcons } from "../data/recipeIconsData";

const Search = (props) => {
  return (
    <>
      <input
        type="text"
        className="border-none w-full h-12 pl-4 outline-none text-stone-800"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
      />
      <button type="submit" title="search recipes" onClick={props.onSubmit}>
        <Icons
          iconsName={recipeIcons.bitcoinSearch}
          className="size-8 mr-2 hover:cursor-pointer"
        />
      </button>
    </>
  );
};

export default Search;

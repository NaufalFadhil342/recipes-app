import { Link } from "react-router";
import { Icons } from "../icons";
import { recipeIcons } from "../data/recipeIconsData";

const Edit = ({ editPath }) => {
  return (
    <Link
      to={`/profile/${editPath}`}
      className="group rounded-full bg-transparent w-auto h-8 text-sm text-stone-500 border border-stone-300 flex items-center gap-2 px-2 hover:bg-primary hover:border-primary hover:text-inherit transition-all duration-150 ease-in-out"
    >
      <p className="hidden md:block">Edit</p>
      <Icons
        iconsName={recipeIcons.riEdit}
        className="size-5 text-stone-500 group-hover:text-inherit transition-all duration-150 ease-in-out"
      />
    </Link>
  );
};

export default Edit;

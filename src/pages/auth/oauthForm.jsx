import { Icons } from "../../icons";
import { recipeIcons } from "../../data/recipeIconsData";

const OAuthForm = ({ handleSignInWithOAuth, loadingType }) => {
  const oAuthHandling = (e) => {
    e.preventDefault();
    handleSignInWithOAuth(e);
  };

  return (
    <div className="w-full h-auto">
      <button
        type="button"
        className="w-full h-12 bg-stone-200 text-inherit font-medium flex items-center justify-center gap-2 rounded-md hover:bg-stone-300 hover:cursor-pointer duration-150 transition-colors ease-in-out"
        onClick={oAuthHandling}
        disabled={loadingType !== null}
      >
        <Icons iconsName={recipeIcons.miGoogle} className="size-6" />
        {loadingType ? "Loading..." : "Google"}
      </button>
    </div>
  );
};

export default OAuthForm;

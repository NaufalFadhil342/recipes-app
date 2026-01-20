import { Icon } from "@iconify/react";

const OAuthForm = ({ handleSignInWithOAuth }) => {
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
      >
        <Icon icon="material-icon-theme:google" className="size-6" />
        <>Google</>
      </button>
    </div>
  );
};

export default OAuthForm;

import { Icon } from "@iconify/react";
import { supabase } from "../../api/supabase";

const OAuthForm = () => {
  const oAuthHandling = (e) => {
    e.preventDefault();

    const { data, error } = supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error(error.message);
      return;
    }

    console.log("successful sign in", data);
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

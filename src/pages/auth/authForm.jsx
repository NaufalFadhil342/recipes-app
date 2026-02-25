import { Link } from "react-router";
import OAuthForm from "./oauthForm";
import { useAuth } from "../../hooks/useAuth";

const AuthForm = () => {
  const {
    error,
    userAuth,
    handleAuthSubmit,
    handleAuthChange,
    handleSignInWithOAuth,
    authMode,
    loadingType,
  } = useAuth();

  return (
    <div className="w-full h-auto">
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form
        className="w-full h-auto flex flex-col gap-6"
        onSubmit={handleAuthSubmit}
      >
        <input
          type="email"
          placeholder="Your email"
          className="w-full h-12 rounded-md border border-stone-600 px-3 focus:outline-primary text-stone-600"
          name="email"
          value={userAuth.email}
          onChange={handleAuthChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full h-12 rounded-md border border-stone-600 px-3 focus:outline-primary text-stone-600"
          name="password"
          value={userAuth.password}
          onChange={handleAuthChange}
        />
        {authMode === "signup" && (
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full h-12 rounded-md border border-stone-600 px-3 focus:outline-primary text-stone-600"
            name="confirmPassword"
            value={userAuth.confirmPassword}
            onChange={handleAuthChange}
          />
        )}
        <div className="w-full h-auto flex items-center justify-between gap-2">
          {authMode === "signup" ? (
            <div className="flex items-center gap-1">
              <input type="checkbox" id="check" />
              <label htmlFor="check" className="text-sm text-stone-600">
                Remember me
              </label>
            </div>
          ) : (
            <Link className="text-blue-500 text-sm">Forgot password?</Link>
          )}
        </div>
        <button
          type="submit"
          className="w-auto h-12 px-4 font-medium text-inherit bg-primary rounded-md hover:cursor-pointer hover:bg-dark duration-150 transition-colors ease-in-out"
          disabled={loadingType !== null}
        >
          {loadingType
            ? "loading..."
            : authMode === "signin"
              ? "Sign In"
              : "Sign Up"}
        </button>
      </form>
      <div className="w-full h-auto flex items-center justify-between gap-2 my-4">
        <div className="w-full h-px bg-stone-600/20" />
        <p className="text-stone-600 text-sm">Or</p>
        <div className="w-full h-px bg-stone-600/20" />
      </div>
      <OAuthForm
        handleSignInWithOAuth={handleSignInWithOAuth}
        loadingType={loadingType}
      />
    </div>
  );
};

export default AuthForm;

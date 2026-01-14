import Auth from "../auth";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router";
import Users from "../users";

const Info = () => {
  const { isAuthenticated, handleAuthOpen, handleSignOut, user } = useAuth();

  return (
    <section className="w-full h-auto px-12 md:px-20 py-5 flex items-center justify-end sm:justify-between gap-6 relative">
      <ul className="w-auto h-auto hidden sm:flex gap-4">
        <li>
          <Link className="text-stone-600 hover:text-primary font-medium">
            client@example.com
          </Link>
        </li>
        <div className="w-px h-auto bg-stone-600" />
        <li>
          <Link className="text-stone-600 hover:text-primary font-medium">
            (+62) 812 3456 7891
          </Link>
        </li>
      </ul>
      <div>
        {isAuthenticated ? (
          <>
            <Users handleSignOut={handleSignOut} user={user} />
          </>
        ) : (
          <button
            type="button"
            className="w-auto h-10 flex items-center px-4 bg-primary text-inherit font-medium rounded-md hover:bg-dark hover:cursor-pointer duration-150 transition-colors ease-in-out"
            onClick={() => handleAuthOpen("signin")}
          >
            Get Started
          </button>
        )}
      </div>
      <Auth />
    </section>
  );
};

export default Info;

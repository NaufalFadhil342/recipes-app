import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router";
import { AnimatePresence, motion } from "motion/react";

const Users = ({ handleSignOut, user }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const username = user?.user_metadata?.display_name;
  const email = user?.email.split("@")[0];
  const avatar = user?.user_metadata?.picture;
  const dropdownRef = useRef();

  const usersProfile = [
    {
      name: "Your Profile",
      label: "Profile setting",
      path: "/profile",
    },
    {
      name: "Create Recipe",
      label: "Create your recipe",
      path: "/create",
    },
    {
      name: "My Recipes",
      label: "See your recipe",
      path: `/my-recipes/draft`,
    },
    {
      name: "Saved",
      label: "Recipes saved",
      path: "/saved",
    },
  ];

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [setShowUserMenu]);

  return (
    <section className="w-auto h-auto relative" ref={dropdownRef}>
      <button
        type="button"
        className="size-10 rounded-full overflow-hidden hover:cursor-pointer"
        onClick={() => setShowUserMenu((prev) => !prev)}
        aria-label="user profile"
      >
        {avatar ? (
          <img
            className="w-full h-full object-cover object-center"
            loading="lazy"
            src={avatar}
            alt={username}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="bg-linear-to-br from-primary to-yellow-500" />
        )}
      </button>
      <div className="min-w-max h-auto absolute top-full right-0 z-10 translate-y-8 overflow-y-hidden">
        <AnimatePresence>
          {showUserMenu && (
            <motion.div
              className="w-full h-auto bg-white rounded-xl shadow-[3px_3px_7px_rgba(41,37,36,0.1)] py-4 px-6"
              initial={{ opacity: 0, y: -200 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -200 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="w-full h-auto">
                <p className="text-inherit font-medium capitalize">
                  Hi, {username || email}
                </p>
              </div>
              <ul className="my-2 w-full h-auto border-y border-stone-300">
                {usersProfile.map((user, index) => {
                  return (
                    <li key={index} className="w-auto h-auto my-2">
                      <NavLink
                        to={user.path}
                        className={({ isActive }) =>
                          isActive
                            ? "text-primary"
                            : "text-stone-600 hover:text-primary ease-in-out duration-150 transition-all"
                        }
                        onClick={() => setShowUserMenu(false)}
                        aria-label={user.label}
                      >
                        {user.name}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
              <div className="w-full h-auto">
                <button
                  type="button"
                  className="text-red-600 font-medium hover:text-inherit hover:cursor-pointer transition-colors duration-150 ease-in-out"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Users;

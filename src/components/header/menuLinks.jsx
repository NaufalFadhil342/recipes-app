import { Icons } from "../../icons";
import { NavLink } from "react-router";

const MenuLinks = ({ display, navbar, setShowSidebarMenu }) => {
  return (
    <ul
      className={`w-full h-auto ${display} md:items-center gap-6 my-10 px-10 md:px-0 md:my-0`}
    >
      {navbar.map((nav, index) => (
        <li key={index}>
          <NavLink
            to={nav.path}
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-primary md:text-white"
                  : "hover:text-primary md:hover:text-white"
              } group font-medium transition-colors duration-150 ease-in-out`
            }
            onClick={() => setShowSidebarMenu(false)}
          >
            {({ isActive }) => (
              <span className="block">
                <div className="flex items-center gap-3">
                  <span className="block md:hidden">
                    <Icons
                      iconsName={nav.icon}
                      className="size-6 text-inherit"
                    />
                  </span>
                  <p className="text-inherit">{nav.name}</p>
                </div>
                <div
                  className={`w-0 h-0.5 group-hover:w-1/2 hidden md:flex bg-primary md:bg-white ${
                    isActive ? "w-1/2" : "w-0 group-hover:w-1/2"
                  } transition-all duration-150 ease-in-out`}
                />
              </span>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MenuLinks;

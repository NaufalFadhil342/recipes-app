import { NavLink, Outlet } from "react-router";

const recipesStatus = [
  { name: "draft", status: "draft", path: "/my-recipes/draft" },
  { name: "publish", status: "publish", path: "/my-recipes/publish" },
];

const MyRecipes = () => {
  return (
    <section className="w-full h-auto my-28 px-12 md:px-20">
      <div>
        <h1 className="text-[2.5em] font-bold text-center text-inherit">
          My Recipes
        </h1>
        <div className="w-14 h-0.5 bg-primary mx-auto mt-4" />
      </div>
      <div className="mt-10 flex justify-center items-center">
        {recipesStatus.map((recipe, index) => {
          return (
            <div key={index} className="w-auto h-auto">
              <NavLink
                to={recipe.path}
                className={({ isActive }) =>
                  `w-full h-auto flex items-center capitalize px-4 py-2 ${isActive ? "bg-primary/35 border-b-2 border-primary rounded-t" : "bg-transparent border-b-2 border-stone-400"}`
                }
              >
                {recipe.name}
              </NavLink>
            </div>
          );
        })}
      </div>

      <Outlet />
    </section>
  );
};

export default MyRecipes;

import { Outlet } from "react-router";

const Recipes = () => {
  return (
    <section className="w-full h-auto">
      <div></div>
      <Outlet />
    </section>
  );
};

export default Recipes;

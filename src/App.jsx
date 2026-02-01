import Categories from "./components/categories";
import Cooking from "./layout/cooking";
import Hero from "./layout/hero";
import About from "./layout/about";
import Service from "./layout/service";
import Galleries from "./layout/galleries";
import { Toaster } from "react-hot-toast";
import { useRouteLoaderData } from "react-router";

function App() {
  const { recipes, images } = useRouteLoaderData("root");

  return (
    <div className="w-full h-auto">
      <Toaster position="top-right" />
      <Hero heroes={recipes} />
      <Categories images={images} />
      <Cooking recipes={recipes} />
      <About />
      <Service />
      <Galleries galleries={images} />
    </div>
  );
}

export default App;

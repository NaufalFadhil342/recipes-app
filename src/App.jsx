import Categories from "./components/categories";
import Cooking from "./layout/cooking";
import Hero from "./layout/hero";
import Loading from "./UI/loading";
import About from "./layout/about";
import Service from "./layout/service";
import Gallery from "./layout/gallery";
import { useRecipes } from "./hooks/useRecipes";
import { Toaster } from "react-hot-toast";

function App() {
  const { data, isLoading } = useRecipes();

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full h-auto">
      <Toaster position="top-right" />
      <Hero heroes={data.recipes} />
      <Categories images={data.images} />
      <Cooking recipes={data.recipes} />
      <About />
      <Service />
      <Gallery galleries={data.images} />
    </div>
  );
}

export default App;

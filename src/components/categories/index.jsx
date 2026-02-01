import { useMemo } from "react";
import { getRegionData } from "../../data/regionFilter";
import ImgCategory from "./imgCategory";
import { useCategory } from "../../hooks/useCategory";

const Categories = ({ images }) => {
  const regionData = useMemo(() => getRegionData(images), [images]);
  const { selectRegion, handleRegionActive } = useCategory();

  const imgsPosition = {
    Rendang: "top-6 z-5",
    Barbeque: "top-0 -left-2",
    Pasta: "top-0 -right-2",
  };

  return (
    <section className="w-full h-auto px-12 md:px-20 mb-28 overflow-x-hidden">
      <ul className="w-full h-auto flex justify-between gap-8 overflow-x-scroll scrollbar-none">
        {regionData.map((item) => {
          return (
            <li
              key={item.id}
              className={`flex-[0_0_68%] xs:flex-[0_0_46.5%] sm:flex-[0_0_40%] md:flex-[0_0_32%] lg:flex-[0_0_22%] w-full h-auto p-6 rounded-xl border ${
                selectRegion === item.region
                  ? "border-primary bg-white"
                  : "border-stone-600/20 bg-transparent"
              } flex flex-col items-center justify-between gap-4`}
              onClick={() => handleRegionActive(item.region)}
            >
              <div className="w-full h-auto flex items-center justify-center">
                {item.images.length > 1 ? (
                  <ul className="w-auto h-auto relative flex items-center justify-center">
                    {item.images.map((img) => {
                      const positionClass = imgsPosition[img.name] || "";

                      return (
                        <ImgCategory
                          img={img}
                          key={img.id}
                          className={`size-15 rounded-full border-[3px] border-stone-400 overflow-hidden flex items-center justify-end ${positionClass} absolute`}
                        />
                      );
                    })}
                  </ul>
                ) : (
                  <ul className="flex justify-center">
                    {item.images.map((img) => (
                      <ImgCategory
                        key={img.id}
                        img={img}
                        className="size-20 rounded-full border-[3px] border-stone-400 overflow-hidden"
                      />
                    ))}
                  </ul>
                )}
              </div>
              <p className="text-lg font-medium">{item.name}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Categories;

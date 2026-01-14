import { useMemo, useState } from "react";
import { getCategoryData } from "../../data/categoryFilter";
import ImgCategory from "./imgCategory";

const Categories = ({ images }) => {
  const categoryData = useMemo(() => getCategoryData(images), [images]);
  const [selectCategory, setSelectCategory] = useState("");

  const handleCategoryActive = (category) => {
    setSelectCategory(category);
  };

  const imgsPosition = {
    Rendang: "top-6 z-5",
    Rawon: "top-0 -left-2",
    "Nasi Liwet": "top-0 -right-2",
  };

  return (
    <section className="w-full h-auto px-12 md:px-20 mb-28 overflow-x-hidden">
      <ul className="w-full h-auto flex gap-10 overflow-x-scroll scrollbar-none">
        {categoryData.map((item) => {
          return (
            <li
              key={item.id}
              className={`flex-[0_0_65%] sm:flex-[0_0_35%] lg:flex-[0_0_20%] h-auto p-6 rounded-xl border ${
                selectCategory === item.category
                  ? "border-primary bg-white"
                  : "border-stone-600/20 bg-transparent"
              } flex flex-col items-center justify-between gap-4`}
              onClick={() => handleCategoryActive(item.category)}
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

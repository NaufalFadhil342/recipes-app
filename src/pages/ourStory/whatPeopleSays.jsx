import { useCallback, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { dummyTestimonies } from "../../data/testimonyData";
import { recipeIcons } from "../../data/recipeIconsData";
import { Icons } from "../../icons";
import Testimony from "../../components/testimony";

const WhatPeopleSays = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    startIndex: 1,
  });
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const nextSlide = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const prevSlide = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="w-full h-auto">
      <h2 className="text-[2.5em] font-bold text-inherit text-center">
        What Our Users Say
      </h2>
      <div className="w-full h-auto relative">
        <div className="flex gap-4 justify-center items-center mt-8">
          {dummyTestimonies.map((testi, index) => (
            <div
              key={index}
              className={`size-14 rounded-full overflow-hidden transition-all duration-300 ease-in-out ${selectedIndex === index ? "scale-150 mx-4" : "scale-100 grayscale-100"}`}
            >
              <img
                className="w-full h-full object-cover"
                src={testi.avatar}
                alt={testi.name}
              />
            </div>
          ))}
        </div>
        <div
          className="mt-8 overflow-x-hidden w-full md:max-w-xl h-auto mx-auto p-2"
          ref={emblaRef}
        >
          <div className="flex gap-8">
            {dummyTestimonies.map((testi, index) => (
              <Testimony testi={testi} key={index} />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="w-auto h-12 px-2 rounded-md bg-white text-stone-600 flex items-center absolute left-1/2 -translate-x-14 top-full md:left-0 md:translate-x-0 md:top-1/2 md:-translate-y-1/2 disabled:hidden hover:cursor-pointer shadow-[1px_1px_4px_rgba(41,37,36,0.08)]"
          onClick={prevSlide}
          disabled={prevBtnDisabled}
        >
          <Icons iconsName={recipeIcons.moonArrowLeft} className="size-8" />
        </button>
        <button
          type="button"
          className="w-auto h-12 px-2 rounded-md bg-white text-stone-600 flex items-center absolute right-1/2 translate-x-14 top-full md:right-0 md:translate-x-0 md:top-1/2 md:-translate-y-1/2 disabled:hidden hover:cursor-pointer shadow-[1px_1px_4px_rgba(41,37,36,0.08)]"
          onClick={nextSlide}
          disabled={nextBtnDisabled}
        >
          <Icons iconsName={recipeIcons.moonArrowRight} className="size-8" />
        </button>
      </div>
    </section>
  );
};

export default WhatPeopleSays;

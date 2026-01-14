import { useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ClassNames from "embla-carousel-class-names";
import { usePrevNextBtn, PrevButton, NextButton } from "./prevNextButton";
import { Icon } from "@iconify/react";
import Galleries from "./galleries";

const Gallery = ({ galleries }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
    },
    [
      ClassNames({
        snapped: "is-snapped",
        inView: "is-in-view",
      }),
    ]
  );
  const { onNextBtnClick, onPrevBtnClick } = usePrevNextBtn(emblaApi);
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <section className="w-full h-auto my-28 px-12 md:px-20 flex flex-col">
      <div className="w-full h-auto flex flex-col gap-2">
        <span className="italic text-primary font-medium">Gallery</span>
        <h2 className="font-semibold text-4xl uppercase leading-none">
          See Our Feeds
        </h2>
        <p className="text-stone-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          labore sed inventore odio voluptatem soluta amet maiores consequuntur,
          voluptatum sint.
        </p>
      </div>
      <div className="w-full h-auto flex flex-col items-start gap-10 mt-20">
        <div className="w-full h-auto overflow-x-hidden" ref={emblaRef}>
          <Galleries
            galleries={galleries}
            hoverIndex={hoverIndex}
            setHoverIndex={setHoverIndex}
          />
        </div>
        <div className="w-full h-auto flex justify-start gap-2">
          <PrevButton
            className="size-10 rounded-full bg-primary hover:bg-dark hover:cursor-pointer transition-all duration-150 ease-in-out"
            onClick={onPrevBtnClick}
          >
            <Icon
              icon="iconamoon:arrow-left-2-light"
              className="size-10 text-inherit"
            />
          </PrevButton>
          <NextButton
            className="size-10 rounded-full bg-primary hover:bg-dark hover:cursor-pointer transition-all duration-150 ease-in-out"
            onClick={onNextBtnClick}
          >
            <Icon
              icon="iconamoon:arrow-right-2-light"
              className="size-10 text-inherit"
            />
          </NextButton>
        </div>
      </div>
    </section>
  );
};

export default Gallery;

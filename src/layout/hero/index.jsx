import HeroItem from "./hero-item";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const Hero = ({ heroes }) => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [
      Autoplay({
        delay: 4000,
        playOnInit: true,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ],
  );

  const displayByViews = heroes.sort((a, b) => b.views - a.views).slice(0, 3);

  return (
    <section className="w-full h-auto px-10 md:px-20 my-28">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="w-full h-[85vh] flex">
          {displayByViews.map((hero) => {
            return <HeroItem key={hero.id} {...hero} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;

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
    ]
  );

  return (
    <section className="w-full h-auto px-10 md:px-20 my-28">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="w-full h-[85vh] flex">
          {heroes.map((hero) => {
            return <HeroItem key={hero.id} {...hero} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;

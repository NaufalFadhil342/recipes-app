import AuthForm from "./authForm";
import { useAuth } from "../../hooks/useAuth";
import authBG from "../../assets/recipes.webp";
import useEmblaCarousel from "embla-carousel-react";
import { dummyTestimonies } from "../../data/testimonyData";
import Testimony from "../../components/testimony";
import { useCallback, useEffect, useState } from "react";

const Auth = () => {
  const { authMode, toggleAuthMode } = useAuth();
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onDotButtonClick = useCallback(
    (index) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onInit = useCallback(() => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);

    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
    return () =>
      emblaApi
        .off("reInit", onInit)
        .off("reInit", onSelect)
        .off("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <section className="w-full h-auto flex flex-col-reverse lg:flex-row">
      <div className="flex-[0_0_35%] w-full h-auto my-20 px-12 sm:px-10 flex flex-col justify-center">
        <AuthForm />
        <div className="w-full h-auto flex justify-center mt-4">
          <p className="text-sm text-stone-600">
            {authMode === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              type="button"
              className="text-blue-500 ml-1 hover:cursor-pointer"
              onClick={toggleAuthMode}
            >
              {authMode === "signin" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
      <div
        className="flex-[0_0_65%] hidden sm:block w-full h-auto bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${authBG})` }}
      >
        <div className="w-full h-full py-20 px-12 md:px-20 bg-stone-800/75 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-black text-white capitalize text-center">
            Find a new recipe and start cooking
          </h1>
          <div
            className="overflow-x-hidden w-full lg:max-w-md h-auto mt-8"
            ref={emblaRef}
          >
            <div className="flex gap-8">
              {dummyTestimonies.map((testi, index) => (
                <Testimony testi={testi} key={index} />
              ))}
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  className={`size-3 rounded-full hover:cursor-pointer ${selectedIndex === index ? "bg-primary" : "bg-white"} transition-all duration-150`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;

import aboutUsImg from "../../assets/about-us.jpg";
import AboutContent from "./aboutContent";
import { Icons } from "../../icons";
import { recipeIcons } from "../../data/recipeIconsData";

const About = () => {
  return (
    <section className="w-full h-auto my-28 px-12 md:px-20 flex flex-col lg:flex-row gap-8">
      <div className="w-full h-auto lg:py-20">
        <AboutContent />
      </div>
      <div className="w-full h-auto relative overflow-hidden rounded-3xl">
        <div className="w-full h-[70vh] lg:h-full overflow-hidden">
          <img
            className="w-full h-full object-cover object-center"
            src={aboutUsImg}
            alt="About Us"
            loading="lazy"
          />
        </div>
        <div className="absolute w-full h-full top-0 bg-stone-800/50 flex flex-col items-center justify-center">
          <div className="group size-20 rounded-full bg-white flex items-center justify-center hover:scale-110 hover:bg-stone-100 transition-all ease-in-out duration-150">
            <Icons
              iconsName={recipeIcons.oirAlayBtn}
              className="size-10 text-inherit group-hover:scale-105 transition-all duration-150 ease-in-out"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

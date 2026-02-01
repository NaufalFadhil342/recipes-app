import aboutBG from "../../assets/about-us.webp";
import { Icons } from "../../icons";
import { recipeIcons } from "../../data/recipeIconsData";

const Story = () => {
  return (
    <>
      <div className="w-full h-auto block md:flex gap-8 items-center justify-between">
        <h1 className="text-[2.5em] font-bold text-inherit capitalize">
          Our Story
        </h1>
        <p className="w-full md:w-1/2 text-stone-600 mt-8 md:mt-0">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem expedita ratione deserunt sapiente quas, veritatis
          alias, natus adipisci architecto ex, id quaerat repellat. Totam, aut
          accusantium. Labore quod ratione non.
        </p>
      </div>
      <div className="w-full h-[80vh] rounded-3xl overflow-hidden mt-10 relative">
        <img
          className="w-full h-full object-cover object-center"
          src={aboutBG}
          alt="About Us Image"
          width={1000}
          height={1000}
        />
        <div className="w-full h-full absolute top-0 left-0 z-10 flex flex-col items-center justify-center bg-stone-800/60">
          <button
            type="button"
            className="group size-20 rounded-full bg-white flex items-center justify-center hover:scale-110 hover:bg-stone-100 hover:cursor-pointer transition-all ease-in-out duration-150"
            title="Play button"
          >
            <Icons
              iconsName={recipeIcons.oirAlayBtn}
              className="size-10 text-inherit group-hover:scale-110 transition-all duration-150 ease-in-out"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Story;

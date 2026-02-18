import { Icons } from "../../icons";
import { recipeIcons } from "../../data/recipeIconsData";
import { Link } from "react-router";

const ourFeatures = [
  {
    text: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur",
  },
];

const AboutContent = () => {
  return (
    <>
      <span className="italic text-primary font-medium">About</span>
      <h2 className="text-4xl font-semibold uppercase mt-2">What We Do?</h2>
      <p className="text-stone-600 my-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
        consequuntur numquam error, molestiae aut unde eveniet quasi quaerat
        eligendi alias culpa, odio, aperiam sequi? Sequi repellendus non
        possimus id exercitationem.
      </p>
      <ul className="w-full h-auto">
        {ourFeatures.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Icons
              iconsName={recipeIcons.mysCheck}
              className="size-8 text-primary"
            />
            <p className="text-stone-600">{feature.text}</p>
          </li>
        ))}
      </ul>
      <div className="w-auto h-auto mt-6">
        <Link
          to="/about"
          className="group w-fit h-12 flex items-center gap-2 px-4 rounded-md text-inherit bg-primary border-[3px] border-primary font-medium hover:bg-transparent transition-all duration-150 ease-in-out"
          onClick={() => window.scrollTo({ top: true })}
        >
          <>View More</>
          <Icons
            iconsName={recipeIcons.riArrowRight}
            className="size-6 text-inherit rotate-90 group-hover:rotate-0 transition-all duration-150 ease-in-out"
          />
        </Link>
      </div>
    </>
  );
};

export default AboutContent;

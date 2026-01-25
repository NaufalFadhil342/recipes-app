import { Icon } from "@iconify/react";
import { useState } from "react";

const Purpose = () => {
  const [vision, setVision] = useState("vision");

  const toggleVision = (newState) => {
    setVision(newState);
  };

  const ourVision =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, esse vel quasi repellendus porro tempore dolorem pariatur deleniti laudantium. Velit aliquid repellat, dolor nostrum amet voluptatum. Vel ducimus a tempore.";

  const ourMissions = [
    "Lorem ipsum dolor sit, amet consectetur adipisicing.",
    "Velit aliquid repellat, dolor nostrum amet voluptatum.",
    "Vel ducimus a tempore dolorem pariatur.",
    "Esse vel quasi repellendus porro tempore.",
    "Aliquam erat volutpat. Mauris eget euismod nibh, sed.",
  ];

  return (
    <div className="w-full h-auto">
      <div className="w-full h-auto">
        <h2 className="text-[2.5em] font-bold text-inherit leading-none">
          Our Goals
        </h2>
        <div className="w-14 h-0.5 bg-primary mt-3" />
      </div>
      <div className="w-full xs:w-fit h-auto rounded-md mt-10 bg-gray-300/80 p-1 relative">
        <div
          className={`absolute top-1 left-1 w-33 xs:w-40 h-10 bg-primary rounded-md transition-transform duration-300 ease-in-out ${
            vision === "mission" ? "translate-x-full" : "translate-x-0"
          }`}
        />
        <div className="relative flex">
          <button
            type="button"
            className="w-full xs:w-40 h-10 flex items-center justify-center px-4 rounded-md border-none font-medium transition-colors duration-300 z-10 hover:cursor-pointer"
            onClick={() => toggleVision("vision")}
          >
            Our Vision
          </button>
          <button
            type="button"
            className="w-full xs:w-40 h-10 flex items-center justify-center px-4 rounded-md border-none font-medium transition-colors duration-300 z-10 hover:cursor-pointer"
            onClick={() => toggleVision("mission")}
          >
            Our Mission
          </button>
        </div>
      </div>
      <div className="w-full h-auto mt-10">
        {vision === "mission" ? (
          <ul className="w-full h-auto space-y-2">
            {ourMissions.map((mission, index) => (
              <li key={index} className="flex items-center gap-2">
                <Icon
                  icon="material-symbols:check-rounded"
                  className="size-7 text-primary"
                />
                <p className="text-stone-600">{mission}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="w-full md:max-w-3xl h-auto">
            <p className="text-stone-600">{ourVision}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Purpose;

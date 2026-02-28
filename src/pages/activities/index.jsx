import { useState } from "react";
import { useRouteLoaderData } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import activitiesBG from "../../assets/about-us.webp";
import { BreadCrumb } from "../../layout/breadcrumb";
import { Icons } from "../../icons";
import { recipeIcons } from "../../data/recipeIconsData";

const Activities = () => {
  const { images: activities } = useRouteLoaderData("root");
  const [activeIndex, setActiveIndex] = useState(null);

  const handleIndexActive = (active) => {
    setActiveIndex(activeIndex === active ? null : active);
  };

  const colPattern = [
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1 lg:row-span-2",
    "col-span-1 lg:col-span-2 row-span-1 lg:row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
  ];

  return (
    <section className="w-full h-auto">
      <div
        className="w-full h-[80vh] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${activitiesBG})` }}
      >
        <div className="w-full h-full bg-stone-800/70 px-12 md:px-20 flex flex-col items-center justify-center gap-5">
          <h1 className="text-[2.5em] font-bold text-white text-center">
            Our Daily Activities
          </h1>
          <BreadCrumb />
        </div>
      </div>
      <ul className="w-full h-auto my-28 px-12 md:px-20 grid sm:grid-cols-2 lg:grid-cols-3 lg:auto-rows-[18rem] gap-10">
        {activities.map((activity, index) => {
          const plainName = activity.name
            .replace(/\.[^.]+$/i, "")
            .replace(/\d+/g, "")
            .replace(/-/g, " ")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          return (
            <li
              key={index}
              className={`w-full min-h-72 lg:min-h-0 rounded-3xl overflow-hidden relative ${colPattern[index % colPattern.length]}`}
              onMouseEnter={() => handleIndexActive(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <img
                className="w-full h-full object-cover object-center"
                src={activity.url}
                alt={activity.name}
                width={500}
                height={500}
                loading="lazy"
                aria-label={activity.name}
              />
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className="w-full h-full absolute top-0 left-0 bg-stone-800/70 flex flex-col items-center justify-center gap-4 text-center"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <Icons
                      iconsName={recipeIcons.lucideInstagram}
                      className="size-20 text-white"
                    />
                    <p className="text-xl font-semibold text-white text-center">
                      {plainName}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Activities;

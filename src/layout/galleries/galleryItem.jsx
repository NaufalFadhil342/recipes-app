import { AnimatePresence, motion } from "motion/react";
import { Icons } from "../../icons";
import { recipeIcons } from "../../data/recipeIconsData";

const GalleryItem = ({
  className,
  inHover,
  outHover,
  item,
  cleanName,
  hoverIndex,
  itemId,
}) => {
  return (
    <li className={className} onMouseEnter={inHover} onMouseLeave={outHover}>
      <img
        className="w-full h-full object-cover object-center"
        src={item.url}
        alt={cleanName}
        loading="lazy"
      />
      <AnimatePresence>
        {hoverIndex === itemId && (
          <motion.div
            className="w-full h-full absolute z-5 top-0 bg-stone-800/50 flex flex-col items-center justify-center gap-4"
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
              {cleanName}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default GalleryItem;

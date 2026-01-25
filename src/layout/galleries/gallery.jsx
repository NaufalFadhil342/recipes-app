import GalleryItem from "./galleryItem";

const Gallery = ({ galleries, hoverIndex, setHoverIndex }) => {
  return (
    <ul className="w-full h-auto flex">
      {galleries.map((item, index) => {
        const cleanName = item.name
          .replace(/\.(webp|jpg|jpeg|png)$/i, "")
          .replace(/-/g, " ")
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        return (
          <GalleryItem
            key={index}
            className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_30.5%] h-72 rounded-3xl relative overflow-hidden ml-10 opacity-30 [&.is-in-view]:opacity-50 [&.is-snapped]:opacity-100"
            inHover={() => setHoverIndex(index)}
            outHover={() => setHoverIndex(null)}
            cleanName={cleanName}
            item={item}
            hoverIndex={hoverIndex}
            itemId={index}
          />
        );
      })}
    </ul>
  );
};

export default Gallery;

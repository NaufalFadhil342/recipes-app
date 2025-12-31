import { useEffect, useState } from "react";

export const useItemsPerViewport = () => {
  const [itemsToShow, setItemsToShow] = useState(6);

  useEffect(() => {
    const updateItemsCount = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsToShow(2);
      } else if (width < 1024) {
        setItemsToShow(4);
      } else {
        setItemsToShow(6);
      }
    };

    updateItemsCount();
    window.addEventListener("resize", updateItemsCount);

    return () => window.removeEventListener("resize", updateItemsCount);
  }, []);

  return itemsToShow;
};

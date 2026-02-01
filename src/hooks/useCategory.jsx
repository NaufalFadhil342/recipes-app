import { useContext } from "react";
import { RegionCtx } from "../context/regionCtx";

export const useCategory = () => {
  const context = useContext(RegionCtx);

  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};

import { useContext } from "react";
import { CategoryCtx } from "../context/categoryCtx";

export const useCategory = () => {
  const context = useContext(CategoryCtx);

  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};

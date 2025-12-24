import { useContext } from "react";
import { SavedItemCtx } from "../context/savedItemCtx";

export const useSaveItem = () => {
  const context = useContext(SavedItemCtx);
  if (!context) {
    throw new Error("useSaveItem must be used within a SavedItemProvider");
  }
  return context;
};

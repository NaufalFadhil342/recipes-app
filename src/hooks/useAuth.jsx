import { useContext } from "react";
import { UserAuthCtx } from "../context/userAuthCtx";

export const useAuth = () => {
  const context = useContext(UserAuthCtx);
  if (!context) {
    throw new Error("useAuth must be used within a UserAuthProvider");
  }
  return context;
};

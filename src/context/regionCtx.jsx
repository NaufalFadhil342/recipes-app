import { createContext, useState } from "react";

const RegionCtx = createContext();

const RegionProvider = (props) => {
  const [selectRegion, setSelectRegion] = useState("");

  const handleRegionActive = (region) => {
    setSelectRegion(region);
  };

  const value = {
    selectRegion,
    handleRegionActive,
  };

  return (
    <RegionCtx.Provider value={value}>{props.children}</RegionCtx.Provider>
  );
};

export { RegionCtx, RegionProvider };

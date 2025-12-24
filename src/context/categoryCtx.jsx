import { createContext, useState } from "react";

const CategoryCtx = createContext();

const CategoryProvider = (props) => {
  const [selectCategory, setSelectCategory] = useState("");

  const handleCategoryActive = (category) => {
    setSelectCategory(category);
  };

  const value = {
    selectCategory,
    handleCategoryActive,
  };

  return (
    <CategoryCtx.Provider value={value}>{props.children}</CategoryCtx.Provider>
  );
};

export { CategoryCtx, CategoryProvider };

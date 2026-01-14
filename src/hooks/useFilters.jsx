import { useMemo, useState } from "react";

const defaultFilters = {
  sortBy: "popular",
  category: [],
  countries: [],
};

const useFilters = (recipes) => {
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);
  const [tempFilters, setTempFilters] = useState(defaultFilters);
  const [showFilters, setShowFilters] = useState(false);

  const filteredRecipes = useMemo(() => {
    let updatedRecipes = [...recipes];

    if (appliedFilters.sortBy === "newest") {
      updatedRecipes.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (appliedFilters.sortBy === "popular") {
      updatedRecipes.sort((a, b) => b.views - a.views);
    }

    if (appliedFilters.category && appliedFilters.category.length > 0) {
      updatedRecipes = updatedRecipes.filter((recipe) =>
        appliedFilters.category.includes(recipe.category)
      );
    }

    if (appliedFilters.countries && appliedFilters.countries.length > 0) {
      updatedRecipes = updatedRecipes.filter((recipe) => {
        if (!recipe.country || !recipe.country.name) {
          return false;
        }
        return appliedFilters.countries.includes(
          recipe.country.name.toLowerCase()
        );
      });
    }

    return updatedRecipes;
  }, [appliedFilters, recipes]);

  const getEmptyStateMessage = () => {
    const parts = [];

    if (appliedFilters.category && appliedFilters.category.length > 0) {
      parts.push(appliedFilters.category.join(", "));
    }

    if (appliedFilters.countries && appliedFilters.countries.length > 0) {
      const countries = appliedFilters.countries.map(
        (country) => country.charAt(0).toUpperCase() + country.slice(1)
      );
      parts.push(countries.join(", "));
    }

    if (parts.length === 0) {
      return "No recipes available.";
    }

    if (parts.length === 1) {
      return `No ${parts[0]} recipes available.`;
    }

    return `No ${parts.join(" recipes from ")} avaiable.`;
  };

  const handleOpen = () => {
    setTempFilters(appliedFilters);
    setShowFilters(true);
  };

  const handleApply = () => {
    setAppliedFilters(tempFilters);
    setShowFilters(false);
  };

  const handleClear = () => {
    setAppliedFilters(defaultFilters);
    setTempFilters(defaultFilters);
    setShowFilters(false);
  };

  const handleClose = () => {
    setShowFilters(false);
  };

  return {
    filteredRecipes,
    appliedFilters,
    setAppliedFilters,
    showFilters,
    setShowFilters,
    tempFilters,
    setTempFilters,
    handleOpen,
    handleApply,
    handleClear,
    handleClose,
    getEmptyStateMessage,
  };
};

export { useFilters };

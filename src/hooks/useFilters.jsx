import { useEffect, useMemo, useState } from "react";
import { useSearch } from "./useSearch";

const defaultFilters = {
  sortBy: "popular",
  category: [],
  countries: [],
};

const useFilters = (recipes) => {
  const { searchParams, currentSearchQuery, setSearchParams } = useSearch({
    path: "/recipes",
    preserveOtherParams: true,
    redirectOnSearch: true,
  });

  const searchQuery = currentSearchQuery;
  const getFiltersFromURL = () => {
    const sortBy = searchParams.get("sortBy") || "popular";
    const category = searchParams.get("category") || [];
    const countries = searchParams.get("country") || [];

    return { sortBy, category, countries };
  };

  const [appliedFilters, setAppliedFilters] = useState(getFiltersFromURL);
  const [tempFilters, setTempFilters] = useState(defaultFilters);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (appliedFilters.sortBy !== "popular") {
      params.set("sortBy", appliedFilters.sortBy);
    } else {
      params.delete("sortBy");
    }

    if (appliedFilters.category && appliedFilters.category.length > 0) {
      params.set("category", appliedFilters.category.join(","));
    } else {
      params.delete("category");
    }

    if (appliedFilters.countries && appliedFilters.countries.length > 0) {
      params.set("countries", appliedFilters.countries.join(","));
    } else {
      params.delete("countries");
    }

    setSearchParams(params, { replace: true });
  }, [appliedFilters, setSearchParams]);

  const filteredRecipes = useMemo(() => {
    let updatedRecipes = [...recipes];

    if (searchQuery.trim()) {
      const searchWords = searchQuery.toLowerCase().trim().split(/\s+/);

      updatedRecipes = updatedRecipes.filter((recipe) => {
        return searchWords.every(
          (word) =>
            recipe.title?.toLowerCase().includes(word) ||
            recipe.content?.toLowerCase().includes(word) ||
            recipe.category?.toLowerCase().includes(word) ||
            recipe.country?.name?.toLowerCase().includes(word) ||
            recipe.tags?.some((tag) => tag.toLowerCase().includes(word)),
        );
      });
    }

    if (appliedFilters.sortBy === "newest") {
      updatedRecipes.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
    } else if (appliedFilters.sortBy === "popular") {
      updatedRecipes.sort((a, b) => b.views - a.views);
    }

    if (appliedFilters.category && appliedFilters.category.length > 0) {
      updatedRecipes = updatedRecipes.filter((recipe) =>
        appliedFilters.category.includes(recipe.category),
      );
    }

    if (appliedFilters.countries && appliedFilters.countries.length > 0) {
      updatedRecipes = updatedRecipes.filter((recipe) => {
        if (!recipe.country || !recipe.country.name) {
          return false;
        }
        return appliedFilters.countries.includes(
          recipe.country.name.toLowerCase(),
        );
      });
    }

    return updatedRecipes;
  }, [appliedFilters, recipes, searchQuery]);

  const getEmptyStateMessage = () => {
    const parts = [];

    if (searchQuery.trim()) {
      return `No recipes found for ${searchQuery}`;
    }

    if (appliedFilters.category && appliedFilters.category.length > 0) {
      parts.push(appliedFilters.category.join(", "));
    }

    if (appliedFilters.countries && appliedFilters.countries.length > 0) {
      const countries = appliedFilters.countries.map(
        (country) => country.charAt(0).toUpperCase() + country.slice(1),
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
    searchQuery,
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

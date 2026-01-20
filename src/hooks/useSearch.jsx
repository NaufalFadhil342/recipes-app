import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

export const useSearch = (options = {}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const {
    path = "/recipes",
    preserveOtherParams = true,
    redirectOnSearch = true,
  } = options;

  useEffect(() => {
    const searchParamsURL = searchParams.get("search") || "";

    setSearchQuery(searchParamsURL);
    setIsSearching(false);
  }, [searchParams]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      setIsSearching(true);

      const newSearchParams = preserveOtherParams
        ? new URLSearchParams(searchParams)
        : new URLSearchParams();

      newSearchParams.set("search", searchQuery.trim());

      if (redirectOnSearch) {
        navigate({
          pathname: path,
          search: newSearchParams.toString(),
        });
      } else {
        setSearchParams(newSearchParams);
      }
    } else {
      setIsSearching(true);
      const newSearchParams = new URLSearchParams(searchParams);

      newSearchParams.delete("search");
      setSearchParams(newSearchParams);
    }
  };

  const handleSearchKeydown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchSubmit();
    }
  };

  const currentSearchQuery = searchParams.get("search") || "";

  return {
    searchQuery,
    searchParams,
    currentSearchQuery,
    isSearching,
    handleSearchChange,
    handleSearchSubmit,
    handleSearchKeydown,
    setSearchQuery,
    setSearchParams,
  };
};

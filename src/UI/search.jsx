import React from "react";
import { Icon } from "@iconify/react";

const Search = (props) => {
  return (
    <>
      <input
        type="text"
        className="border-none w-full h-12 pl-4 outline-none text-stone-800"
        placeholder={props.placeholder}
      />
      <Icon
        icon="bitcoin-icons:search-filled"
        className="size-8 mr-2 hover:cursor-pointer"
      />
    </>
  );
};

export default Search;

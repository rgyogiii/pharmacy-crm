import React from "react";
import { Button } from "@/components/ui";

import SearchIcon from "~icons/custom/search";

const Search = () => {
  return (
    <Button
      type="button"
      size="sm"
      variant="outline"
      className="ml-auto hover:bg-primary-400/20 cursor-default rounded-full p-2 flex items-center justify-start border-primary-900 w-52 h-8 hover:border-secondary-500 group"
    >
      <SearchIcon className="h-4 w-4 text-primary-900 mx-0.5 group-hover:text-secondary-500" />
      <p className="leading-none text-neutral-800 text-xs mx-1.5 font-normal">Search medicine...</p>
    </Button>
  );
};

export default Search;

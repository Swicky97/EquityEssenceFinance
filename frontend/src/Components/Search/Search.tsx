import React, { ChangeEvent, SyntheticEvent, useState } from "react";

interface Props {
  onSearchSubmit: (e: SyntheticEvent) => void;
  search: string | undefined;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<Props> = ({
  onSearchSubmit,
  search,
  handleSearchChange,
}) => {
  return (
    <section className="relative">
      <div className="container mx-auto pb-4">
        <form
          className="form relative flex flex-col w-full p-10 space-y-4 rounded-lg bg-lightGreen md:flex-row md:space-y-0 md:space-x-3"
          onSubmit={onSearchSubmit}
        >
          <input
            className="flex-1 p-3 border-2 rounded-lg placeholder-black focus:outline-none"
            id="search-input"
            placeholder="Search companies"
            value={search}
            onChange={handleSearchChange}
          ></input>
        </form>
      </div>
    </section>
  );
};

export default Search;

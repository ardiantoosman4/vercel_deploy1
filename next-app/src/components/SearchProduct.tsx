"use client";
import React, { useState } from "react";

export default function SearchProduct({
  setSearch,
  setPage,
  setDataProducts,
}: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setDataProducts: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const [value, setValue] = useState("");
  function handleSearch() {
    setSearch(value);
    setPage(1);
    setDataProducts([]);
  }
  return (
    <div className="ms-auto max-w-sm drop-shadow-sm">
      <div className="flex w-full flex-wrap items-stretch">
        <input
          onChange={(e) => setValue(e.target.value)}
          type="search"
          className=" m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon1"
        />

        <button
          onClick={handleSearch}
          className="rounded-r bg-black px-6 py-2.5 text-xs font-medium leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
          type="button"
          id="button-addon1"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          Search
        </button>
      </div>
    </div>
  );
}

"use client";
import React, { useState } from "react";
import Link from "next/link";

function SearchBox() {
  const [input, setInput] = useState("");
  return (
    <div className="search-box-container  sm:px-20 px-10  flex items-center gap-5 mt-4">
      <input
        className="search-box w-full  bg-transparent text-bold p-2 rounded-md border focus:outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search..."
      />
      {input !== "" ? (
        <Link href={`/search/${input}`}>
          <button className="search-button bg-transparent text-bold p-2 rounded-md border focus:outline-none">
            Search
          </button>
        </Link>
      ) : (
        <button
          className="search-button bg-transparent text-bold p-2 rounded-md border focus:outline-none opacity-50 cursor-not-allowed"
          disabled
        >
          Search
        </button>
      )}
    </div>
  );
}

export default SearchBox;

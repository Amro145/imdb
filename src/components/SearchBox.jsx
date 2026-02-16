"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";


function SearchBox() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      router.push(`/search/${input}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="search-box-container sm:px-20 px-10 flex items-center gap-5 mt-4"
    >
      <input
        className="search-box w-full bg-transparent text-bold p-2 rounded-md border focus:outline-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search..."
      />
      <button
        type="submit"
        disabled={!input.trim()}
        className={`search-button bg-transparent text-bold p-2 rounded-md border focus:outline-none ${!input.trim() ? "opacity-50 cursor-not-allowed" : ""
          }`}
      >
        Search
      </button>
    </form>
  );
}


export default SearchBox;

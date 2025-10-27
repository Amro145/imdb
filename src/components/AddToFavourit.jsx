"use client";
import React, { useEffect, useState } from "react";

function AddToFavourit({ movie }) {
  console.log(movie);
  const [isFavorited, setIsFavorited] = useState(false);

  const changeFavourit = () => {
    setIsFavorited((prev) => !prev);
  };

  return (
    <>
      <button
        onClick={changeFavourit}
        className="ml-4  px-2 py-1 rounded flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`${
            !isFavorited ? "text-gray-800 dark:text-white" : "text-rose-400"
          } h-6 w-6 mr-1 fill-current`}
          viewBox="0 0 20 20"
        >
          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
        </svg>
      </button>
    </>
  );
}

export default AddToFavourit;

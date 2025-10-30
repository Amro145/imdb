import React from "react";
import AddToFavourit from "./AddToFavourit";
import Link from "next/link";

function Card({ item }) {
  return (
    <div className="border p-4 m-2 flex flex-col justify-between ">
      <Link href={`/details/${item.id || item.movieId}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path || item.image}`}
          alt={item.title || item.name}
        />
        <h1 className="my-2 font-bold"> - {item.title || item.name}</h1>
        <p>{item.overview || item.description}</p>
      </Link>
      <div className="mt-2 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span
            className={
              (item.vote_average || item.rating) > 7 && (item.vote_average || item.rating) < 8
                ? "bg-blue-500 text-white px-2 py-1 rounded"
                : (item.vote_average || item.rating) >= 8
                ? "bg-green-500 text-white px-2 py-1 rounded"
                : "bg-red-500 text-white px-2 py-1 rounded"
            }
          >
            Rating: {(item.vote_average || item.rating)?.toString().slice(0, 3)}
          </span>
          {/* <AddToFavourit
            movieId={item.id}
            title={item.title || item.name}
            image={item.backdrop_path || item.poster_path}
            rating={item.vote_average}
            overview={item.overview || item.description}
            release_date={item.release_date || item.first_air_date}
            vote_average={item.vote_average}
          /> */}
        </div>

        <span className="text-sm text-gray-400 mt-1">
          Release Date: {(item.release_date || item.releaseDate || item.first_air_date) || "Unknown"}
        </span>
      </div>
    </div>
  );
}

export default Card;

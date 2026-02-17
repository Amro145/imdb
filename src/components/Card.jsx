import React from "react";
import AddToFavorite from "./AddToFavorite";
import Link from "next/link";
import Image from "next/image";
import RatingBadge from "./RatingBadge";

function Card({ item }) {
  const movieId = item.id || item.movieId;
  const posterPath = item.poster_path || item.backdrop_path || item.image;
  const title = item.title || item.name;

  return (
    <div className="group border p-4 m-2 flex flex-col justify-between hover:shadow-lg transition-shadow duration-200 rounded-lg dark:border-gray-700">
      <Link href={`/details/${movieId}`}>
        <div className="relative aspect-[2/3] w-full mb-3 overflow-hidden rounded-md">
          <Image
            src={
              posterPath
                ? `https://image.tmdb.org/t/p/w500${posterPath}`
                : `https://placehold.co/500x750?text=${encodeURIComponent(title)}`
            }
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <h1 className="my-2 font-bold truncate"> {title}</h1>
        <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
          {item.overview || item.description}
        </p>
      </Link>
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <RatingBadge rating={item.vote_average || item.rating} />
          {/* AddToFavorite commented out originally, keeping it that way if purpose was placeholder, but updating import name */}
          {/* <AddToFavorite
            movieId={movieId}
            title={title}
            image={posterPath}
            rating={item.vote_average || item.rating}
            overview={item.overview || item.description}
            release_date={item.release_date || item.first_air_date}
            vote_average={item.vote_average || item.rating}
          /> */}
        </div>

        <span className="text-xs text-gray-500 mt-1 italic">
          Released: {item.release_date || item.releaseDate || item.first_air_date || "Unknown"}
        </span>
      </div>
    </div>
  );
}


export default Card;

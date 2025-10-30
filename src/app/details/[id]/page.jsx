import AddToFavourit from "@/components/AddToFavourit";
import Link from "next/link";
import React from "react";

async function MovieDetails({ params }) {
  const { id } = await params;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`
  );
  const data = await res.json();
  if (!res.ok)
    return (
      <div className="error-container min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-red-500 text-3xl font-semibold">
          Failed To Load Movie Details
        </h1>
        <Link href="/" className="mt-4 text-blue-500 underline">
          Go Back Home
        </Link>
      </div>
    );
  return (
    <div className="movie-details-container max-h-screen p-8  flex ">
      <img
        src={`https://image.tmdb.org/t/p/original${
          data?.poster_path || data?.backdrop_path
        }`}
        alt={data?.title}
        className="rounded-lg shadow-md w-1/3 mr-8 object-cover"
      />

      <div className="movie-info w-2/3 flex flex-col gap-3">
        <h1 className="text-3xl font-bold mb-4">
          {data?.title || "No Title Available"}
        </h1>
        <p>
          <span className="font-bold ">Overview:</span>{" "}
          {data?.overview || "No overview available."}
        </p>
        <p>
          <span className="font-bold">Date Released:</span>{" "}
          {data?.release_date || "Unknown"}
        </p>
        <p>
          <span className="font-bold">Rating:</span>{" "}
          <span
            className={
              data?.vote_average > 7 && data?.vote_average < 8
                ? "bg-blue-500 text-white px-2 py-1 rounded"
                : data?.vote_average >= 8
                ? "bg-green-500 text-white px-2 py-1 rounded"
                : "bg-red-500 text-white px-2 py-1 rounded"
            }
          >
            {data?.vote_average.toString().slice(0, 3) || "N/A"}
          </span>
        </p>
        <p>
          <span className="font-bold">Genres:</span>{" "}
          {data?.genres.map((genre) => genre.name).join(", ") || "N/A"}
        </p>
        <div className="flex items-center">
          Add To Favourites:
          <AddToFavourit
            movieId={data?.id}
            title={data?.title || data?.name}
            image={data?.backdrop_path || data?.poster_path}
            rating={data?.vote_average}
            overview={data?.overview || data?.description}
            release_date={data?.release_date || data?.first_air_date}
            vote_average={data?.vote_average}
          />
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;

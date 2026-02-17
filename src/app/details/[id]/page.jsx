import AddToFavorite from "@/components/AddToFavorite";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import RatingBadge from "@/components/RatingBadge";

async function MovieDetails({ params }) {
  const { id } = await params;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`
  );

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

  const data = await res.json();
  const posterPath = data?.poster_path || data?.backdrop_path;

  return (
    <div className="movie-details-container w-full max-w-6xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
      <div className="relative w-full md:w-1/3 aspect-[2/3] rounded-lg overflow-hidden shadow-xl">
        <Image
          src={
            posterPath
              ? `https://image.tmdb.org/t/p/original${posterPath}`
              : `https://placehold.co/500x750?text=${encodeURIComponent(data?.title || "No Image")}`
          }
          alt={data?.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="movie-info w-full md:w-2/3 flex flex-col gap-4">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
          {data?.title || "No Title Available"}
        </h1>

        <div className="flex flex-wrap gap-4 items-center">
          <RatingBadge rating={data?.vote_average} />
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <span className="font-bold">Date Released:</span>
            <span>{data?.release_date || "Unknown"}</span>
          </div>
        </div>

        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          <span className="font-bold text-gray-900 dark:text-white">Overview:</span>{" "}
          {data?.overview || "No overview available."}
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="font-bold">Genres:</span>
          {data?.genres?.map((genre) => (
            <span key={genre.id} className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded-full text-xs">
              {genre.name}
            </span>
          )) || "N/A"}
        </div>

        <div className="flex items-center gap-3 mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <span className="font-semibold"></span>
          <AddToFavorite
            movieId={data?.id}
            title={data?.title || data?.name}
            image={posterPath}
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

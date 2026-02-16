"use client";
import Loading from "@/components/Loading";
import Result from "@/components/Result";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

function Favourites() {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  useEffect(() => {
    const fetchFavourites = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/user/getFav", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const data = await res.json();
          setResults(data.favs);
        } else {
          const data = await res.json();
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching favourites:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (isLoaded && isSignedIn && user) {
      fetchFavourites();
    }
  }, [isSignedIn, isLoaded, user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (!isSignedIn && isLoaded) {
    return (
      <p className="text-gray-700 dark:text-gray-200 text-center mt-10">
        Please sign in to view your favourites.
      </p>
    );
  }
  return (
    <div>
      {(!isLoading && !results) || results?.length === 0 ? (
        <p className="text-gray-700 dark:text-gray-200 text-center mt-10">
          No favourites added yet.
        </p>
      ) : (
        results &&
        results?.length > 0 && (
          <Result

            results={results.map((result) => ({
              ...result,
              id: result.movieId,
              title: result.title,
              backdrop_path: result.image,
              overview: result.description,
              first_air_date: result.dateReleased,
              vote_count: result.rating,
            }))}
          />
        )
      )}
    </div>
  );
}

export default Favourites;

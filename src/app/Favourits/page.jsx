"use client";
import Result from "@/components/Result";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

function Favourites() {
  const [results, setResults] = useState(null);
  const { isSignedIn, user, isLoaded } = useUser();
  useEffect(() => {
    const fetchFavourites = async () => {
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
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };
    if (isLoaded && isSignedIn && user) {
      fetchFavourites();
    }
  }, [isSignedIn, isLoaded, user]);



  if (!isSignedIn) {
    return (
      <p className="text-white text-center mt-10">
        Please sign in to view your favourites.
      </p>
    );
  }
  return (
    <div>
      {!results || !results?.length === 0 ? (
        <p className="text-white text-center mt-10">No favourites added yet.</p>
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

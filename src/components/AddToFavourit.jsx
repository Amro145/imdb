"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function AddToFavourit({
  movieId,
  title,
  image,
  rating,
  overview,
  release_date,
  vote_average,
}) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    if (isLoaded && isSignedIn && user) {
      setIsFavorited(user?.publicMetadata?.favs?.includes(movieId));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [movieId, isLoaded, isSignedIn, user]);

  const handleFavClick = async () => {
    setIsLoading(true);
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    } else {
      try {
        const res = await fetch("/api/user/fav", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movieId,
            title,
            image,
            rating,
            overview,
            release_date,
            vote_average,
          }),
        });
        if (res.ok) {
          setIsFavorited(!isFavorited);
        } else {
          console.log("Error updating favourites:", await res.json());
        }
      } catch (error) {
        console.log("Error updating favourites:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <button
        onClick={handleFavClick}
        className="ml-4  px-2 py-1 rounded flex items-center"
        disabled={isLoading}
      >
        {isLoading ? "..." : isFavorited ? "❤️" : "🤍"}
      </button>
    </>
  );
}

export default AddToFavourit;

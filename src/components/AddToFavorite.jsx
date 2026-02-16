"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

function AddToFavorite({
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
      setIsFavorited(user?.publicMetadata?.favs?.includes(String(movieId)));
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
          const errorData = await res.json();
          alert(errorData.message || "Failed to update favorites");
          console.error("Error updating favourites:", errorData);
        }
      } catch (error) {
        alert("An error occurred while updating favorites. Please try again.");
        console.error("Error updating favourites:", error);
      } finally {
        setIsLoading(false);
      }

    }
  };

  return (
    <>
      <button
        onClick={handleFavClick}
        className="ml-1 px-2 py-1 rounded flex items-center transition-colors duration-200"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="text-xl animate-pulse text-gray-400">
            please wait...          </span>
        ) : isFavorited ? (
          <span className="text-xl text-red-600 hover:text-red-700">
            Remove From Favs
          </span>
        ) : (
          <span className="text-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            Add To Favs
          </span>
        )}
      </button>
    </>
  );
}

export default AddToFavorite;


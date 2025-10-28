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
          console.log("Favourites data:", data);
          setResults(data.favs);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };
    if (isLoaded && isSignedIn && user) {
      console.log("User is signed in, fetching favourites...");
      fetchFavourites();
    }
    console.log(results);
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
        results && results?.length > 0 && <Result results={results} />
      )}
    </div>
  );
}

export default Favourites;

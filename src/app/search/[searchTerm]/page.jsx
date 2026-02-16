import Result from "@/components/Result";
import React from "react";

async function page({ params }) {
  const { searchTerm } = await params;

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=en-US&query=${searchTerm}&page=1&include_adult=false`
  );
  const data = await res.json();
  const results = data.results;
  return (
    <div>
      {!results || results.length === 0 ? (
        <h1 className="text-white text-center pt-20">No results found</h1>
      ) : (
        <Result results={results} />
      )}
    </div>
  );
}

export default page;

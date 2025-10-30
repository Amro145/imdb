import React from "react";
import Card from "./Card";

function Result({ results }) {
  console.log("results in Result component:", results);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  p-4">
      {results.map((item, index) => (
        <Card key={index} item={item} />
      ))}
    </div>
  );
}

export default Result;

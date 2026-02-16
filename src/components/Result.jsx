import React from "react";
import Card from "./Card";

function Result({ results }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  p-4">
      {results.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>

  );
}

export default Result;

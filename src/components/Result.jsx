import React from "react";
import Card from "./Card";

function Result({ results }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {results.map((item, index) => (
        <Card key={index} item={item} />
      ))}
    </div>
  );
}

export default Result;

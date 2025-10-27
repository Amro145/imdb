"use client";
import React from "react";

function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 mt-10 text-red-500">
      <h1 className="text-2xl font-bold">Error</h1>
      <p>{error.message}</p>
      <button className="text-white p-2 rounded-sm bg-blue-500" onClick={() => reset()}>Try Again</button>
    </div>
  );
}

export default Error;

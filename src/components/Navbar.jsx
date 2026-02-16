import React from "react";
import NavItem from "./NavItem";

function Navbar() {
  return (
    <div className="flex justify-center gap-8 py-4 text-lg font-medium bg-rose-100 text-gray-900 dark:text-gray-50 dark:bg-gray-800">
      <NavItem param="trending" title="Trending" />
      <NavItem param="top_rated" title="Top Rated" />
    </div>

  );
}

export default Navbar;

"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

function NavItem({ title, param }) {
  const pathname = usePathname().split("/");

  return (
    <div>
      <Link href={`/top/${param}`} className="hover:text-amber-500 flex flex-col items-center ">
        {title}
        {pathname[2] === param && (
          <div className="w-full h-1 bg-amber-500 rounded-t-md mt-1"></div>
        )}
      </Link>
    </div>
  );
}

export default NavItem;

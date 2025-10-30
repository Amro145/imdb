import Link from "next/link";
import DarkModeSwitch from "./DarkModeSwitch";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { FaHome } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { MdPeopleOutline } from "react-icons/md";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-3 max-w-6xl mx-auto">
      <ul className="flex gap-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Link href={"/sign-in"}>Sign in</Link>
        </SignedOut>
        <li className="hidden sm:block">
          <Link href={"/"}>Home1</Link>
        </li>
        <li className="hidden sm:block">
          <Link href={"/about"}>About</Link>
        </li>
        <li className="hidden sm:block">
          <Link href={"/Favourits"}>Favourites</Link>
        </li>
        <li className="block sm:hidden  text-2xl">
          <Link href={"/"}>
            <FaHome />
          </Link>
        </li>
        <li className="block sm:hidden text-2xl">
          <Link href={"/about"}>
            <MdPeopleOutline />
          </Link>
        </li>
        <li className="block sm:hidden text-2xl">
          <Link href={"/Favourits"}>
            <CiStar />
          </Link>
        </li>
      </ul>
      <div className="flex items-center gap-4">
        <DarkModeSwitch />
        <Link href={"/"} className="flex gap-1 items-center">
          <span className="text-2xl font-bold bg-amber-500 py-1 px-2 rounded-lg">
            IMDb
          </span>
          <span className="text-xl hidden sm:inline">Clone</span>
        </Link>
      </div>
    </div>
  );
}

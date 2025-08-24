import Image from "next/image";
import React from "react";
import logo from "@/assets/components/Navbar/Nayem-light.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SearchBar from "./SearchBar/SearchBar";
import { Icon } from "@iconify/react";

const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Create Article",
    href: "/",
  },
];

const Navbar = () => {
  return (
    <div className="bg-background/60 backdrop-blur-md fixed top-0 left-0 right-0 border-b">
      <div className="container min-h-[80px] flex items-center justify-between w-full gap-x-[20px]">
        <div className="flex gap-x-[15px] items-center">
          <Image src={logo} className="w-36" alt="logo" />

          {navLinks?.length ? (
            <nav className="hidden gap-6 lg:flex">
              {navLinks?.map((item, index) => (
                <Link key={index} href={item.href}>
                  {item.title}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>

        <div className="w-full max-w-[410px] flex-grow flex items-center gap-x-[10px]">
          <SearchBar />

          <div className="h-[40px] aspect-square border border-solid border-stock hover:border-primary rounded-full flex justify-center items-center cursor-pointer">
            <Icon icon="ep:user-filled" className="text-[26px] text-ash" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

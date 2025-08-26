"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/assets/components/Navbar/Nayem-light.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SearchBar from "./SearchBar/SearchBar";
import { Icon } from "@iconify/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Hamburger from "./Hamburger/Hamburger";
import MobileNav from "./MobileNav";
import LoginModal from "../Modals/LoginModal/LoginModal";

import { Dialog } from "@/components/ui/dialog";

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
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <div className="bg-white backdrop-blur-md fixed top-0 left-0 right-0 border-b">
        <div className="container min-h-[80px] flex items-center justify-between w-full gap-x-[20px] z-[10]">
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
            <DropdownMenu>
              <DropdownMenuTrigger className="h-[40px] aspect-square rounded-full">
                <div className="h-[40px] aspect-square border border-solid border-stock hover:border-primary rounded-full flex justify-center items-center cursor-pointer">
                  <Icon
                    icon="ep:user-filled"
                    className="text-[26px] text-ash"
                  />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">
                  Sign Up
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setShowLoginModal(true)}
                >
                  Login
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Hamburger
              show={showMobileMenu}
              callback={() => setShowMobileMenu(!showMobileMenu)}
            />
          </div>
        </div>

        {showMobileMenu && navLinks && <MobileNav navLinks={navLinks} />}

        <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
          <LoginModal />
        </Dialog>
      </div>
    </>
  );
};

export default Navbar;

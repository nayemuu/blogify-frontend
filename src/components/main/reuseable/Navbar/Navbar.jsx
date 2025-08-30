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
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@/components/ui/avatar";
import { userLoggedOut } from "@/redux/features/auth/authSlice";
import { clearProfileInfo } from "@/redux/features/profile/profileSlice";

const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Create Article",
    href: "/create-article",
  },
];

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { accessToken } = useSelector((state) => state.auth);
  const { name } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log("accessToken = ", accessToken);
  // }, [accessToken]);

  // useEffect(() => {
  //   console.log("profile = ", profile);
  // }, [profile]);

  // useEffect(() => {
  //   console.log("name = ", name);
  // }, [name]);

  const handleLogout = () => {
    dispatch(userLoggedOut());
    dispatch(clearProfileInfo());
    localStorage.removeItem("auth");
  };

  return (
    <>
      <div className="bg-white backdrop-blur-md fixed top-0 left-0 right-0 border-b z-[10]">
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

            {accessToken && name ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="h-[40px] aspect-square rounded-full">
                  <div className="h-[40px] aspect-square border border-solid border-stock hover:border-primary rounded-full flex justify-center items-center cursor-pointer bg-brand-primary text-[22px] leading-0 text-white font-bold">
                    {name[0]?.toUpperCase()}
                    {}
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  {/* <DropdownMenuItem className="cursor-pointer">
                    Profile
                  </DropdownMenuItem> */}

                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="h-[40px] aspect-square rounded-full">
                  <div className="h-[40px] aspect-square border border-solid border-stock hover:border-primary rounded-full flex justify-center items-center cursor-pointer bg-brand-primary">
                    <Icon
                      icon="ep:user-filled"
                      className="text-[26px] text-white"
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
            )}

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

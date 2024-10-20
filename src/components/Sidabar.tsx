"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  FaAddressCard,
  FaCommentDots,
  FaUsers,
  FaUserShield,
} from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { MdDashboard, MdPolicy, MdRecommend } from "react-icons/md";

const isNotActiveStyle: string =
  "px-5 py-2 flex items-center text-white gap-3 w-full hover:bg-[#b430bb] hover:text-black hover:font-semibold transition-all duration-200 ease-in-out capitalize";

const isActiveStyle: string =
  "px-5 py-2 flex items-center text-black gap-3 bg-[#D09EE8] font-bold w-full transition-all duration-200 ease-in-out capitalize";

interface SideBarProps {
  closeToggle?: Dispatch<SetStateAction<boolean>>;
}
const Sidebar = ({ closeToggle }: SideBarProps) => {
  const pathname = usePathname();

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div
      style={{
        minWidth: "220px",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
      className="flex flex-col justify-start h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
    >
      <div className=" flex flex-col start gap-8 pb-4 h-full bg-clip-padding backdrop-filter lg:backdrop-filter-none backdrop-blur-md lg:backdrop-blur-none bg-primary lg:bg-transparent ">
        <div className="w-full bg-primary sticky top-0 z-10 py-[1.1rem] px-5">
          <div className=" logo-box flex justify-start items-center gap-2 ">
            <Image
              width={45}
              height={45}
              className="w-[45px] h-auto "
              src="/logo-cocobod.png"
              alt="logo"
            />
            <div className="line w-[1.2px] h-[25px] bg-[#fff] "></div>
            <h4 className="">
              <span className="block text-[12px] text-[#fff] font-semibold">
                Ghana Cocoa Board
              </span>
            </h4>
          </div>
        </div>
        <nav className="flex flex-col gap-4 text-[15px] ">
          <Link
            href="/dashboard"
            className={
              pathname === "/dashboard" ? isActiveStyle : isNotActiveStyle
            }
            onClick={() => {
              handleCloseSidebar();
            }}
          >
            <MdDashboard size={18} />
            Dashboard
          </Link>

          <Link
            href="/user-profile"
            className={
              pathname === "/user-profile" ? isActiveStyle : isNotActiveStyle
            }
            onClick={() => {
              handleCloseSidebar();
            }}
          >
            <FaAddressCard size={18} />
            User profile
          </Link>

          <Link
            href="/about"
            className={pathname === "/about" ? isActiveStyle : isNotActiveStyle}
            onClick={() => {
              handleCloseSidebar();
            }}
          >
            <FaCircleExclamation size={18} />
            About
          </Link>

          <Link
            href="/policy-guidelines"
            className={
              pathname === "/policy-guidelines"
                ? isActiveStyle
                : isNotActiveStyle
            }
            onClick={() => {
              handleCloseSidebar();
            }}
          >
            <MdPolicy size={20} />
            Policy Guidelines
          </Link>
          <Link
            href="/hod-comment"
            className={
              pathname === "/hod-comment" ? isActiveStyle : isNotActiveStyle
            }
            onClick={() => {
              handleCloseSidebar();
            }}
          >
            <FaCommentDots size={18} />
            HOD Comment
          </Link>

          <Link
            href="/recommendation"
            className={
              pathname === "/recommendation" ? isActiveStyle : isNotActiveStyle
            }
            onClick={() => {
              handleCloseSidebar();
            }}
          >
            <MdRecommend size={20} />
            Recommendation
          </Link>

          <Link
            href="/users"
            className={pathname === "/users" ? isActiveStyle : isNotActiveStyle}
            onClick={() => {
              handleCloseSidebar();
            }}
          >
            <FaUserShield size={20} />
            Users
          </Link>

          <Link
            href="/employees"
            className={
              pathname === "/employees" ? isActiveStyle : isNotActiveStyle
            }
            onClick={() => {
              handleCloseSidebar();
            }}
          >
            <FaUsers size={20} />
            Employees
          </Link>

          <Link
            href="/configurations"
            className={
              pathname === "/configurations" ? isActiveStyle : isNotActiveStyle
            }
            onClick={() => {
              handleCloseSidebar();
            }}
          >
            <IoSettings size={20} />
            Configurations
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

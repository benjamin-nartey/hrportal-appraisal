"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { FaAddressCard, FaCommentDots } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";
import { HiDocumentReport } from "react-icons/hi";
import { IoSettings } from "react-icons/io5";
import {
  MdDashboard,
  MdEmail,
  MdPolicy,
  MdRecommend,
  MdSummarize,
} from "react-icons/md";

const Sidebar = ({ closeToggle }: SetStateProps<boolean>) => {
  const [activeLink, setActiveLink] = useState("");

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  const isNotActiveStyle =
    "px-5 py-2 flex items-center text-white gap-3 w-full hover:bg-[#b430bb] hover:text-black hover:font-semibold transition-all duration-200 ease-in-out capitalize";

  const isActiveStyle =
    "px-5 py-2 flex items-center text-black gap-3 bg-[#D09EE8] font-bold w-full transition-all duration-200 ease-in-out capitalize";

  //   const isNotActiveStyle: React.CSSProperties = {
  //     padding: "0.5rem 1rem",
  //     display: "flex",
  //     alignItems: "center",
  //     color: "white",
  //     gap: "0.75rem",
  //     width: "100%",
  //     transition: "background-color 0.2s, color 0.2s, font-weight 0.2s",
  //     textTransform: "capitalize",
  //   };

  //   const isActiveStyle: React.CSSProperties = {
  //     padding: "0.5rem 1rem",
  //     display: "flex",
  //     alignItems: "center",
  //     color: "#0E1B39",
  //     gap: "0.75rem",
  //     backgroundColor: "#e2d5d5",
  //     fontWeight: "bold",
  //     width: "100%",
  //     transition: "background-color 0.2s, color 0.2s, font-weight 0.2s",
  //     textTransform: "capitalize",
  //   };

  return (
    <div
      style={{
        minWidth: "220px",
        // backgroundImage: "url(/cocoa.jpg)",
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
              activeLink === "dashboard" ? isActiveStyle : isNotActiveStyle
            }
            onClick={() => {
              setActiveLink("dashboard");
              handleCloseSidebar();
            }}
          >
            <MdDashboard size={18} />
            Dashboard
          </Link>

          <Link
            href="/user-profile"
            className={
              activeLink === "profile" ? isActiveStyle : isNotActiveStyle
            }
            onClick={() => {
              setActiveLink("profile");
              handleCloseSidebar();
            }}
          >
            <FaAddressCard size={18} />
            User profile
          </Link>

          <Link
            href="/about"
            className={
              activeLink === "about" ? isActiveStyle : isNotActiveStyle
            }
            onClick={() => {
              setActiveLink("about");
              handleCloseSidebar();
            }}
          >
            <FaCircleExclamation size={18} />
            About
          </Link>

          <Link
            href="/policy-guidelines"
            className={
              activeLink === "policy" ? isActiveStyle : isNotActiveStyle
            }
            onClick={() => {
              setActiveLink("policy");
              handleCloseSidebar();
            }}
          >
            <MdPolicy size={20} />
            Policy Guidelines
          </Link>
          <Link
            href="/hod-comment"
            className={
              activeLink === "hod-comment" ? isActiveStyle : isNotActiveStyle
            }
            onClick={() => {
              setActiveLink("hod-comment");
              handleCloseSidebar();
            }}
          >
            <FaCommentDots size={18} />
            HOD Comment
          </Link>
          <Link
            href="/recommendation"
            className={
              activeLink === "recommendation" ? isActiveStyle : isNotActiveStyle
            }
            onClick={() => {
              setActiveLink("recommendation");
              handleCloseSidebar();
            }}
          >
            <MdRecommend size={20} />
            Recommendation
          </Link>
          <Link
            href="/dept-reports"
            className={
              activeLink === "dept-reports" ? isActiveStyle : isNotActiveStyle
            }
            onClick={() => {
              setActiveLink("dept-reports");
              handleCloseSidebar();
            }}
          >
            <HiDocumentReport size={20} />
            Dept. Reports
          </Link>
          <Link
            href="/send-mail-alerts"
            className={
              activeLink === "send-mail-alerts"
                ? isActiveStyle
                : isNotActiveStyle
            }
            onClick={() => {
              setActiveLink("send-mail-alerts");
              handleCloseSidebar();
            }}
          >
            <MdEmail size={20} />
            Send Email Alerts
          </Link>

          <Link
            href="/summary-reports"
            className={
              activeLink === "summary-reports"
                ? isActiveStyle
                : isNotActiveStyle
            }
            onClick={() => {
              setActiveLink("summary-reports");
              handleCloseSidebar();
            }}
          >
            <MdSummarize size={20} />
            Summary Reports
          </Link>

          <Link
            href="/configurations"
            className={
              activeLink === "summary-reports"
                ? isActiveStyle
                : isNotActiveStyle
            }
            onClick={() => {
              setActiveLink("summary-reports");
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

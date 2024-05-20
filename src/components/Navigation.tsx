"use client";

import { Fragment, useState } from "react";
import Sidebar from "./Sidabar";
import { AiFillCloseCircle, AiOutlinePoweroff } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { getRandomColor } from "@/lib/getRandomColor";
import { getContrastingColor } from "@/lib/getContrastingColor";
import { usePathname } from "next/navigation";

export default function Navigation({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [toggleLogout, setToggleLogout] = useState(false);
  const [avatarBackground] = useState(getRandomColor());
  const [avatarText] = useState(getContrastingColor(avatarBackground));

  const Pathname = usePathname();

  return (
    <Fragment>
      <div className="absolute right-8 top-16 z-[99]">
        {toggleLogout && (
          <button className="px-4 py-2 z-50 bg-white rounded-md text-base font-medium lg:flex items-center justify-center gap-2 hidden">
            <AiOutlinePoweroff size={18} /> Logout
          </button>
        )}
      </div>
      <div className="flex lg:flex-row bg-[#f4e7ed] flex-col min-h-screen transition-height duration-75 ease-out overflow-hidden">
        <div className="lg:flex flex-initial h-screen hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-primary">
          <Sidebar />
        </div>
        <div className="main-content-column bg-[#eaf0fd] h-screen w-full overflow-y-auto overflow-x-hidden">
          <div className="flex w-full justify-between items-center sticky top-0 z-10 bg-primary text-white">
            <div className="w-full relative h-full p-5">
              <div className="w-full flex justify-between items-center">
                <div className=" text-white p-2">
                  <span className="text-inherit capitalize">
                    {Pathname.replace(/\//g, "").replace(/-/g, " ")}
                  </span>
                </div>

                <HiMenu
                  onClick={() => setToggleSidebar(true)}
                  className="text-[25px] text-white cursor-pointer lg:hidden block"
                />

                <div className="lg:block hidden">
                  <div className="flex items-center lg:gap-4 gap-2">
                    <div
                      style={{
                        backgroundColor: `${avatarBackground}`,
                        color: `${avatarText}`,
                      }}
                      className={`w-10 h-10 text-center lg:text-base text-sm rounded-full grid place-items-center font-bold uppercase`}
                    >
                      B
                    </div>

                    <div className="flex flex-col ">
                      <div className="text-[14px] ">Benjamin Nartey</div>
                      <div className="text-xs text-white/75">
                        benjamin.nartey@gmail.com
                      </div>
                    </div>
                    <div>
                      <button onClick={() => setToggleLogout(!toggleLogout)}>
                        <MdOutlineKeyboardArrowDown size={24} color="#fff" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-6 min-h-screen bg-white">{children}</div>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-primary h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2 z-20">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer text-white "
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
    </Fragment>
  );
}

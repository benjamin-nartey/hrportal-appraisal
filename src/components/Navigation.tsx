"use client";

import { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidabar";
import { AiFillCloseCircle, AiOutlinePoweroff } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { getRandomColor } from "@/lib/getRandomColor";
import { getContrastingColor } from "@/lib/getContrastingColor";
import { usePathname } from "next/navigation";

interface NavigationProps {
  userData: UserProps | null;
  children: React.ReactNode;
}

export default function Navigation({ userData, children }: NavigationProps) {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [toggleLogout, setToggleLogout] = useState(false);
  const [avatarBackground, setAvatarBackground] = useState("#958254");
  const [avatarText, setAvatarText] = useState("#000");

  useEffect(() => {
    const background = getRandomColor();
    setAvatarBackground(background);
    setAvatarText(getContrastingColor(background));
  }, []);

  const Pathname = usePathname();

  const user = userData?.User;

  return (
    <Fragment>
      <div className="absolute right-8 top-16 z-[99]">
        {toggleLogout && (
          <button className="px-4 py-2 z-50 bg-white rounded-md text-base font-medium lg:flex items-center justify-center gap-2 hidden">
            <AiOutlinePoweroff size={18} /> Logout
          </button>
        )}
      </div>
      <div className="flex lg:flex-row bg-[#fff] flex-col min-h-screen transition-height duration-75 ease-out overflow-hidden">
        <div className="lg:flex flex-initial h-screen hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-primary">
          <Sidebar />
        </div>
        <div className="main-content-column bg-[#fff] h-screen w-full overflow-y-auto overflow-x-hidden scrollbar-hide">
          <div className="flex border-l-0 lg:border-l border-l-gray-300 w-full justify-between items-center sticky top-0 z-10 bg-primary text-white">
            <div className="w-full relative h-full p-5">
              <div className="w-full flex justify-between items-center">
                <div className=" text-white p-2">
                  <span className="text-inherit capitalize">
                    {Pathname.replace(/\//g, "").replace(/-/g, " ")}
                  </span>
                </div>

                {!toggleSidebar && (
                  <HiMenu
                    onClick={() => setToggleSidebar((prev) => !prev)}
                    className="text-[25px] text-white cursor-pointer lg:hidden block"
                  />
                )}

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
                      <div className="text-[14px] ">{user?.name}</div>
                      <div className="text-xs text-white/75">{user?.email}</div>
                    </div>
                    <div>
                      <button
                        name="toggle-logout"
                        onClick={() => setToggleLogout(!toggleLogout)}
                      >
                        <MdOutlineKeyboardArrowDown size={24} color="#fff" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-white ">{children}</div>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-primary h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2 z-20">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer text-white "
                onClick={() => setToggleSidebar((prev) => !prev)}
              />
            </div>
            <Sidebar closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
    </Fragment>
  );
}

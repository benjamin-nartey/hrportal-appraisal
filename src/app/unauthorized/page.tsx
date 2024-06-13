import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Unauthorized",
  description:
    "This is an unauthorized page, you have no permission to view this page",
};

export default function Unauthorized() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="flex justify-center items-center gap-[30px]">
        <h1 className="inline-block text-[24px] font-medium ">401</h1>
        <div className="w-[1px] h-[49px] bg-white/60"></div>
        <h2 className="text-[14px] font-normal">Unauthorized</h2>
      </div>
    </div>
  );
}

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile",
  description: "This is cocobod appraisal User Profile page",
};

import ProfileCard from "@/components/ProfileCard";

export default function page() {
  return (
    <div className=" flex justify-center items-center  lg:p-12 px-2 py-4 ">
      <ProfileCard />
    </div>
  );
}

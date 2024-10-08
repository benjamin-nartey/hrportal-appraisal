export const dynamic = "force-dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile",
  description: "This is cocobod appraisal User Profile page",
};

import ProfileCard from "@/components/ProfileCard";
import { refreshTokenAndFetchUser } from "@/lib/refreshTokenAndFetchUser";

export default async function UserProfile() {
  const { userData } = await refreshTokenAndFetchUser();

  return (
    <div className=" flex justify-center items-center  lg:p-12 px-2 py-4 ">
      <ProfileCard userData={userData} />
    </div>
  );
}

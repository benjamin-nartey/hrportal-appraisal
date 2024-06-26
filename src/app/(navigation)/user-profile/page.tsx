import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile",
  description: "This is cocobod appraisal User Profile page",
};

import ProfileCard from "@/components/ProfileCard";
import { fetchUser } from "@/lib/fetchUser";
import { cookies } from "next/headers";

export default async function UserProfile() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.error("Token not found in cookies");
    return <div>Token not found</div>;
  }

  const userData = await fetchUser<UserProps>(
    "http://localhost:8000/user",
    token
  );

  return (
    <div className=" flex justify-center items-center  lg:p-12 px-2 py-4 ">
      <ProfileCard userData={userData} />
    </div>
  );
}

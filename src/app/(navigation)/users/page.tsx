export const dynamic = "force-dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
  description: "This is cocobod appraisal Users page",
};

import { refreshTokenAndFetchAllUsers } from "@/lib/refreshTokenAndFetchUsers";

import UsersPage from "./UsersPage";

export default async function Users() {
  const { usersData, tokenData } = await refreshTokenAndFetchAllUsers();

  return (
    <div className="container mx-auto lg:p-12 p-2">
      <UsersPage users={usersData.Users} tokenData={tokenData} />
    </div>
  );
}

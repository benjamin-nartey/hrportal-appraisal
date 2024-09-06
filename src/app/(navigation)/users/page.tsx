import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
  description: "This is cocobod appraisal Users page",
};

import { refreshTokenAndFetchAllUsers } from "@/lib/refreshTokenAndFetchUsers";

import { columns } from "./columns";
import { DataTable } from "../../../components/data-table";
import { NextRequest, NextResponse } from "next/server";

export default async function Users(request: NextRequest) {
  try {
    const { usersData } = await refreshTokenAndFetchAllUsers();

    const users = usersData.Users;

    return (
      <div className="container mx-auto lg:p-12 p-2">
        <DataTable columns={columns} data={users} />
      </div>
    );
  } catch (error) {
    return NextResponse.redirect(new URL("unauthorized", request.url));
  }
}

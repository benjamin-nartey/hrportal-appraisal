import { NextResponse } from "next/server";
import { fetchUser } from "./lib/fetchUser";
import { getCookie } from "./lib/getCookie";

export async function middleware(request: Request) {
  const cookie = request.headers.get("cookie");

  const token = getCookie(cookie);

  const data = await fetchUser<UserProps>("http://localhost:8000/user", token);

  console.log(
    data.User.role.map((roleData) =>
      roleData.rolePermissions.map(
        (permissionData) => permissionData.permission.name
      )
    )
  );

  console.log("middleware applied");

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/about",
    "/dashboard",
    "/hod-comment",
    "/policy-guidelines",
    "/recommendation",
    "/user-profile",
  ],
};

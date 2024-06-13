import { NextRequest, NextResponse } from "next/server";
import { fetchUser } from "./lib/fetchUser";
import { getCookie } from "./lib/getCookie";
import { PERMISSIONS } from "./lib/const/permissions";

export async function middleware(request: NextRequest) {
  const cookie = request.headers.get("cookie");

  const token = getCookie(cookie);

  const data = await fetchUser<UserProps>("http://localhost:8000/user", token);

  const permissions = data.User?.role.map((roleData) =>
    roleData.rolePermissions.map(
      (permissionData) => permissionData.permission.name
    )
  );

  if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    permissions?.length > 0 &&
    permissions[0]?.includes(PERMISSIONS.READ_ALL_USERS)
  ) {
    return NextResponse.next();
  } else if (
    request.nextUrl.pathname.startsWith("/about") &&
    permissions?.length > 0 &&
    permissions[0].includes(PERMISSIONS.READ_ALL_USERS)
  ) {
    return NextResponse.next();
  }

  console.log("middleware applied");

  // return NextResponse.next();
  return NextResponse.redirect(new URL("unauthorized", request.url));
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

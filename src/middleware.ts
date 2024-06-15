import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./lib/getCookie";
import { fetchUser } from "./lib/fetchUser";
import { getNewToken } from "./lib/getNewToken";
import { PERMISSIONS } from "./lib/const/permissions";

export async function middleware(resquest: NextRequest) {
  const cookie = resquest.headers.get("cookie");
  const token = getCookie(cookie);

  if (!token) {
    console.log("No token found in cookies");
    return NextResponse.redirect(new URL("unauthorized", resquest.url));
  }

  let data: UserProps | AccessTokenExpired;

  let tokenData;

  try {
    data = await fetchUser<UserProps | AccessTokenExpired>(
      "http://localhost:8000/user",
      token
    );
  } catch (error) {
    console.log("Failed to fetch user:", error);
    return NextResponse.redirect(new URL("unauthorized", resquest.url));
  }

  if (!("User" in data)) {
    if (data.error === "Not Authorized") {
      try {
        tokenData = await getNewToken<AccessTokenProps>(
          "http://localhost:8000/refresh"
        );

        data = await fetchUser<UserProps | AccessTokenExpired>(
          "http://localhost:8000/user",
          tokenData?.accessToken
        );
      } catch (error) {
        console.error(
          "Failed to refresh token or fetch user with new token:",
          error
        );

        return NextResponse.redirect(new URL("unauthorized", resquest.url));
      }
    } else {
      return NextResponse.redirect(new URL("unauthorized", resquest.url));
    }
  }

  const userData = data as UserProps;

  const permissions = userData.User?.role.flatMap((roleData) =>
    roleData.rolePermissions.map(
      (permissionData) => permissionData.permission.name
    )
  );

  if (
    resquest.nextUrl.pathname.startsWith("/dashboard") &&
    permissions?.includes(PERMISSIONS.READ_ALL_USERS)
  ) {
    return NextResponse.next();
  } else if (
    resquest.nextUrl.pathname.startsWith("/about") &&
    permissions?.includes(PERMISSIONS.READ_ALL_USERS)
  ) {
    return NextResponse.next();
  } else if (
    resquest.nextUrl.pathname.startsWith("/user-profile") &&
    permissions?.includes(PERMISSIONS.READ_ALL_USERS)
  ) {
    return NextResponse.next();
  }

  console.log("User do not have the required permissions");
  return NextResponse.redirect(new URL("unauthorized", resquest.url));
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

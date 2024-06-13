import { NextRequest, NextResponse } from "next/server";
import { fetchUser } from "./lib/fetchUser";
import { getCookie } from "./lib/getCookie";
import { PERMISSIONS } from "./lib/const/permissions";
import { getNewToken } from "./lib/getNewToken";

export async function middleware(request: NextRequest) {
  const cookie = request.headers.get("cookie");
  const token = getCookie(cookie);

  if (!token) {
    console.log("No token found in cookies");
    return NextResponse.redirect(new URL("unauthorized", request.url));
  }

  let data: UserProps | AccessTokenExpired;

  try {
    data = await fetchUser<UserProps | AccessTokenExpired>(
      "http://localhost:8000/user",
      token
    );
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return NextResponse.redirect(new URL("unauthorized", request.url));
  }

  if (!("User" in data)) {
    if (data.error === "Not Authorized") {
      try {
        const tokenData = await getNewToken<TokenProps>(
          "http://localhost:8000/refresh"
        );

        data = await fetchUser<UserProps | AccessTokenExpired>(
          "http://localhost:8000/user",
          tokenData.token
        );
      } catch (error) {
        console.error(
          "Failed to refresh token or fetch user with new token:",
          error
        );
        return NextResponse.redirect(new URL("unauthorized", request.url));
      }
    } else {
      return NextResponse.redirect(new URL("unauthorized", request.url));
    }
  }

  const userData = data as UserProps;

  const permissions = userData.User?.role.flatMap((roleData) =>
    roleData.rolePermissions.map(
      (permissionData) => permissionData.permission.name
    )
  );

  if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    permissions?.includes(PERMISSIONS.READ_ALL_USERS)
  ) {
    return NextResponse.next();
  } else if (
    request.nextUrl.pathname.startsWith("/about") &&
    permissions?.includes(PERMISSIONS.READ_ALL_USERS)
  ) {
    return NextResponse.next();
  }

  console.log("User does not have the required permissions");
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

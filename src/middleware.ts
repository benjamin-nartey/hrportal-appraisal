import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "./lib/getCookie";
import { fetchUser } from "./lib/fetchUser";
import { getNewToken } from "./lib/getNewToken";
import { PERMISSIONS } from "./lib/const/permissions";

async function fetchUserData(
  token: string
): Promise<UserProps | AccessTokenExpired> {
  try {
    return await fetchUser<UserProps | AccessTokenExpired>(
      "http://localhost:8000/user",
      token
    );
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Unauthorized");
  }
}

async function refreshTokenAndFetchUser(): Promise<UserProps> {
  try {
    const tokenData = await getNewToken<AccessTokenProps>(
      "http://localhost:8000/refresh"
    );
    if (!tokenData?.accessToken) {
      throw new Error("Failed to refresh token");
    }
    const data = await fetchUser<UserProps>(
      "http://localhost:8000/user",
      tokenData.accessToken
    );
    return data;
  } catch (error) {
    console.error(
      "Failed to refresh token or fetch user with new token:",
      error
    );
    throw new Error("Unauthorized");
  }
}

function checkPermissions(
  permissions: string[],
  requiredPermission: string
): boolean {
  return permissions.includes(requiredPermission);
}

export async function middleware(request: NextRequest) {
  const cookie = request.headers.get("cookie");
  const token = getCookie(cookie);

  if (!token) {
    console.log("No token found in cookies");
    return NextResponse.redirect(new URL("unauthorized", request.url));
  }

  let data: UserProps | AccessTokenExpired;

  try {
    data = await fetchUserData(token);
  } catch {
    return NextResponse.redirect(new URL("unauthorized", request.url));
  }

  if (!("User" in data)) {
    if (data.error === "Not Authorized") {
      try {
        data = await refreshTokenAndFetchUser();
      } catch (error) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } else {
      return NextResponse.redirect(new URL("unauthorized", request.url));
    }
  }

  const userData = data as UserProps;

  const permissions =
    userData.User?.role.flatMap((roleData) =>
      roleData.rolePermissions.map(
        (permissionData) => permissionData.permission.name
      )
    ) ?? [];

  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/dashboard") &&
    checkPermissions(permissions, PERMISSIONS.GET_DASHBOARD)
  ) {
    return NextResponse.next();
  } else if (
    pathname.startsWith("/about") &&
    checkPermissions(permissions, PERMISSIONS.GET_ABOUT)
  ) {
    return NextResponse.next();
  } else if (
    pathname.startsWith("/user-profile") &&
    checkPermissions(permissions, PERMISSIONS.READ_USER)
  ) {
    return NextResponse.next();
  } else if (
    pathname.startsWith("/policy-guidelines") &&
    checkPermissions(permissions, PERMISSIONS.GET_POLICY_GUIDELINES)
  ) {
    return NextResponse.next();
  } else if (
    pathname.startsWith("/hod-comment") &&
    checkPermissions(permissions, PERMISSIONS.MAKE_HOD_COMMENT)
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

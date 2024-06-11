import { NextResponse } from "next/server";
import { fetchUser } from "./lib/fetchUser";
import { cookies } from "next/headers";

export async function middleware(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const data = await fetchUser<UserProps>("http://localhost:8000/user", token);
  console.log(data);

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

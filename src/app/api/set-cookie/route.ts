import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  try {
    const { token, refreshToken } = await req.json();

    const response = NextResponse.json({ message: "Cookies set successfully" });

    // Serialize both cookies
    const tokenCookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "strict",
      path: "/",
    });

    const refreshTokenCookie = serialize("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 1 month
      sameSite: "strict",
      path: "/",
    });

    // Set both cookies in the header
    response.headers.set("Set-Cookie", `${tokenCookie}, ${refreshTokenCookie}`);

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to set cookies" },
      { status: 500 }
    );
  }
}

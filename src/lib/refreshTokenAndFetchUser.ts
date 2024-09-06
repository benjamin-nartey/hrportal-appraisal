import { cookies } from "next/headers";
import { getNewToken } from "./getNewToken";
import { fetchUser } from "./fetchUser";

export async function refreshTokenAndFetchUser(): Promise<{
  userData: UserProps;
  tokenData: AccessTokenProps;
}> {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value as string;

    const tokenData = await getNewToken<AccessTokenProps>(
      `http://localhost:8000/refresh/${refreshToken}`
    );

    if (!tokenData?.token) {
      throw new Error("Failed to refresh token");
    }

    const userData = await fetchUser<UserProps>(
      "http://localhost:8000/user",
      tokenData.token
    );

    return { userData, tokenData };
  } catch (error) {
    console.error(
      "Failed to refresh token or fetch user with new token:",
      error
    );
    throw new Error("Unauthorized");
  }
}

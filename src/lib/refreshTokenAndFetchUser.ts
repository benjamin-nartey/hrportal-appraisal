import { cookies } from "next/headers";
import { getNewToken } from "./getNewToken";
import { fetchUser } from "./fetchUser";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function refreshTokenAndFetchUser(): Promise<{
  userData: UserProps;
  tokenData: TokenProps;
}> {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value as string;
    const token = cookieStore.get("token")?.value as string;

    const userData = await fetchUser<UserProps>(`${BASE_URL}/user`, token);

    if (userData?.error === "Not Authorized") {
      const tokenData = await getNewToken<TokenProps>(
        `${BASE_URL}/refresh/${refreshToken}`
      );

      if (!tokenData?.token) {
        throw new Error("Failed to refresh token");
      }

      return { userData, tokenData };
    }

    const tokenData: TokenProps = {
      token,
      refreshToken,
    };

    return { userData, tokenData };
  } catch (error) {
    console.error(
      "Failed to refresh token or fetch user with new token:",
      error
    );
    throw new Error("Unauthorized");
  }
}

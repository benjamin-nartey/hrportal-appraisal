import { cookies } from "next/headers";
import { getNewToken } from "./getNewToken";
import { fetchAllUsers } from "./fetchAllUsers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function refreshTokenAndFetchAllUsers(): Promise<{
  usersData: UsersProps;
  tokenData: AccessTokenProps;
}> {
  try {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value as string;

    const tokenData = await getNewToken<AccessTokenProps>(
      `${BASE_URL}/refresh/${refreshToken}`
    );

    if (!tokenData?.token) {
      throw new Error("Failed to refresh token");
    }

    const usersData = await fetchAllUsers<UsersProps>(
      `${BASE_URL}/all-users`,
      tokenData.token
    );

    return { usersData, tokenData };
  } catch (error) {
    console.error(
      "Failed to refresh token or fetch users with new token:",
      error
    );
    throw new Error("Unauthorized");
  }
}

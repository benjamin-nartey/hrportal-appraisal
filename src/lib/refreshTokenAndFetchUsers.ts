import { cookies } from "next/headers";
import { getNewToken } from "./getNewToken";
import { fetchAllUsers } from "./fetchAllUsers";

export async function refreshTokenAndFetchAllUsers(): Promise<{
  usersData: UsersProps;
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

    const usersData = await fetchAllUsers<UsersProps>(
      "http://localhost:8000/all-users",
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

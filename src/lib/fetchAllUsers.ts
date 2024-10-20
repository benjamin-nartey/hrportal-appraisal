export async function fetchAllUsers<T>(
  url: string,
  token: string | undefined
): Promise<T | any> {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      return await res.json();
    }

    const result: T = await res.json();
    return result;
  } catch (error) {
    throw new Error(`Fetch failed: ${(error as Error).message}`);
  }
}

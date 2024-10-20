export async function fetchAllEmployees<T>(
  url: string,
  token: string | undefined
): Promise<T> {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 401) {
      throw new Error("Not Authorized");
    }

    const result: T = await res.json();
    return result;
  } catch (error) {
    throw new Error(`Fetch failed: ${(error as Error).message}`);
  }
}

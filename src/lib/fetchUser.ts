export async function fetchUser<T>(
  url: string,
  token: string | undefined
): Promise<T> {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result: T = await res.json();
  return result;
}

export async function getNewToken<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const result: T = await res.json();
  return result;
}

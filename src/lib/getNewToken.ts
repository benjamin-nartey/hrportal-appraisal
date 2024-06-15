export async function getNewToken<T>(url: string): Promise<T | null> {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    console.error(`Error fetching new token: ${res.statusText}`);
    return null;
  }

  const result: T = await res.json();

  return result;
}

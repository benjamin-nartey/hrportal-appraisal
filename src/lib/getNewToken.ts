export async function getNewToken<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
    });

    if (!res.ok) {
      console.error(`Error fetching new token: ${res.statusText}`);
      return null;
    }

    try {
      const result: T = await res.json();

      return result;
    } catch (jsonError) {
      console.error("Error parsing JSON response:", jsonError);
      return null;
    }
  } catch (error) {
    console.error("Network error:", error);
    return null;
  }
}

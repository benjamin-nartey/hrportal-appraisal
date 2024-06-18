// export async function getNewToken<T>(url: string): Promise<T | null> {
//   const res = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//   });

//   if (!res.ok) {
//     console.error(`Error fetching new token: ${res.statusText}`);
//     return null;
//   }

//   const result: T = await res.json();

//   return result;
// }

export async function getNewToken<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Ensure cookies are included in the request
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

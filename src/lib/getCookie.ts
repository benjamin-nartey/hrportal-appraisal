export function getCookie(cookie: string | null) {
  let token = null;

  if (cookie) {
    const tokenMatch = cookie.match(/token=([^;]+)/);
    if (tokenMatch) {
      token = tokenMatch[1];
      return token;
    }
  }
}

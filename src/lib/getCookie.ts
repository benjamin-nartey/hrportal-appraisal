export function getCookie(cookie: string | null, cookieType: string) {
  let token = null;
  let refreshToken = null;

  if (cookie) {
    if (cookieType === "token") {
      const tokenMatch = cookie.match(/token=([^;]+)/);
      if (tokenMatch) {
        token = tokenMatch[1];
        return token;
      }
    } else if (cookieType === "refreshToken") {
      const refreshTokenMatch = cookie.match(/refreshToken=([^;]+)/);
      if (refreshTokenMatch) {
        token = refreshTokenMatch[1];
        return refreshToken;
      }
    }
  }
}

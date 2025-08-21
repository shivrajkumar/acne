import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN_COOKIE = "ACCESS_TOKEN";
const REFRESH_TOKEN_COOKIE = "REFRESH_TOKEN";
const USER_STORAGE_KEY = "user";

export const TokenManager = {
  setTokens: (accessToken, accessTokenExpiry) => {
    // Store encoded JSON (token + expiry)
    const payload = { accessToken, accessTokenExpiry };
    Cookies.set(ACCESS_TOKEN_COOKIE, btoa(JSON.stringify(payload)), {
      expires: accessTokenExpiry, // cookie expiry
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // const refreshPayload = { refreshToken, refreshTokenExpiry };
    // Cookies.set(REFRESH_TOKEN_COOKIE, btoa(JSON.stringify(refreshPayload)), {
    //   expires: refreshTokenExpiry,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    // });
  },

  getAccessToken: () => {
    const cookie = Cookies.get(ACCESS_TOKEN_COOKIE);
    if (!cookie) return null;

    try {
      const decoded = JSON.parse(atob(cookie)); // decode back into object
      return decoded.accessToken;
    } catch {
      return null;
    }
  },

  getAccessTokenExpiry: () => {
    const cookie = Cookies.get(ACCESS_TOKEN_COOKIE);
    if (!cookie) return null;

    try {
      const decoded = JSON.parse(atob(cookie));
      return decoded.accessTokenExpiry;
    } catch {
      return null;
    }
  },

  getRefreshToken: () => {
    const cookie = Cookies.get(REFRESH_TOKEN_COOKIE);
    if (!cookie) return null;

    try {
      const decoded = JSON.parse(atob(cookie));
      return decoded.refreshToken;
    } catch {
      return null;
    }
  },

  isAccessTokenExpired: (token) => {
    if (!token) return true;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp ? decoded.exp < currentTime : true;
    } catch {
      return true;
    }
  },

  clearTokens: () => {
    Cookies.remove(ACCESS_TOKEN_COOKIE);
    Cookies.remove(REFRESH_TOKEN_COOKIE);
    localStorage.removeItem(USER_STORAGE_KEY);
  },
};

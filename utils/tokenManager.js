import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN_COOKIE = "ACCESS_TOKEN";
const REFRESH_TOKEN_COOKIE = "REFRESH_TOKEN";
const USER_STORAGE_KEY = "user";

export const TokenManager = {
  setTokens: (accessToken, accessTokenExpiry) => {
    Cookies.set(ACCESS_TOKEN_COOKIE, accessToken, {
      expires: accessTokenExpiry,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // if (refreshToken) {
    //   Cookies.set(REFRESH_TOKEN_COOKIE, refreshToken, {
    //     expires: refreshTokenExpiry,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "strict",
    //   });
    // }
  },

  getAccessToken: () => {
    return Cookies.get(ACCESS_TOKEN_COOKIE);
  },

  getRefreshToken: () => {
    return Cookies.get(REFRESH_TOKEN_COOKIE);
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

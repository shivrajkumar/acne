import { REFRESH_TOKEN_API } from "@/constants/urls";
import { TokenManager } from "@/utils/tokenManager";
import { env } from "next-runtime-env";
import Cookies from "js-cookie";
import { fetchThumbprint } from "./thumbmark";

const SECURITY_TOKEN = env("NEXT_PUBLIC_API_TOKEN");

// Default headers to support pre-flight requests
const DEFAULT_OPTIONS = {
  headers: {
    "Content-Type": "application/json",
    "x-tenant-id": "acne",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With, x-tenant-id, x-access-token",
    "Access-Control-Allow-Credentials": "true",
  },
};

const storedFingerPrint = Cookies.get("DEVICE_FP");

export const fetchRequest = async (url, options = { method: "GET" }, token) => {
  let data = {};
  let status = "";
  const isFormData = options.body instanceof FormData;

  try {
    // Handle OPTIONS pre-flight request
    if (options.method === "OPTIONS") {
      return {
        data: null,
        hasError: false,
        status: 200,
      };
    }

    const _options = {
      ...options,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        "x-tenant-id": "traya",
        "x-tenant-id": "acne",
        "x-access-token": `e2623576-930b-48b6-81e2-a3cb5e37f47d`,
        "Accept-Encoding": " br, gzip, deflate",
        ...options.headers,
      },
    };

    const _res = await fetch(url, _options);
    status = _res.status;
    const contentType = _res.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      data = await _res.json();
    }
  } catch (error) {
    console.warn(error.message);
  } finally {
    return {
      data,
      hasError: !(status === 200),
      status,
    };
  }
};

export const fetchRequestWithoutAuth = async (url, options = {}) => {
  let data = null;
  let status = 500;

  try {
    const fingerprint = storedFingerPrint ?? (await fetchThumbprint());

    const _options = {
      ...DEFAULT_OPTIONS,
      ...options,
      headers: {
        ...DEFAULT_OPTIONS.headers,
        ...options.headers,
        "x-fp-id": fingerprint,
      },
      credentials: "include",
    };

    if (options.method === "OPTIONS") {
      return {
        data: null,
        hasError: false,
        status: 200,
        headers: _options.headers,
      };
    }

    const response = await fetch(url, _options);

    status = response.status;
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      data = await response.json();
    }

    return {
      data,
      hasError: status !== 200,
      status,
    };
  } catch (error) {
    console.warn("Fetch error:", error);
    return {
      data: null,
      hasError: true,
      status: 500,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const fetchRequestWithAuth = async (url, options = {}) => {
  let accessToken = TokenManager.getAccessToken();
  let refreshToken = TokenManager.getRefreshToken();
  let data = null;
  let status = 500;

  // Handle token refresh if needed
  if (TokenManager.isAccessTokenExpired(accessToken)) {
    try {
      const refreshResponse = await fetch(REFRESH_TOKEN_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
        credentials: "include",
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshResponse.ok) {
        const { accessToken: newAccessToken, accessTokenExpiry } =
          await refreshResponse.json();

        // Update tokens
        TokenManager.setTokens(newAccessToken, new Date(accessTokenExpiry));

        accessToken = newAccessToken;
      } else {
        throw new Error("Token refresh failed");
      }
    } catch (error) {
      console.warn("Token refresh error:", error);
      return {
        data: null,
        hasError: true,
        status: 401,
        error: "Authentication failed",
      };
    }
  }

  // Handle OPTIONS pre-flight request
  if (options.method === "OPTIONS") {
    return {
      data: null,
      hasError: false,
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-Requested-With, x-tenant-id, x-access-token",
        "Access-Control-Allow-Credentials": "true",
      },
    };
  }

  const authOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
    headers: {
      ...DEFAULT_OPTIONS.headers,
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With, x-tenant-id, x-access-token",
      "Access-Control-Allow-Credentials": "true",
    },
    // Ensure credentials are included for CORS
    credentials: "include",
  };

  try {
    const response = await fetch(url, authOptions);

    status = response.status;
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      data = await response.json();
    }

    return {
      data,
      hasError: status !== 200,
      status,
    };
  } catch (error) {
    console.warn("Fetch error:", error);
    return {
      data: null,
      hasError: true,
      status: 500,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

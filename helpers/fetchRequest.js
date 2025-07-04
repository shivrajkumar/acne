import { REFRESH_TOKEN_API } from "@/constants/urls";
import { TokenManager } from "@/utils/tokenManager";
import { env } from "next-runtime-env";

const SECURITY_TOKEN = env("NEXT_PUBLIC_API_TOKEN");
const DEFAULT_OPTIONS = {
  headers: {
    "Content-Type": "application/json",
    "x-tenant-id": "acne",
  },
};

export const fetchRequest = async (url, options = { method: "GET" }) => {
  let data = {};
  let status = "";
  const isFormData = options.body instanceof FormData;

  try {
    const _options = {
      ...options,
      headers: {
        ...(isFormData
          ? {}
          : {
              "Content-Type": "application/json",
            }),
        "x-tenant-id": "acne",
        "x-access-token": `${SECURITY_TOKEN}`,
      },
    };

    const _res = await fetch(url, _options);

    status = _res.status;
    const contentType = _res.headers.get("content-type");
    if (contentType?.includes("application/json")) data = await _res.json();
  } catch (error) {
    console.warn(error.message);
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return { data, hasError: !(status === 200), status };
  }
};

export const fetchRequestWithoutAuth = async (url, options = {}) => {
  let data = null;
  let status = 500;

  try {
    const _options = {
      ...DEFAULT_OPTIONS,
      ...options,
      headers: {
        ...DEFAULT_OPTIONS.headers,
        ...options.headers,
      },
    };

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

  if (TokenManager.isAccessTokenExpired(accessToken)) {
    try {
      const refreshResponse = await fetch(REFRESH_TOKEN_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

  const authOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
    headers: {
      ...DEFAULT_OPTIONS.headers,
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
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

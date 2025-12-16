import { REFRESH_TOKEN_API } from "@/constants/urls";
import { TokenManager } from "@/utils/tokenManager";
import { env } from "next-runtime-env";
import Cookies from "js-cookie";
import { fetchThumbprint } from "./thumbmark";
import { getThumbmark } from "@thumbmarkjs/thumbmarkjs";
import { fetchWithRetry, RETRY_CONFIG } from "@/utils/retryFetch.js";
import { getTimeout, TIMEOUTS } from "@/utils/requestTimeout.js";
import { cache, CACHE_KEYS, CACHE_TTL } from "@/utils/cacheManager.js";

const SECURITY_TOKEN = env("NEXT_PUBLIC_API_TOKEN");

// Default headers (removed client-side CORS headers as they should only be server-side)
const DEFAULT_OPTIONS = {
  headers: {
    "Content-Type": "application/json",
    "x-tenant-id": "acne",
  },
};

const storedFingerPrint = Cookies.get("DEVICE_FP");

// Helper function to fetch IP address with caching
const fetchIpAddress = async () => {
  // Check cache first
  const cachedIp = cache.get(CACHE_KEYS.IP_ADDRESS);
  if (cachedIp) {
    return cachedIp;
  }

  try {
    const response = await fetchWithRetry("/api/ip", {}, {
      maxAttempts: 2,
      baseDelay: 500
    });
    const result = await response.json();
    if (result.success) {
      const ip = result.data?.ip || "";
      cache.set(CACHE_KEYS.IP_ADDRESS, ip, CACHE_TTL.IP_ADDRESS);
      return ip;
    }
    return "";
  } catch (error) {
    console.warn("Error fetching IP address:", error);
    return "";
  }
};

// Helper function to get thumbmark with caching
const getThumbmarkValue = async () => {
  // Check cache first
  const cachedThumbmark = cache.get(CACHE_KEYS.FINGERPRINT);
  if (cachedThumbmark) {
    return cachedThumbmark;
  }

  try {
    const tm = await getThumbmark();
    const thumbmark = tm?.thumbmark || tm || "";
    cache.set(CACHE_KEYS.FINGERPRINT, thumbmark, CACHE_TTL.FINGERPRINT);
    return thumbmark;
  } catch (error) {
    console.warn("Error getting thumbmark:", error);
    return "";
  }
};

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

    // Fetch IP and thumbmark values (now cached)
    const [ipAddress, thumbmark] = await Promise.all([
      fetchIpAddress(),
      getThumbmarkValue()
    ]);

    const _options = {
      ...options,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        "x-tenant-id": "acne",
        "x-access-token": `e2623576-930b-48b6-81e2-a3cb5e37f47d`,
        // Removed Accept-Encoding to avoid issues with mobile proxies
        "x-ip-address": ipAddress,
        "x-fp-id": thumbmark,
        ...options.headers,
      },
    };

    // Use fetchWithRetry for automatic retries and better mobile handling
    const _res = await fetchWithRetry(url, _options, {
      maxAttempts: RETRY_CONFIG.MAX_ATTEMPTS,
      baseDelay: RETRY_CONFIG.BASE_DELAY,
    });

    status = _res.status;
    const contentType = _res.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      data = await _res.json();
    }
  } catch (error) {
    console.warn(error.message);
    // Return error status for timeout errors
    if (error.message.includes('timeout')) {
      status = 408;
    }
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

    // Use fetchWithRetry for better mobile handling
    const response = await fetchWithRetry(url, _options, {
      maxAttempts: 2, // Fewer retries for non-auth requests
      baseDelay: 500,
    });

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
      status: error.message.includes('timeout') ? 408 : 500,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const fetchRequestWithAuth = async (url, options = {}) => {
  let accessToken = TokenManager.getAccessToken();
  let refreshToken = TokenManager.getRefreshToken();
  let data = null;
  let status = 500;

  // Fetch IP and thumbmark values (now cached)
  const [ipAddress, thumbmark] = await Promise.all([
    fetchIpAddress(),
    getThumbmarkValue()
  ]);

  // Handle token refresh if needed
  if (TokenManager.isAccessTokenExpired(accessToken)) {
    try {
      const refreshResponse = await fetchWithRetry(REFRESH_TOKEN_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ refreshToken }),
      }, {
        maxAttempts: 2,
        baseDelay: 500,
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

  // Handle OPTIONS pre-flight request (removed client-side CORS headers)
  if (options.method === "OPTIONS") {
    return {
      data: null,
      hasError: false,
      status: 200,
    };
  }

  const authOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
    headers: {
      ...DEFAULT_OPTIONS.headers,
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      "x-ip-address": ipAddress,
      "x-fp-id": thumbmark,
    },
    credentials: "include",
  };

  try {
    // Use fetchWithRetry for automatic retries and better mobile handling
    const response = await fetchWithRetry(url, authOptions, {
      maxAttempts: RETRY_CONFIG.MAX_ATTEMPTS,
      baseDelay: RETRY_CONFIG.BASE_DELAY,
    });

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
      status: error.message.includes('timeout') ? 408 : 500,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

/**
 * Request timeout wrapper using AbortController
 * Helps prevent requests from hanging indefinitely on slow mobile connections
 */

/**
 * Creates a fetch with timeout
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @param {number} timeoutMs - Timeout in milliseconds (default: 10000)
 * @returns {Promise} - Fetch promise with timeout
 */
export async function fetchWithTimeout(url, options = {}, timeoutMs = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeoutMs}ms`);
    }
    throw error;
  }
}

/**
 * Different timeout values for different scenarios
 */
export const TIMEOUTS = {
  DEFAULT: 10000,      // 10 seconds for normal requests
  MOBILE_DATA: 15000,  // 15 seconds for mobile data
  RETRY: 30000,        // 30 seconds for retry attempts
  CMS: 15000,          // 15 seconds for CMS requests
  IP_SERVICE: 5000,    // 5 seconds for IP detection service
};

/**
 * Get appropriate timeout based on context
 * @param {string} type - Type of request ('default', 'mobile', 'retry', 'cms', 'ip')
 * @returns {number} - Timeout in milliseconds
 */
export function getTimeout(type = 'default') {
  return TIMEOUTS[type.toUpperCase()] || TIMEOUTS.DEFAULT;
}
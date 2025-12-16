import { fetchWithTimeout, getTimeout, TIMEOUTS } from './requestTimeout.js';

/**
 * Retry configuration options
 */
export const RETRY_CONFIG = {
  MAX_ATTEMPTS: 3,
  BASE_DELAY: 1000,     // 1 second base delay
  MAX_DELAY: 10000,     // 10 seconds max delay
  BACKOFF_FACTOR: 2,    // Exponential backoff factor
};

/**
 * Retry fetch with exponential backoff
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @param {Object} retryConfig - Retry configuration
 * @returns {Promise} - Fetch promise with retry logic
 */
export async function fetchWithRetry(
  url,
  options = {},
  retryConfig = {}
) {
  const config = {
    maxAttempts: RETRY_CONFIG.MAX_ATTEMPTS,
    baseDelay: RETRY_CONFIG.BASE_DELAY,
    maxDelay: RETRY_CONFIG.MAX_DELAY,
    backoffFactor: RETRY_CONFIG.BACKOFF_FACTOR,
    ...retryConfig
  };

  let lastError;

  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      // Use longer timeout for retry attempts
      const timeout = attempt === 1 ? getTimeout('default') : getTimeout('retry');

      // Strip non-essential headers on retry attempts to reduce header size
      const fetchOptions = attempt > 1 ? stripNonEssentialHeaders(options) : options;

      const response = await fetchWithTimeout(url, fetchOptions, timeout);

      // If we get here, request succeeded
      return response;

    } catch (error) {
      lastError = error;

      // Don't retry on certain error types
      if (shouldNotRetry(error)) {
        throw error;
      }

      // If this is the last attempt, throw the error
      if (attempt === config.maxAttempts) {
        throw error;
      }

      // Calculate delay for next attempt
      const delay = Math.min(
        config.baseDelay * Math.pow(config.backoffFactor, attempt - 1),
        config.maxDelay
      );

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay));

      console.warn(`Request failed (attempt ${attempt}/${config.maxAttempts}), retrying in ${delay}ms:`, error.message);
    }
  }

  throw lastError;
}

/**
 * Determine if an error should not be retried
 * @param {Error} error - The error to check
 * @returns {boolean} - True if should not retry
 */
function shouldNotRetry(error) {
  // Don't retry on timeout if it's a retry attempt
  if (error.message.includes('timeout')) {
    return false; // We actually want to retry timeouts
  }

  // Don't retry on authentication errors
  if (error.message.includes('401') || error.message.includes('403')) {
    return true;
  }

  // Don't retry on not found errors
  if (error.message.includes('404')) {
    return true;
  }

  // Don't retry on client errors (4xx)
  if (error.message.match(/^[45]\d\d/)) {
    return true;
  }

  return false;
}

/**
 * Remove non-essential headers to reduce request size
 * Helps with mobile data requests that have header limits
 * @param {Object} options - Fetch options
 * @returns {Object} - Options with stripped headers
 */
function stripNonEssentialHeaders(options) {
  const essentialHeaders = [
    'content-type',
    'authorization',
    'x-tenant-id',
    'x-access-token',
    'user-agent'
  ];

  const newOptions = { ...options };

  if (newOptions.headers) {
    const strippedHeaders = {};

    Object.keys(newOptions.headers).forEach(key => {
      if (essentialHeaders.includes(key.toLowerCase())) {
        strippedHeaders[key] = newOptions.headers[key];
      }
    });

    newOptions.headers = strippedHeaders;
  }

  return newOptions;
}
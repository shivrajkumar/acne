/**
 * Simple in-memory cache with TTL support
 * Used for caching IP address and fingerprint to reduce parallel requests
 */

class CacheManager {
  constructor() {
    this.cache = new Map();
  }

  /**
   * Set a value in cache with TTL
   * @param {string} key - Cache key
   * @param {any} value - Value to cache
   * @param {number} ttlMs - Time to live in milliseconds
   */
  set(key, value, ttlMs = 300000) { // Default 5 minutes
    const expiry = Date.now() + ttlMs;
    this.cache.set(key, { value, expiry });
  }

  /**
   * Get a value from cache
   * @param {string} key - Cache key
   * @returns {any|null} - Cached value or null if expired/not found
   */
  get(key) {
    const item = this.cache.get(key);

    if (!item) {
      return null;
    }

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  /**
   * Delete a cached value
   * @param {string} key - Cache key
   */
  delete(key) {
    this.cache.delete(key);
  }

  /**
   * Clear all expired items
   */
  clearExpired() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Clear all items
   */
  clear() {
    this.cache.clear();
  }
}

// Create singleton instance
export const cache = new CacheManager();

// Cache keys
export const CACHE_KEYS = {
  IP_ADDRESS: 'ip_address',
  FINGERPRINT: 'fingerprint',
};

// Cache TTL values (in milliseconds)
export const CACHE_TTL = {
  IP_ADDRESS: 300000,    // 5 minutes
  FINGERPRINT: 300000,  // 5 minutes (persistent for session)
};

// Periodically clear expired items
setInterval(() => {
  cache.clearExpired();
}, 60000); // Check every minute
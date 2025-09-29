import {
  getCachedData,
  setCachedData,
  CACHE_EXPIRY_MS,
} from '../services/cacheService.js';

/**
 * Fetches data using cache. If cache is fresh, returns cached data.
 * Otherwise, fetches from API using fetchFn, updates cache, and returns new data.
 * @param {string} key - Cache key
 * @param {Function} fetchFn - Function that returns a Promise with fresh data
 * @param {number} [expiryMs=CACHE_EXPIRY_MS] - Cache expiry in ms
 * @returns {Promise<any>} Cached or fresh data
 */
export async function fetchWithCache(key, fetchFn, expiryMs = CACHE_EXPIRY_MS) {
  const cached = getCachedData(key);
  if (cached && cached.timestamp && Date.now() - cached.timestamp < expiryMs) {
    return cached.data;
  }
  const data = await fetchFn();
  setCachedData(key, { data, timestamp: Date.now() });
  return data;
}

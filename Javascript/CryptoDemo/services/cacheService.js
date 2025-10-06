// Cache service for API data using localStorage
export const CACHE_EXPIRY_MS = 5 * 60 * 1000;
export const CACHE_KEYS = {
  TOP_MARKETS: 'cryptoTopMarkets',
  NEWS: 'cryptoNews',
  TRENDING: 'cryptoTrending',
};

/**
 * Get cached data if fresh, else return null
 * @param {string} key - Cache key
 * @returns {any|null} Cached data or null if expired
 */
export function getCachedData(key) {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_EXPIRY_MS) return null;
    return data;
  } catch (error) {
    console.warn('Error reading cache:', error);
    return null;
  }
}

/**
 * Set data in cache with current timestamp
 * @param {string} key - Cache key
 * @param {any} data - Data to cache
 */
export function setCachedData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch (error) {
    console.warn('Error writing cache:', error);
  }
}

/**
 * Get the cache key for a specific coin's chart data
 * @param {string} coinId - The ID of the coin (e.g., 'bitcoin')
 * @returns {string} The cache key for the coin's chart data
 */
export function getChartCacheKey(coinId) {
  return `cryptoChart-${coinId}`;
}

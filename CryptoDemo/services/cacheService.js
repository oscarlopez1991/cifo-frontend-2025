// Cache service for API data using localStorage
export const CACHE_EXPIRY_MS = 5 * 60 * 1000;

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
 * Clear all cached data
 */
export function clearCache() {
  try {
    localStorage.removeItem('cryptoTopMarkets');
    localStorage.removeItem('cryptoChart-bitcoin');
    localStorage.removeItem('cryptoChart-ethereum');
    localStorage.removeItem('cryptoChart-solana');
  } catch (error) {
    console.warn('Error clearing cache:', error);
  }
}

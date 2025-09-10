import { getFavorites } from '../utils/storageService.js';

const API_BASE_URL = 'https://api.coingecko.com/api/v3';

/**
 * Fetches daily market chart data for a single cryptocurrency.
 * @param {string} coinId - The ID of the coin (e.g., 'bitcoin').
 * @returns {Promise<object|null>} The market chart data or null on error.
 */
const getCoinMarketChart = async (coinId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=1`
    );
    if (!response.ok) throw new Error(`Failed to fetch data for ${coinId}`);
    const data = await response.json();
    return { coinId, data };
  } catch (error) {
    console.error(error);
    return null;
  }
};

/**
 * Fetches daily chart data for all favorite cryptocurrencies.
 * @returns {Promise<Array<object|null>>} A promise that resolves to an array of chart data objects.
 */
export const getFavoriteCoinsChartData = async () => {
  const favoriteIds = getFavorites();
  console.log(`Fetching chart data for favorites: ${favoriteIds.join(', ')}`);

  const dataPromises = favoriteIds.map((id) => getCoinMarketChart(id));

  // Wait for all fetches to complete and filter out any that failed (returned null)
  const results = await Promise.all(dataPromises);
  return results.filter((result) => result !== null);
};
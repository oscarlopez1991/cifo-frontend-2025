import { getFavoriteCoinsChartData } from './services/cryptoService.js';
// import { saveFavorites } from './utils/storageService.js';

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Fetching chart data for favorite cryptocurrencies...');
  const favoriteCharts = await getFavoriteCoinsChartData();

  if (favoriteCharts.length > 0) {
    console.log('Received chart data for favorites:', favoriteCharts);
    // Here show the charts in the UI...
  } else {
    console.log('Could not fetch chart data for any favorite coins.');
  }
});

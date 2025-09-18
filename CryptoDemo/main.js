import { getFavoriteCoinsChartData } from './services/cryptoService.js';
import { loadNavbar } from './components/Navbar/Navbar.js';
import { loadFooter } from './components/Footer/Footer.js';

// This function renders the shared layout components
const renderLayout = () => {
  loadNavbar();
  loadFooter();
};

// Main execution on page load
document.addEventListener('DOMContentLoaded', () => {
  renderLayout();

  // The rest of your page-specific logic can run here
  console.log('Fetching chart data for favorite cryptocurrencies...');
  getFavoriteCoinsChartData().then((favoriteCharts) => {
    if (favoriteCharts.length > 0) {
      console.log('Received chart data for favorites:', favoriteCharts);
      // You can now render charts or other content inside the #app element
    } else {
      console.log('Could not fetch chart data for any favorite coins.');
    }
  });
});

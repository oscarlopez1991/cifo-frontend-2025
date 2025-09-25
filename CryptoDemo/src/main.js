import { loadNavbar } from '../components/Navbar/Navbar.js';
import { loadFooter } from '../components/Footer/Footer.js';
import { router } from './router.js';
import { CACHE_EXPIRY_MS } from '../services/cacheService.js'; // Add this import
import { fetchTopMarkets } from '../services/cryptoService.js';

// This function renders the shared layout components
const renderLayout = async () => {
  await loadNavbar();
  await loadFooter();
};

// Add at the top of src/main.js
async function loadTemplates() {
  const res = await fetch('./utils/templates.html');
  const html = await res.text();
  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);
}

// Add at the top of src/main.js
async function loadInitialCache() {
  try {
    // Single call to fetch top markets (enough for Home and Markets)
    await fetchTopMarkets(100); // This will cache the data
    // Pre-load charts only if needed (or skip for now to reduce calls)
    // await Promise.all([fetchMarketChart('bitcoin', 7), ...]);
    console.log('Initial cache loaded');
  } catch (error) {
    console.warn('Failed to load initial cache:', error);
  }
}

// Add refreshCache function
async function refreshCache() {
  try {
    // Refresh only top markets (charts can be loaded on demand)
    await fetchTopMarkets(100);
    console.log('Cache refreshed');
  } catch (error) {
    console.warn('Failed to refresh cache:', error);
  }
}

// Add preloadMarketsPage function
async function preloadMarketsPage() {
  try {
    // Load HTML
    const response = await fetch('./pages/Markets/Markets.html');
    if (!response.ok)
      throw new Error(`Failed to fetch Markets HTML: ${response.statusText}`);
    const html = await response.text();

    // Load data
    let data = null;
    try {
      data = await fetchTopMarkets(100);
    } catch (error) {
      console.warn('Failed to preload Markets data:', error);
    }

    // Store preloaded content
    window.preloadedMarkets = { html, data };
    console.log('Markets page preloaded');
  } catch (error) {
    console.warn('Failed to preload Markets page:', error);
  }
}

// Main execution on page load
document.addEventListener('DOMContentLoaded', async () => {
  await loadTemplates();
  await renderLayout();
  await loadInitialCache(); // Load cache on startup
  await preloadMarketsPage(); // Preload Markets page
  router.init();

  // Refresh cache every 30 seconds
  setInterval(refreshCache, CACHE_EXPIRY_MS);
});

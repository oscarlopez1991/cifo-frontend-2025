import { renderPageError } from '../../utils/renderPageError.js';
import { showAnalyticsModal } from '../../components/AnalyticsModal/AnalyticsModal.js';
import { fetchTopMarkets } from '../../services/coinGeckoApiService.js';
import { fetchWithCache } from '../../utils/cacheWrapper.js';
import { CACHE_KEYS } from '../../services/cacheService.js';

/**
 * Loads and displays the home page content
 */
export const loadHomePage = async () => {
  const appContainer = document.getElementById('app');
  if (!appContainer) {
    console.error('App container not found');
    return;
  }

  try {
    // Load the home page HTML
    const response = await fetch('./pages/Home/Home.html');
    if (!response.ok) {
      throw new Error(`Failed to fetch Home page: ${response.statusText}`);
    }

    const html = await response.text();
    appContainer.innerHTML = html;

    // Update crypto cards with real data
    await updateCryptoCards();

    // Set up event listeners after HTML is loaded
    setupHomeEventListeners();
  } catch (error) {
    console.error('Error loading home page:', error);
    renderPageError(appContainer, 'Home');
  }
};
/**
 * Sets up event listeners for the home page
 */
const setupHomeEventListeners = () => {
  // Helper function to navigate to Markets page
  const navigateToMarkets = () => {
    document.dispatchEvent(
      new CustomEvent('navigate', { detail: { page: 'markets' } })
    );
  };

  // Start Tracking button
  const startTrackingBtn = document.getElementById('start-tracking-btn');
  if (startTrackingBtn) {
    startTrackingBtn.addEventListener('click', () => {
      // Scroll to crypto section
      const cryptoSection = document.getElementById('crypto-cards-container');
      if (cryptoSection) {
        cryptoSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Get Started button - Navigate to Markets
  const getStartedBtn = document.getElementById('get-started-btn');
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', navigateToMarkets);
  }

  // Explore Markets button - Navigate to Markets
  const exploreMarketsBtn = document.getElementById('explore-markets-btn');
  if (exploreMarketsBtn) {
    exploreMarketsBtn.addEventListener('click', navigateToMarkets);
  }

  // View Chart buttons for crypto cards
  const viewBtcChartBtn = document.getElementById('view-btc-chart');
  if (viewBtcChartBtn) {
    viewBtcChartBtn.addEventListener('click', () => {
      showAnalyticsModal('bitcoin', 'Bitcoin', 1); // 24 hours
    });
  }

  const viewEthChartBtn = document.getElementById('view-eth-chart');
  if (viewEthChartBtn) {
    viewEthChartBtn.addEventListener('click', () => {
      showAnalyticsModal('ethereum', 'Ethereum', 1); // 24 hours
    });
  }

  const viewSolChartBtn = document.getElementById('view-sol-chart');
  if (viewSolChartBtn) {
    viewSolChartBtn.addEventListener('click', () => {
      showAnalyticsModal('solana', 'Solana', 1); // 24 hours
    });
  }
};

/**
 * Updates the crypto cards with real data from CoinGecko API
 */
const updateCryptoCards = async () => {
  try {
    // Use cacheWrapper for API call
    const marketsData = await fetchWithCache(
      CACHE_KEYS.TOP_MARKETS,
      fetchTopMarkets
    );
    // Define the coins we want to update
    const coinsToUpdate = [
      {
        id: 'bitcoin',
        priceId: 'btc-price',
        changeId: 'btc-change',
        rangeId: 'btc-range',
        imgId: 'btc-img',
      },
      {
        id: 'ethereum',
        priceId: 'eth-price',
        changeId: 'eth-change',
        rangeId: 'eth-range',
        imgId: 'eth-img',
      },
      {
        id: 'solana',
        priceId: 'sol-price',
        changeId: 'sol-change',
        rangeId: 'sol-range',
        imgId: 'sol-img',
      },
    ];

    // Update each card
    coinsToUpdate.forEach(({ id, priceId, changeId, rangeId, imgId }) => {
      const coinData = marketsData.find((coin) => coin.id === id);
      if (coinData) {
        // Update image
        const imgEl = document.getElementById(imgId);
        if (imgEl) {
          imgEl.src = coinData.image;
        }

        // Update price
        const priceEl = document.getElementById(priceId);
        if (priceEl) {
          priceEl.textContent = `$${coinData.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
        }

        // Update change
        const changeEl = document.getElementById(changeId);
        if (changeEl) {
          const change = coinData.change24h;
          changeEl.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(2)}% (24h)`;
          changeEl.className = `text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-500'}`;
        }

        // Update range (approximated from current price and 24h change)
        const rangeEl = document.getElementById(rangeId);
        if (rangeEl) {
          const changePercent = coinData.change24h / 100;
          const low =
            changePercent >= 0
              ? coinData.price / (1 + changePercent)
              : coinData.price;
          const high =
            changePercent >= 0
              ? coinData.price
              : coinData.price / (1 + changePercent);
          rangeEl.textContent = ` $${low.toFixed(2)} - $${high.toFixed(2)} `;
        }
      }
    });
  } catch (error) {
    console.warn('Failed to update crypto cards with real data:', error);
  }
};

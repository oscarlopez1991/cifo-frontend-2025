import { renderPageError } from '../../utils/renderPageError.js';
import { showAnalyticsModal } from '../../components/AnalyticsModal/AnalyticsModal.js';
import { fetchTopMarkets } from '../../services/cryptoService.js';
/**
 * Sets up event listeners for the home page
 */
const setupHomeEventListeners = () => {
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
    getStartedBtn.addEventListener('click', () => {
      // Navigate to Markets page
      document.dispatchEvent(
        new CustomEvent('navigate', { detail: { page: 'markets' } })
      );
    });
  }

  // View Chart buttons for crypto cards
  const viewBtcChartBtn = document.getElementById('view-btc-chart');
  if (viewBtcChartBtn) {
    viewBtcChartBtn.addEventListener('click', () => {
      showAnalyticsModal('bitcoin', 'Bitcoin');
    });
  }

  const viewEthChartBtn = document.getElementById('view-eth-chart');
  if (viewEthChartBtn) {
    viewEthChartBtn.addEventListener('click', () => {
      showAnalyticsModal('ethereum', 'Ethereum');
    });
  }

  const viewXrpChartBtn = document.getElementById('view-xrp-chart');
  if (viewXrpChartBtn) {
    viewXrpChartBtn.addEventListener('click', () => {
      showAnalyticsModal('ripple', 'Ripple');
    });
  }
};

/**
 * Updates the crypto cards with real data from CoinGecko API
 */
const updateCryptoCards = async () => {
  try {
    // Fetch top markets data
    const marketsData = await fetchTopMarkets(10); // Fetch top 10 for efficiency

    // Define the coins we want to update
    const coinsToUpdate = [
      {
        id: 'bitcoin',
        priceId: 'btc-price',
        changeId: 'btc-change',
        rangeId: 'btc-range',
      },
      {
        id: 'ethereum',
        priceId: 'eth-price',
        changeId: 'eth-change',
        rangeId: 'eth-range',
      },
      {
        id: 'ripple',
        priceId: 'xrp-price',
        changeId: 'xrp-change',
        rangeId: 'xrp-range',
      },
    ];

    // Update each card
    coinsToUpdate.forEach(({ id, priceId, changeId, rangeId }) => {
      const coinData = marketsData.find((coin) => coin.id === id);
      if (coinData) {
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
    // Fallback: Keep static data
  }
};

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

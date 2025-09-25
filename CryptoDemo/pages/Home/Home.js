import { renderPageError } from '../../utils/renderPageError.js';
import { showAnalyticsModal } from '../../components/AnalyticsModal/AnalyticsModal.js'; // Añade este import

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

    // Set up event listeners after HTML is loaded
    setupHomeEventListeners();
  } catch (error) {
    console.error('Error loading home page:', error);
    renderPageError(appContainer, 'Home');
  }
};

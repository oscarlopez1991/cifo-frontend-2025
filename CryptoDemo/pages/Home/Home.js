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

  // View Demo button
  const viewDemoBtn = document.getElementById('view-demo-btn');
  if (viewDemoBtn) {
    viewDemoBtn.addEventListener('click', () => {
      alert('Demo feature coming soon! 🚀');
    });
  }

  // Get Started button
  const getStartedBtn = document.getElementById('get-started-btn');
  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
      alert(
        'Welcome to Crypto Demo! Start tracking your favorite cryptocurrencies.'
      );
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
    appContainer.innerHTML = `
      <div class="text-center py-16">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Error Loading Home Page
        </h1>
        <p class="text-gray-500 dark:text-gray-400">
          Please refresh the page to try again.
        </p>
      </div>
    `;
  }
};

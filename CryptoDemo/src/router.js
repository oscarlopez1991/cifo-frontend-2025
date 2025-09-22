import { setActiveNavLink } from '../components/Navbar/Navbar.js';

// --- The Route Map ---
const routes = {
  home: async () => {
    const { loadHomePage } = await import('../pages/Home/Home.js');
    return loadHomePage();
  },
  markets: async () => {
    const { loadMarketsPage } = await import('../pages/Markets/Markets.js');
    return loadMarketsPage();
  },
  analytics: async () => {
    const { loadAnalyticsPage } = await import(
      '../pages/Analytics/Analytics.js'
    );
    return loadAnalyticsPage();
  },
  news: async () => {
    const { loadNewsPage } = await import('../pages/News/News.js');
    return loadNewsPage();
  },
};

/**
 * Handles navigation. It finds the correct page loader from our `routes` map,
 * loads the content, and updates the UI.
 * @param {string} page - The page to navigate to (e.g., 'home').
 * @param {boolean} addToHistory - Whether to add this to the browser's history.
 */
const navigate = async (page, addToHistory = true) => {
  const appContainer = document.getElementById('app');
  if (!appContainer) {
    console.error('Main app container (#app) not found!');
    return;
  }

  // Find the loader function in our route map. Default to 'home' if not found.
  const loadPage = routes[page] || routes.home;
  const currentPage = page in routes ? page : 'home';

  try {
    await loadPage();
    setActiveNavLink(currentPage);

    if (addToHistory) {
      // Only push to history if the hash is different to avoid duplicate entries
      if (`#${currentPage}` !== window.location.hash) {
        window.history.pushState({ page: currentPage }, '', `#${currentPage}`);
      }
    }
  } catch (error) {
    console.error(`Error navigating to page "${currentPage}":`, error);
    appContainer.innerHTML = `<p class="text-center text-red-500">Error: Could not load the ${currentPage} page.</p>`;
  }
};

/**
 * Initializes the router and sets up all global event listeners for navigation.
 */
const init = () => {
  // Listen for our custom 'navigate' event, dispatched by components like the navbar.
  document.addEventListener('navigate', (event) => {
    const page = event.detail.page;
    navigate(page);
  });

  // Handle browser back/forward button clicks.
  window.addEventListener('popstate', (event) => {
    const page = event.state?.page || 'home';
    navigate(page, false); // Don't add to history again, just render the state.
  });

  // Load the initial page on startup based on the URL hash.
  const initialPage = window.location.hash.replace('#', '') || 'home';
  navigate(initialPage, false);
};

export const router = { init };

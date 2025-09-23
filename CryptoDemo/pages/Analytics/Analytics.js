import { renderPageError } from '../../utils/renderPageError.js';

/**
 * Loads and displays the analytics page content
 */
export const loadAnalyticsPage = async () => {
  const appContainer = document.getElementById('app');
  if (!appContainer) {
    console.error('App container not found');
    return;
  }

  try {
    const response = await fetch('./pages/Analytics/Analytics.html');
    if (!response.ok) {
      throw new Error(`Failed to fetch Analytics page: ${response.statusText}`);
    }

    const html = await response.text();
    appContainer.innerHTML = html;
  } catch (error) {
    console.error('Error loading analytics page:', error);
    renderPageError(appContainer, 'Analytics');
  }
};

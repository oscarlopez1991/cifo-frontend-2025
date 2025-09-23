import { renderPageError } from '../../utils/renderPageError.js';

/**
 * Loads and displays the news page content
 */
export const loadNewsPage = async () => {
  const appContainer = document.getElementById('app');
  if (!appContainer) {
    console.error('App container not found');
    return;
  }

  try {
    const response = await fetch('./pages/News/News.html');
    if (!response.ok) {
      throw new Error(`Failed to fetch News page: ${response.statusText}`);
    }

    const html = await response.text();
    appContainer.innerHTML = html;
  } catch (error) {
    console.error('Error loading news page:', error);
    renderPageError(appContainer, 'News');
  }
};

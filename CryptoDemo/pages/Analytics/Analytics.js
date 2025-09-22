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
    appContainer.innerHTML = `
      <div class="text-center py-16">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Error Loading Analytics Page
        </h1>
        <p class="text-gray-500 dark:text-gray-400">Please refresh the page to try again.</p>
      </div>
    `;
  }
};

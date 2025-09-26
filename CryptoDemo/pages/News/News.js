import { renderPageError } from '../../utils/renderPageError.js';
import { fetchNews } from '../../services/newsApiService.js';
import { fetchTrendingCoins } from '../../services/coinGeckoApiService.js';

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

    // Fetch and render news and social data
    await loadNewsData();
  } catch (error) {
    console.error('Error loading news page:', error);
    renderPageError(appContainer, 'News');
  }
};

/**
 * Fetch and render news and trending data
 */
async function loadNewsData() {
  const newsContainer = document.getElementById('news-container');
  const trendingContainer = document.getElementById('trending-container');

  try {
    // Fetch news
    const newsData = await fetchNews();
    renderNews(newsData, newsContainer);

    // Fetch trending coins
    const trendingData = await fetchTrendingCoins();
    renderTrending(trendingData, trendingContainer);
  } catch (error) {
    console.warn('Failed to load news/trending data:', error);
    newsContainer.innerHTML =
      '<p class="text-center text-red-500">Failed to load news.</p>';
    trendingContainer.innerHTML =
      '<p class="text-center text-red-500">Failed to load trending coins.</p>';
  }
}

/**
 * Render news articles
 */
function renderNews(newsData, container) {
  container.innerHTML = newsData
    .map(
      (news) => `
    <div class="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-700 hover:shadow-xl transition-shadow h-96 flex flex-col">
      <img src="${news.thumb}" alt="${news.title}" class="w-full h-48 object-cover flex-shrink-0" onerror="this.src='https://picsum.photos/300/200'" />
      <div class="p-6 flex flex-col">
        <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white line-clamp-2">${news.title}</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">${news.description}</p>
        <a href="${news.url}" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline mt-auto">Read more</a>
      </div>
    </div>
  `
    )
    .join('');
}

/**
 * Render trending coins
 */
function renderTrending(trendingData, container) {
  container.innerHTML = trendingData
    .map(
      (coin) => `
    <div class="bg-white rounded-lg shadow-lg p-6 dark:bg-gray-700">
      <div class="flex items-center mb-4">
        <img src="${coin.thumb}" alt="${coin.name}" class="h-10 w-10 mr-3" />
        <div>
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">${coin.name}</h3>
          <p class="text-gray-500 dark:text-gray-400 uppercase">${coin.symbol}</p>
        </div>
      </div>
      <p class="text-gray-500 dark:text-gray-400">Price in BTC: ${coin.price_btc}</p>
    </div>
  `
    )
    .join('');
}

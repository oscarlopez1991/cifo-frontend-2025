import { renderPageError } from '../../utils/renderPageError.js';
import { fetchNews, fetchCoinSocial } from '../../services/cryptoService.js';

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
 * Fetch and render news and social data
 */
async function loadNewsData() {
  const newsContainer = document.getElementById('news-container');
  const socialContainer = document.getElementById('social-container');

  try {
    // Fetch news
    const newsData = await fetchNews();
    renderNews(newsData, newsContainer);

    // Fetch social data for top 3 coins
    const topCoins = ['bitcoin', 'ethereum', 'solana'];
    const socialPromises = topCoins.map(async (coinId) => {
      const socialData = await fetchCoinSocial(coinId);
      return { coinId, ...socialData };
    });
    const socialData = await Promise.all(socialPromises);
    renderSocial(socialData, socialContainer);
  } catch (error) {
    console.warn('Failed to load news/social data:', error);
    newsContainer.innerHTML =
      '<p class="text-center text-red-500">Failed to load news.</p>';
    socialContainer.innerHTML =
      '<p class="text-center text-red-500">Failed to load social data.</p>';
  }
}

/**
 * Render news articles
 */
function renderNews(newsData, container) {
  container.innerHTML = newsData
    .map(
      (news) => `
    <div class="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-700 hover:shadow-xl transition-shadow">
      <img src="${news.thumb || '/assets/logo.png'}" alt="${news.title}" class="w-full h-48 object-cover" />
      <div class="p-6">
        <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">${news.title}</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-4">${news.description}</p>
        <a href="${news.url}" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline">Read more</a>
      </div>
    </div>
  `
    )
    .join('');
}

/**
 * Render social data
 */
function renderSocial(socialData, container) {
  container.innerHTML = socialData
    .map(
      (social) => `
    <div class="bg-white rounded-lg shadow-lg p-6 dark:bg-gray-700">
      <h3 class="mb-4 text-xl font-bold text-gray-900 dark:text-white capitalize">${social.coinId}</h3>
      <div class="space-y-2">
        <div class="flex justify-between">
          <span class="text-gray-500 dark:text-gray-400">Twitter Followers</span>
          <span class="font-semibold">${social.twitter_followers?.toLocaleString() || 'N/A'}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500 dark:text-gray-400">Reddit Subscribers</span>
          <span class="font-semibold">${social.reddit_subscribers?.toLocaleString() || 'N/A'}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500 dark:text-gray-400">Telegram Users</span>
          <span class="font-semibold">${social.telegram_channel_user_count?.toLocaleString() || 'N/A'}</span>
        </div>
      </div>
    </div>
  `
    )
    .join('');
}

import { renderPageError } from '../../utils/renderPageError.js';
import { fetchNews } from '../../services/newsApiService.js';
import { fetchTrendingCoins } from '../../services/coinGeckoApiService.js';
import { fetchWithCache } from '../../utils/cacheWrapper.js';
import { CACHE_KEYS } from '../../services/cacheService.js';

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
    // Load News page HTML
    const response = await fetch('./pages/News/News.html');
    if (!response.ok) {
      throw new Error(`Failed to fetch News page: ${response.statusText}`);
    }
    const html = await response.text();
    appContainer.innerHTML = html;

    // Use cacheWrapper for API calls
    const newsData = await fetchWithCache(CACHE_KEYS.NEWS, fetchNews);
    const trendingData = await fetchWithCache(
      CACHE_KEYS.TRENDING,
      fetchTrendingCoins
    );

    loadNewsData(newsData, trendingData);
  } catch (error) {
    console.error('Error loading news page:', error);
    renderPageError(appContainer, 'News');
  }
};

/**
 * Fetch and render news and trending data
 * @param {Array} newsData - News data array.
 * @param {Array} trendingData - Trending coins data array.
 */
function loadNewsData(newsData, trendingData) {
  const newsContainer = document.getElementById('news-container');
  const trendingContainer = document.getElementById('trending-container');

  try {
    renderNews(newsData, newsContainer);
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
 * @param {Array} newsData - Array of news article objects.
 * @param {HTMLElement} container - Container element to append news cards.
 */
function renderNews(newsData, container) {
  container.innerHTML = '';
  const template = document.getElementById('news-card-template');
  newsData.forEach((news) => {
    const card = template.content.firstElementChild.cloneNode(true);
    let thumb =
      news.thumb ||
      `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/300/200`;
    card.querySelector('img').src = thumb;
    card.querySelector('img').alt = news.title;
    card.querySelector('h3').textContent = news.title;
    card.querySelector('p').textContent = news.description;
    card.querySelector('a').href = news.url;
    container.appendChild(card);
  });
}

/**
 * Render trending coins
 * @param {Array} trendingData - Array of trending coin objects.
 * @param {HTMLElement} container - Container element to append trending cards.
 */
function renderTrending(trendingData, container) {
  container.innerHTML = '';
  const template = document.getElementById('trending-card-template');
  trendingData.forEach((coin) => {
    const card = template.content.firstElementChild.cloneNode(true);
    card.querySelector('img').src = coin.thumb;
    card.querySelector('img').alt = coin.name;
    card.querySelector('h3').textContent = coin.name;
    card.querySelector('p').textContent = coin.symbol;
    card.querySelector('p:last-of-type').textContent =
      `Price in BTC: ${coin.price_btc}`;
    container.appendChild(card);
  });
}

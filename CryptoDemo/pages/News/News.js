import { fetchNews } from '../../services/newsApiService.js';
import { fetchTrendingCoins } from '../../services/coinGeckoApiService.js';
import { fetchWithCache } from '../../utils/cacheWrapper.js';
import { CACHE_KEYS } from '../../services/cacheService.js';
import { handleApiError, displayError } from '../../utils/errorHandler.js';

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
    const userMessage = handleApiError(error, 'News');
    displayError(appContainer, 'News', userMessage);
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
  renderNews(newsData, newsContainer);
  renderTrending(trendingData, trendingContainer);
}

/**
 * Render news articles
 * @param {Array} newsData - Array of news article objects.
 * @param {HTMLElement} container - Container element to append news cards.
 */
function renderNews(newsData, container) {
  const template = document.getElementById('news-card-template');
  const fragment = document.createDocumentFragment();
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
    fragment.appendChild(card);
  });
  container.innerHTML = '';
  container.appendChild(fragment);
}

/**
 * Render trending coins
 * @param {Array} trendingData - Array of trending coin objects.
 * @param {HTMLElement} container - Container element to append trending cards.
 */
function renderTrending(trendingData, container) {
  const template = document.getElementById('trending-card-template');
  const fragment = document.createDocumentFragment();
  trendingData.forEach((coin) => {
    const card = template.content.firstElementChild.cloneNode(true);
    card.querySelector('img').src = coin.thumb;
    card.querySelector('img').alt = coin.name;
    card.querySelector('h3').textContent = coin.name;
    card.querySelector('p').textContent = coin.symbol;
    card.querySelector('p:last-of-type').textContent =
      `Price in BTC: ${coin.price_btc}`;
    fragment.appendChild(card);
  });
  container.innerHTML = '';
  container.appendChild(fragment);
}

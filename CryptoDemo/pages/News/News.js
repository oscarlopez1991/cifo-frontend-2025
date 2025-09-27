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
    let html, newsData, trendingData;

    // Use preloaded content if available
    if (window.preloadedNews) {
      ({ html, newsData, trendingData } = window.preloadedNews);
      delete window.preloadedNews; // Clear after use
    } else {
      // Fallback: Load normally
      const response = await fetch('./pages/News/News.html');
      if (!response.ok) {
        throw new Error(`Failed to fetch News page: ${response.statusText}`);
      }
      html = await response.text();

      try {
        newsData = await fetchNews();
        trendingData = await fetchTrendingCoins();
      } catch (error) {
        console.warn('Failed to load News data:', error);
      }
    }

    appContainer.innerHTML = html;

    // Fetch and render news and trending data (use preloaded if available)
    await loadNewsData(newsData, trendingData);
  } catch (error) {
    console.error('Error loading news page:', error);
    renderPageError(appContainer, 'News');
  }
};

/**
 * Fetch and render news and trending data
 * @param {Array} preloadedNewsData - Preloaded news data array.
 * @param {Array} preloadedTrendingData - Preloaded trending coins data array.
 */
async function loadNewsData(preloadedNewsData, preloadedTrendingData) {
  const newsContainer = document.getElementById('news-container');
  const trendingContainer = document.getElementById('trending-container');

  try {
    // Use preloaded data if available, else fetch
    const newsData = preloadedNewsData || (await fetchNews());
    const trendingData = preloadedTrendingData || (await fetchTrendingCoins());

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

import { getCachedData, setCachedData } from './cacheService.js';

/**
 * Fetch latest crypto news from NewsAPI (free tier: 100 requests/day)
 * @returns {Promise<Array<{title, description, url, thumb, tags, created_at}>>}
 */
export async function fetchNews() {
  const cacheKey = 'cryptoNews';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  // Replace 'YOUR_NEWSAPI_KEY' with your actual API key from https://newsapi.org/
  const NEWSAPI_KEY = '57672bb7b03a48f5b83290634560e733'; // Get it from https://newsapi.org/
  const url = `https://newsapi.org/v2/everything?q=cryptocurrency&sortBy=publishedAt&apiKey=${NEWSAPI_KEY}`;

  const res = await fetch(url);
  if (!res.ok)
    throw new Error(`NewsAPI error: ${res.status} ${res.statusText}`);
  const json = await res.json();

  const data = json.articles
    .filter((article) => article.urlToImage)
    .filter(
      (article, index, self) =>
        self.findIndex((a) => a.title === article.title) === index
    ) // Remove duplicates by title
    .slice(0, 6)
    .map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      thumb: article.urlToImage,
      tags: ['Cryptocurrency'],
      created_at: article.publishedAt,
    }));

  setCachedData(cacheKey, data);
  return data;
}

import { NEWSAPI_KEY } from '../config.js'; // Import first

/**
 * Fetch latest crypto news from NewsAPI (free tier: 100 requests/day)
 * @returns {Promise<Array<{title, description, url, thumb, tags, created_at}>>}
 */
export async function fetchNews() {
  // Get your API key from config.js (do not commit this file)
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

  return data;
}

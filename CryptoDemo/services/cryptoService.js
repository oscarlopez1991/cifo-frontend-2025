import { getCachedData, setCachedData } from './cacheService.js';
const API_BASE = 'https://api.coingecko.com/api/v3';

/**
 * Fetch top coins by market cap.
 * @param {number} perPage - number of coins to fetch (max 250)
 * @returns {Promise<Array<{id,name,symbol,image,price,marketCap,volume24h,change24h}>>}
 */
export async function fetchTopMarkets(perPage = 100) {
  const cacheKey = 'cryptoTopMarkets';
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const url = `${API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false&price_change_percentage=24h`;
  const res = await fetch(url);
  if (!res.ok)
    throw new Error(`CoinGecko error: ${res.status} ${res.statusText}`);
  const json = await res.json();

  // Map to our desired structure
  const data = json.map((c) => ({
    id: c.id,
    name: c.name,
    symbol: (c.symbol || '').toUpperCase(),
    image: c.image,
    price: c.current_price ?? 0,
    marketCap: c.market_cap ?? 0,
    volume24h: c.total_volume ?? 0,
    change24h:
      c.price_change_percentage_24h_in_currency ??
      c.price_change_percentage_24h ??
      0,
  }));

  setCachedData(cacheKey, data);
  return data;
}

/**
 * Fetch historical market chart data for a coin.
 * @param {string} coinId - CoinGecko coin id (e.g. 'bitcoin')
 * @param {number|string} days - Number of days (1, 7, 30, etc)
 * @returns {Promise<{prices: number[], times: string[]}>}
 */
export async function fetchMarketChart(coinId, days) {
  const cacheKey = `cryptoChart-${coinId}-${days}`; // Include days in cache key
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const url = `${API_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`;
  const res = await fetch(url);
  if (!res.ok)
    throw new Error(`CoinGecko error: ${res.status} ${res.statusText}`);
  const json = await res.json();

  setCachedData(cacheKey, json.prices);
  return json.prices;
}

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

/**
 * Fetch social/community data for a coin
 * @param {string} coinId - CoinGecko coin id
 * @returns {Promise<{twitter_followers, reddit_subscribers, telegram_channel_user_count}>}
 */
export async function fetchCoinSocial(coinId) {
  const cacheKey = `cryptoSocial-${coinId}`;
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const url = `${API_BASE}/coins/${coinId}`;
  const res = await fetch(url);
  if (!res.ok)
    throw new Error(`CoinGecko error: ${res.status} ${res.statusText}`);
  const json = await res.json();

  const data = {
    twitter_followers: json.community_data?.twitter_followers || 0,
    reddit_subscribers: json.community_data?.reddit_subscribers || 0,
    telegram_channel_user_count:
      json.community_data?.telegram_channel_user_count || 0,
    facebook_likes: json.community_data?.facebook_likes || 0,
  };

  setCachedData(cacheKey, data);
  return data;
}

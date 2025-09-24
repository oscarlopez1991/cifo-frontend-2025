// Simple CoinGecko client for top market data

const API_BASE = 'https://api.coingecko.com/api/v3';

/**
 * Fetch top coins by market cap.
 * @param {number} perPage - number of coins to fetch (max 250)
 * @returns {Promise<Array<{id,name,symbol,image,price,marketCap,volume24h,change24h}>>}
 */
export async function fetchTopMarkets(perPage = 100) {
  const url = `${API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false&price_change_percentage=24h`;
  const res = await fetch(url);
  if (!res.ok)
    throw new Error(`CoinGecko error: ${res.status} ${res.statusText}`);
  const json = await res.json();

  // Map to our desired structure
  return json.map((c) => ({
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
}

/**
 * Fetch historical market chart data for a coin.
 * @param {string} coinId - CoinGecko coin id (e.g. 'bitcoin')
 * @param {number|string} days - Number of days (1, 7, 30, etc)
 * @returns {Promise<{prices: number[], times: string[]}>}
 */
export async function fetchMarketChart(coinId, days) {
  // CoinGecko API: /coins/{id}/market_chart?vs_currency=usd&days={days}
  const url = `${API_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`;
  const res = await fetch(url);
  if (!res.ok)
    throw new Error(`CoinGecko error: ${res.status} ${res.statusText}`);
  const json = await res.json();
  // Extract price/time arrays
  // Each item: [timestamp, price]
  const prices = json.prices.map(([, price]) => price);
  const times = json.prices.map(([ts]) => {
    const d = new Date(ts);
    return days == 1
      ? `${d.getHours()}:00`
      : `${d.getMonth() + 1}/${d.getDate()}`;
  });
  return { prices, times };
}

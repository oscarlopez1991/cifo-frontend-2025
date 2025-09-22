// Simple CoinGecko client for top market data
const API_BASE = 'https://api.coingecko.com/api/v3';

// Optional API key support (put your key in localStorage as "CG_API_KEY")
const getHeaders = () => {
  const key = localStorage.getItem('CG_API_KEY');
  // Most public endpoints don’t need a key. If you have one, uncomment if your plan requires it:
  // return key ? { 'x-cg-pro-api-key': key } : {};
  return {};
};

/**
 * Fetch top coins by market cap.
 * @param {number} perPage - number of coins to fetch (max 250)
 * @returns {Promise<Array<{id,name,symbol,image,price,marketCap,volume24h,change24h}>>}
 */
export async function fetchTopMarkets(perPage = 100) {
  const url = `${API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false&price_change_percentage=24h`;
  const res = await fetch(url, { headers: getHeaders() });
  if (!res.ok)
    throw new Error(`CoinGecko error: ${res.status} ${res.statusText}`);
  const json = await res.json();

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

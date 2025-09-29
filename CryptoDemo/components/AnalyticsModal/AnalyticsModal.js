import { fetchMarketChart } from '../../services/coinGeckoApiService.js';
import { getCachedData } from '../../services/cacheService.js';

/**
 * Displays the analytics modal for a specific cryptocurrency.
 * Loads the modal HTML, replaces placeholders with coin data, and initializes the chart.
 * @param {string} coinId - The CoinGecko ID of the cryptocurrency (e.g., 'bitcoin').
 * @param {string} coinName - The display name of the cryptocurrency (e.g., 'Bitcoin').
 */
export async function showAnalyticsModal(
  coinId = 'bitcoin',
  coinName = 'Bitcoin'
) {
  // Load modal HTML to reset placeholders and ensure fresh content
  const res = await fetch('./components/AnalyticsModal/AnalyticsModal.html');
  const html = await res.text();
  const div = document.createElement('div');
  div.innerHTML = html;

  // Remove any existing modal to avoid duplicates
  const existingModal = document.getElementById('analytics-modal');
  if (existingModal) existingModal.remove();

  // Append the new modal to the body
  document.body.appendChild(div.firstElementChild);
  const modal = document.getElementById('analytics-modal');

  // Replace placeholders in the modal content with actual values
  const content = modal.querySelector('section');
  content.innerHTML = content.innerHTML.replace(/{{coinName}}/g, coinName);

  // Show the modal by removing the 'hidden' class
  modal.classList.remove('hidden');

  // Initialize the analytics page with chart rendering
  setupAnalyticsPage(coinId, coinName);

  // Set up close button functionality
  document.getElementById('close-analytics-modal').onclick = () => {
    modal.classList.add('hidden');
  };
}

/**
 * Sets up the analytics page by loading ApexCharts library if needed,
 * preparing UI elements, and rendering the chart.
 * @param {string} coinId - The CoinGecko ID of the cryptocurrency.
 * @param {string} coinName - The display name of the cryptocurrency.
 */
async function setupAnalyticsPage(coinId = 'bitcoin', coinName = 'Bitcoin') {
  // Load ApexCharts library dynamically if not already loaded
  if (!window.ApexCharts) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/apexcharts';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Get references to UI elements
  const chartContainer = document.getElementById('analytics-chart');
  const priceEl = document.getElementById('metric-price');
  const changeEl = document.getElementById('metric-change');
  let chart = null;

  // Show loading state
  chartContainer.innerHTML =
    '<div class="text-center animate-pulse text-gray-400 py-16">Loading chart...</div>';
  priceEl.textContent = '--';
  changeEl.textContent = '--';

  try {
    // Fetch chart data from API
    const raw = await fetchMarketChart(coinId);
    await renderChart(raw, coinName, priceEl, changeEl, chartContainer, chart);
  } catch (err) {
    // Fallback to cached data if available
    const cached = getCachedData(`cryptoChart-${coinId}`);
    if (cached) {
      await renderChart(
        cached,
        coinName,
        priceEl,
        changeEl,
        chartContainer,
        chart
      );
    } else {
      // Show error message if no data available
      chartContainer.innerHTML = `<div class="text-center text-red-500 py-16">Failed to load chart data. Please try again later.</div>`;
    }
    console.error(err);
  }
}

/**
 * Processes raw chart data, calculates metrics, and renders the ApexCharts chart.
 * @param {Array<Array<number>>} raw - Raw data from API, array of [timestamp, price] pairs.
 */
function groupChartData(raw) {
  const grouped = {};
  raw.forEach(([ts, price]) => {
    const d = new Date(ts);
    const key = `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(price);
  });
  // Average price per day
  return Object.entries(grouped).map(([key, arr]) => [
    key,
    arr.reduce((a, b) => a + b, 0) / arr.length,
  ]);
}

function getChartMetrics(prices) {
  const last = prices[prices.length - 1];
  const first = prices[0];
  const change = ((last - first) / first) * 100;
  return { last, change };
}

async function renderChart(
  raw,
  coinName,
  priceEl,
  changeEl,
  chartContainer,
  chart
) {
  // Always use 7-day grouping
  const points = groupChartData(raw);
  const prices = points.map(([, avg]) => avg);
  const times = points.map(([key]) => key);

  const { last, change } = getChartMetrics(prices);
  priceEl.textContent = `$${last.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  changeEl.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
  changeEl.className = `text-base font-medium ${change >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`;
  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  const options = {
    chart: {
      type: 'area',
      width: '100%',
      height: '100%',
      toolbar: { show: false },
      background: 'transparent',
    },
    series: [{ name: coinName.toUpperCase(), data: prices }],
    xaxis: {
      categories: times,
      labels: {
        show: true,
        rotate: -45,
        style: { colors: '#9ca3af', fontSize: isMobile ? '10px' : '12px' },
      },
      axisBorder: { show: true, color: '#6b7280' },
      axisTicks: { show: false },
    },
    yaxis: {
      show: true,
      labels: {
        style: { colors: '#9ca3af', fontSize: isMobile ? '10px' : '12px' },
        formatter: (v) => `$${Math.round(v).toLocaleString()}`,
      },
    },
    grid: { show: false },
    dataLabels: { enabled: false },
    stroke: { width: 3, curve: 'smooth', colors: ['#2563eb'] },
    fill: {
      type: 'gradient',
      gradient: { opacityFrom: 0.4, opacityTo: 0, stops: [0, 100] },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (v) =>
          `$${v.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      },
    },
    legend: { show: false },
  };

  if (chart) chart.destroy();
  chartContainer.innerHTML = '';
  chart = new window.ApexCharts(chartContainer, options);
  await new Promise((resolve) => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        resolve();
      }
    });
    observer.observe(chartContainer);
  });
  await chart.render();
}

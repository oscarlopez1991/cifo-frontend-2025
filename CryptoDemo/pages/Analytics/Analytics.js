import { renderPageError } from '../../utils/renderPageError.js';
import { fetchMarketChart } from '../../services/cryptoService.js';

/**
 * Loads and displays the analytics page content
 */
export const loadAnalyticsPage = async () => {
  const appContainer = document.getElementById('app');
  if (!appContainer) {
    console.error('App container not found');
    return;
  }

  try {
    const response = await fetch('./pages/Analytics/Analytics.html');
    if (!response.ok) {
      throw new Error(`Failed to fetch Analytics page: ${response.statusText}`);
    }
    const html = await response.text();
    appContainer.innerHTML = html;

    // Wait for DOM to update, then initialize
    await setupAnalyticsPage();
  } catch (error) {
    console.error('Error loading analytics page:', error);
    renderPageError(appContainer, 'Analytics');
  }
};

async function setupAnalyticsPage() {
  // Load ApexCharts if not already loaded
  if (!window.ApexCharts) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/apexcharts';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Elements
  const chartContainer = document.getElementById('analytics-chart');
  const coinSelect = document.getElementById('coin-select');
  const periodSelect = document.getElementById('period-select');

  // State
  let currentCoin = coinSelect.value;
  let currentPeriod = periodSelect.value;
  let chart = null;

  // Fetch and render chart
  async function updateChart() {
    chartContainer.innerHTML =
      '<div class="text-center animate-pulse text-gray-400 py-16">Loading chart...</div>';
    try {
      // Fetch market data for the selected coin
      const marketData = await fetchMarketChart(currentCoin, currentPeriod);
      const { prices, times } = marketData;

      // Prepare chart options
      const options = {
        chart: {
          type: 'line',
          height: 350,
          toolbar: { show: false },
          animations: { enabled: true },
        },
        series: [
          {
            name: currentCoin.toUpperCase(),
            data: prices,
          },
        ],
        xaxis: {
          categories: times,
          labels: { rotate: -45, style: { colors: '#6B7280' } },
        },
        yaxis: {
          labels: {
            formatter: (v) =>
              `$${v.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
          },
        },
        colors: ['#2563eb'],
        stroke: { width: 2, curve: 'smooth' },
        grid: { borderColor: '#e5e7eb' },
        tooltip: { x: { format: 'dd MMM HH:mm' } },
        theme: {
          mode: document.documentElement.classList.contains('dark')
            ? 'dark'
            : 'light',
        },
      };

      // Destroy previous chart if exists
      if (chart) chart.destroy();
      chart = new window.ApexCharts(chartContainer, options);
      chart.render();
    } catch (err) {
      chartContainer.innerHTML = `<div class="text-center text-red-500 py-16">Failed to load chart data.</div>`;
      console.error(err);
    }
  }
  // Event listeners
  coinSelect.addEventListener('change', async (e) => {
    currentCoin = e.target.value;
    await updateChart();
  });
  periodSelect.addEventListener('change', async (e) => {
    currentPeriod = e.target.value;
    await updateChart();
  });

  // Initial chart render
  await updateChart();
}

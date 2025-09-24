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
  const priceEl = document.getElementById('metric-price');
  const changeEl = document.getElementById('metric-change');

  // State
  let currentCoin = coinSelect.value;
  let currentPeriod = periodSelect.value;
  let chart = null;

  // Fetch and render chart
  async function updateChart() {
    chartContainer.innerHTML =
      '<div class="text-center animate-pulse text-gray-400 py-16">Loading chart...</div>';
    priceEl.textContent = '--';
    changeEl.textContent = '--';

    try {
      const { prices, times } = await fetchMarketChart(
        currentCoin,
        currentPeriod
      );

      // Metrics
      const last = prices[prices.length - 1];
      const first = prices[0];
      const change = ((last - first) / first) * 100;
      priceEl.textContent = `$${last.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
      changeEl.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
      changeEl.className = `text-base font-medium ${change >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`;

      // Chart options (Flowbite minimal area style)
      const options = {
        chart: {
          height: '100%',
          maxWidth: '100%',
          type: 'area',
          fontFamily: 'Inter, sans-serif',
          dropShadow: { enabled: false },
          toolbar: { show: false },
        },
        tooltip: {
          enabled: true,
          x: { show: false },
        },
        fill: {
          type: 'gradient',
          gradient: {
            opacityFrom: 0.55,
            opacityTo: 0,
            shade: '#1C64F2',
            gradientToColors: ['#1C64F2'],
          },
        },
        dataLabels: { enabled: false },
        stroke: { width: 6 },
        grid: {
          show: false,
          strokeDashArray: 4,
          padding: { left: 2, right: 2, top: 0 },
        },
        series: [
          {
            name: currentCoin.toUpperCase(),
            data: prices,
            color: '#1A56DB',
          },
        ],
        xaxis: {
          categories: times,
          labels: { show: false },
          axisBorder: { show: false },
          axisTicks: { show: false },
        },
        yaxis: { show: false },
      };

      // Destroy previous chart if exists
      if (chart) chart.destroy();
      chart = new window.ApexCharts(chartContainer, options);
      chart.render();
    } catch (err) {
      chartContainer.innerHTML = `<div class="text-center text-red-500 py-16">Failed to load chart data.</div>`;
      priceEl.textContent = '--';
      changeEl.textContent = '--';
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

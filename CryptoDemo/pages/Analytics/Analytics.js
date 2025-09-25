import { renderPageError } from '../../utils/renderPageError.js';
import { fetchMarketChart } from '../../services/cryptoService.js';

export const loadAnalyticsPage = async () => {
  const appContainer = document.getElementById('app');
  if (!appContainer) return;
  try {
    const response = await fetch('./pages/Analytics/Analytics.html');
    if (!response.ok)
      throw new Error(`Failed to fetch Analytics page: ${response.statusText}`);
    appContainer.innerHTML = await response.text();
    setupAnalyticsPage();
  } catch (error) {
    console.error('Error loading analytics page:', error);
    renderPageError(appContainer, 'Analytics');
  }
};

async function setupAnalyticsPage() {
  if (!window.ApexCharts) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/apexcharts';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  const chartContainer = document.getElementById('analytics-chart');
  const priceEl = document.getElementById('metric-price');
  const changeEl = document.getElementById('metric-change');
  let chart = null;

  chartContainer.innerHTML =
    '<div class="text-center animate-pulse text-gray-400 py-16">Loading chart...</div>';
  priceEl.textContent = '--';
  changeEl.textContent = '--';

  try {
    // Always fetch bitcoin for 7 days
    const raw = await fetchMarketChart('bitcoin', 7);

    // Group by date
    const grouped = {};
    raw.forEach(([ts, price]) => {
      const d = new Date(ts);
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if (!grouped[dateStr]) grouped[dateStr] = [];
      grouped[dateStr].push(price);
    });
    const points = Object.entries(grouped)
      .sort(([a, b]) => a.localeCompare(b))
      .map(([date, arr]) => {
        const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
        return [date, avg];
      });
    const prices = points.map(([, avg]) => avg);
    const times = points.map(([date]) => date);

    // Metrics
    const last = prices[prices.length - 1];
    const first = prices[0];
    const change = ((last - first) / first) * 100;
    priceEl.textContent = `$${last.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
    changeEl.textContent = `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`;
    changeEl.className = `text-base font-medium ${change >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`;

    // Chart
    const options = {
      chart: {
        type: 'area',
        width: '100%',
        height: '100%',
        toolbar: { show: false },
        background: 'transparent',
      },
      series: [{ name: 'BITCOIN', data: prices }],
      xaxis: {
        categories: times,
        labels: { show: true, rotate: -45, style: { colors: '#9ca3af' } },
        axisBorder: { show: true, color: '#6b7280' },
        axisTicks: { show: false },
      },
      yaxis: {
        show: true,
        labels: {
          style: { colors: '#9ca3af' },
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
    chart.render();
  } catch (err) {
    chartContainer.innerHTML = `<div class="text-center text-red-500 py-16">Failed to load chart data.</div>`;
    priceEl.textContent = '--';
    changeEl.textContent = '--';
    console.error(err);
  }
}
